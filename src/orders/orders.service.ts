import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as SendGrid from '@sendgrid/mail';
import axios from 'axios';
import { Model } from 'mongoose';
import { AuthService } from 'src/auth/auth.service';
import { Coupon } from 'src/models/coupon.model';
import { ItemPurchasedUser } from 'src/models/item-purchased-user.model';
import {
  Order,
  OrderStatuses,
  PaymentMethods,
  PaymentTypes,
} from 'src/models/order.model';
import { OrderItem } from 'src/models/orderItem.model';
import { OrderSummary } from 'src/models/order_summary.model';
import { Payment } from 'src/models/payment.model';
import { Product } from 'src/models/product.model';
import { ReferralOrder } from 'src/models/referral_order';
import { Review } from 'src/models/review.model';
import { User } from 'src/models/user.model';
import { CancelOrderDto } from './dto/cancel-order.dto';
import { CreateOrderDto } from './dto/create-order.dto';

@Injectable()
export class OrdersService {
  constructor(
    @InjectModel('Order') private readonly orderModel: Model<Order>,
    @InjectModel('Payment') private readonly paymentModel: Model<Payment>,
    @InjectModel('OrderSummary')
    private readonly orderSummaryModel: Model<OrderSummary>,
    @InjectModel('Product') private readonly productModel: Model<Product>,
    @InjectModel('Coupon') private readonly couponModel: Model<Coupon>,
    @InjectModel('OrderItem') private readonly orderItemModel: Model<OrderItem>,
    @InjectModel('User') private readonly userModel: Model<User>,
    @InjectModel('Review') private readonly reviewModel: Model<Review>,
    @InjectModel('ItemPurchasedUsers')
    private readonly itemPurchasedUsersModel: Model<ItemPurchasedUser>,
    @InjectModel('ReferralOrder')
    private readonly referralModel: Model<ReferralOrder>,
  ) {
    SendGrid.setApiKey(process.env.MAIL_API_KEY);
  }

  async getAllOrders(status: string) {
    console.log('status', status);
    const orderItems = await this.orderItemModel
      .find({ orderStatus: status })
      .sort({ orderDate: -1 });
    // console.log('orderrrrr', orderItems);
    console.log('pro', orderItems);
    return orderItems as OrderItem[];
  }

  async deleteAll() {
    await this.orderItemModel.deleteMany();
    await this.orderModel.deleteMany();
    await this.orderSummaryModel.deleteMany();
  }

  async getReferrals(userId: string) {
    const referrals = await this.referralModel.find({
      'referrerDetails.userId': userId,
    });
    return referrals as ReferralOrder[];
  }

  async createOrder(userId: string) {
    var payableAmount;
    var couponDiscount = 0;
    let amountPaid = 0;
    let amountDue;

    //get order summary
    const userDoc = await this.userModel.findById(userId);
    const orderSummary = userDoc.orderSummary;
    const deliveryType = orderSummary.deliveryType;
    const paymentType = orderSummary.paymentType;
    const paymentMethod = orderSummary.paymentMethod;

    //generating new order details
    const orderItemDetails = await this._generateOrderItemDetails(
      orderSummary.orderItems,
    );

    payableAmount = orderItemDetails.orderTotal;

    console.log('payable amount 1', payableAmount);

    //validating coupon and coupon discount
    if (orderSummary.couponCode != null) {
      couponDiscount = await this._getCouponDiscount(
        userDoc._id.toString(),
        userDoc.name,
        orderSummary.orderNumber,
        orderSummary.couponCode,
        orderItemDetails.orderTotal,
      );
      payableAmount = payableAmount - couponDiscount;
      console.log('payable amount 2', payableAmount);
    }

    amountDue = payableAmount;
    console.log('amount due', amountDue);

    console.log('coupon validated', payableAmount);

    //validating payment
    if (paymentType == PaymentTypes.PARTIAL) {
      console.log('partial payment executing');
      let transactionData: any;
      if (paymentMethod == PaymentMethods.PAY_AT_STORE_DUE) {
        transactionData = await this.paymentModel.findOne({
          paymentId: orderSummary.partialPaymentId,
        });
      } else if (paymentMethod == PaymentMethods.CASH_ON_DELIVERY_DUE) {
        transactionData = await this.paymentModel.findOne({
          paymentId: orderSummary.partialPaymentId,
        });
      }
      const amount = transactionData.amount;
      amountPaid = amount;
      amountDue = payableAmount - amountPaid;
    } else if (paymentType == PaymentTypes.FULL) {
      console.log('full payment executing');
      let transactionData: any;
      if (paymentMethod == PaymentMethods.PREPAID) {
        transactionData = await this.paymentModel.findOne({
          paymentId: orderSummary.paymentId,
        });
        const amount = transactionData.amount;
        amountPaid = amount;
        amountDue = payableAmount - amountPaid;
      } else if (
        paymentMethod == PaymentMethods.CASH_ON_DELIVERY ||
        paymentMethod == PaymentMethods.PAY_AT_STORE
      ) {
        amountPaid = 0;
        amountDue = payableAmount;
      }
    }

    console.log('adding a new order');

    const newOrder = new this.orderModel({
      userId: userId,

      userDetails: {
        name: userDoc.name,
        emailId: userDoc.emailId,
        phoneNumber: userDoc.phoneNumber,
      },

      orderNumber: orderSummary.orderNumber,

      deliveryType: userDoc.orderSummary.deliveryType,

      shippingDetails:
        deliveryType == 'HOME DELIVERY' ? orderSummary.shippingDetails : null,
      pickUpDetails:
        deliveryType == 'STORE PICKUP' ? orderSummary.pickUpDetails : null,
      pricingDetails: {
        billTotal: orderItemDetails.orderTotal,
        payableTotal: payableAmount,
        couponCode: orderSummary.couponCode,
        couponDiscount: couponDiscount,
      },
      paymentDetails: {
        paymentType: paymentType,
        paymentMethod: paymentMethod,
        partialPaymentId:
          paymentType == 'PARTIAL' ? orderSummary.partialPaymentId : null,

        $push: { 'paymentDetails.paymentIds': orderSummary.paymentId },

        isPaid: amountDue == 0 ?? false,

        amountPaid: amountPaid,
        amountDue: amountDue,
      },
      itemsCount: orderItemDetails.orderItemsCount,
      orderItems: orderItemDetails.orderItems,
    });

    newOrder.save();

    // await this.orderSummaryModel.findOneAndUpdate(
    //   {
    //     userId: userId,
    //     isActive: true,
    //   },
    //   {
    //     isActive: false,
    //   },
    // );

    await this._handleSaveIndividualOrders(newOrder);
    this._handleSendOrderPlacedMessage(userDoc, orderItemDetails.orderItems);
    this._handleSendOrderPlacedMail(userDoc, orderItemDetails.orderItems);
    return orderSummary.orderNumber;
  }

  async acceptOrder(userId: string, orderItemId: string) {
    const order = await this.orderItemModel.findByIdAndUpdate(orderItemId, {
      orderStatus: OrderStatuses.ACCEPTED,
    });
    await this.productModel.findByIdAndUpdate(order.orderDetails.productId, {
      $inc: { quantity: 1 },
    });
    this._handleSendOrderConfirmedMessage(order);
    this._handleSendOrderConfirmedMail(order);
    this._handleOrderConfirmationNotification(order);
  }

  async orderReadyForPickUp(userId: string, orderItemId: string) {
    const order = await this.orderItemModel.findByIdAndUpdate(orderItemId, {
      orderStatus: OrderStatuses.READY_FOR_PICKUP,
    });
    this._handleSendOutForPickUpMessage(order);
    this._handleSendOutForPickUpMail(order);
    this._handleSendOrderReadyForPickUpNotification(order);
  }

  async orderShipped(userId: string, orderItemId: string) {
    const order = await this.orderItemModel.findByIdAndUpdate(orderItemId, {
      orderStatus: OrderStatuses.SHIPPED,
    });
    this._handleSendOrderShippedMessage(order);
    this._handleSendOrderShippedMail(order);
    this._handleSendOrderShippedNotification(order);
  }

  async orderOutForDelivery(userId: string, orderItemId: string) {
    const order = await this.orderItemModel.findByIdAndUpdate(orderItemId, {
      orderStatus: OrderStatuses.OUT_FOR_DELIVERY,
    });
    this._handleSendOutForDeliveryMessage(order);
    this._handleSendOutForDeliveryMail(order);
    this._handleSendOutForDeliveryNotification(order);
  }

  async orderDelivered(userId: string, orderItemId: string) {
    const order = await this.orderItemModel.findByIdAndUpdate(orderItemId, {
      deliveryTimeStamp: Date(),
      orderStatus: OrderStatuses.DELIVERED,
    });
    console.log('delivering  order', order);

    // this._handleSendOrderDeliveredMessage(order);
    // this._handleSendOrderDeliveredMail(order);
    // this._handleSendOrderDeliveredNotification(order);

    // const itemPurchasedUsers = await this.itemPurchasedUsersModel.findOne({
    //   productId: order.orderDetails.productId,
    // });
    // if (itemPurchasedUsers) {
    //   await this.itemPurchasedUsersModel.findOneAndUpdate(
    //     {
    //       productId: order.orderDetails.productId,
    //     },
    //     {
    //       $push: {
    //         userIds: order.userId.substring(0, 20),
    //         users: {
    //           userId: order.userId,
    //           userName: order.userDetails.userName,
    //           phoneNumber: order.userDetails.phoneNumber,
    //           emailId: order.userDetails.emailId,
    //         },
    //       },
    //     },
    //   );
    // } else {
    //   const newItemPurchasedUsers = new this.itemPurchasedUsersModel({
    //     productId: order.orderDetails.productId,
    //     users: [
    //       {
    //         userId: order.userId,
    //         userName: order.userDetails.userName,
    //         phoneNumber: order.userDetails.phoneNumber,
    //         emailId: order.userDetails.emailId,
    //       },
    //     ],
    //     userIds: [order.userId.substring(0, 20)],
    //   });
    //   newItemPurchasedUsers.save();
    // }
    // await this.userModel.findByIdAndUpdate(order.userId, {
    //   $push: { purchasedItemIds: order.orderDetails.productId },
    // });
  }

  async cancelOrder(userId: string, entireBody: CancelOrderDto) {
    console.log('cancelling order');
    const order = await this.orderItemModel.findById(entireBody.orderId);
    if (order.userId == userId) {
      await this.orderItemModel.findByIdAndUpdate(entireBody.orderId, {
        orderStatus: OrderStatuses.CANCELLED,
      });
      console.log('canclled order');
    }
  }

  async getOrderItems(userId: string) {
    console.log('order user id', userId);
    const orderItems = await this.orderItemModel.find({
      userId: userId,
    });
    console.log('orderrrrr', orderItems);
    return orderItems as OrderItem[];
  }
  async getOrder(userId: string, orderNumber: string) {
    console.log('getting order', orderNumber);
    var order = await this.orderModel.findOne({
      orderNumber: orderNumber,
      userId: userId,
    });
    console.log('pprd', order);
    return order;
  }

  async getOrderItem(userId: string, orderItemId: string) {
    var orderItem = await this.orderItemModel.findById(orderItemId);
    if (orderItem) {
      const review = await this.reviewModel.findOne({
        userId: userId,
        productId: orderItem.orderDetails.productId,
      });
      console.log('currentorderreview', review);

      if (review) {
        // reviewDetails = {
        //   isReviewed: true,
        //   rating: review.rating,
        //   reviewTitle: review.reviewTitle,
        //   reviewContent: review.reviewContent,
        // };
        return {
          status: 'success',
          message: 'order data received',
          data: {
            orderItem: orderItem,
            reviewData: review,
          },
        };
      } else {
        // reviewDetails = {
        //   isReviewed: false,
        // };
        return {
          status: 'success',
          message: 'order data received',
          data: {
            orderItem: orderItem,
            review: null,
          },
        };
      }
      // const orderItemDetails = {
      //   reviewDetails: reviewDetails,
      //   shippingDetails: orderItem.shippingDetails,
      //   deliveryDetails: orderItem.shippingDetails,
      //   pickUpDetails: orderItem.pickUpDetails,
      //   paymentDetails: orderItem.pickUpDetails,
      //   pricingDetails: orderItem.pricingDetails,
      //   orderDetails: orderItem.orderDetails,
      //   orderNumber: orderItem.orderNumber,
      //   orderDate: orderItem.orderDate,
      //   orderStatus: orderItem.orderStatus,
      //   id: orderItem._id,
      // };
      // return orderItemDetails;
    }
  }

  async _getCouponDiscount(
    userId: string,
    userName: string,
    orderNumber: string,
    couponCode: string,
    orderTotal: number,
  ) {
    const coupon = await this.couponModel
      .findOne({ couponCode: couponCode })
      .select('+couponDetails.userId');
    console.log('coupon', coupon);
    console.log('coupon redemption', coupon.redemptionType);
    if (coupon && orderTotal >= coupon.minimumOrderTotal) {
      if (coupon.isPersonalCoupon) {
        const newReferral = new this.referralModel({
          orderNumber: orderNumber,
          couponCode: coupon.couponCode,
          referrerDetails: {
            userId: coupon.couponDetails.userId,
            phoneNumber: coupon.couponDetails.phoneNumber,
            userName: coupon.couponDetails.userName,
            userEmail: coupon.couponDetails.userEmail,
          },
          refereeDetails: {
            userId: userId,
            userName: userName,
          },
          cashBackDetails: {
            cashBackAmount: '500',
          },
          discountDetails: {
            discountAmount: coupon.discountAmount,
          },
        });
        newReferral.save();
        console.log('starting referral message');
        await this._handleSendReferralOrderPlaceMessage(
          userName,
          coupon.couponDetails.phoneNumber,
        );
        console.log('starting referral mail');
        await this._handleSendReferralOrderPlaceMail(
          userName,
          coupon.couponDetails.userEmail,
        );
        await this.referralOrderNotification(
          coupon.couponDetails.userName,
          coupon.couponDetails.userId,
          userName,
        );
        console.log('coupon', coupon);
        return coupon.discountAmount;
      } else if (
        coupon.redemptionType == 'LIMITED' &&
        coupon.redemptionLimit > 0
      ) {
        console.log('decremnting coupon');
        const updatedCoupon = await this.couponModel.findByIdAndUpdate(
          coupon._id,
          {
            $inc: { redemptionLimit: -1 },
          },
        );
        console.log('coupon udated', updatedCoupon);
        return coupon.discountAmount;
      } else {
        return coupon.discountAmount;
      }
    }
    return 0;
  }

  async _validateCouponCode(couponCode: string, orderTotal: number) {
    console.log('coupon validating', couponCode);
    if (couponCode != undefined) {
      const coupon = await this.couponModel.findOne({ couponCode: couponCode });
      if (coupon && orderTotal >= coupon.minimumOrderTotal) {
        console.log('coupon exists', coupon);
        const payableAmount = orderTotal - coupon.discountAmount;
        console.log('payable amount', payableAmount);
        return {
          couponDiscount: coupon.discountAmount,
          payableAmount: payableAmount,
        };
      }
    } else {
      return {
        couponDiscount: 0,
        payableAmount: orderTotal,
      };
    }
  }

  async _generateOrderItemDetails(orderItemsList: any) {
    // const couponDiscount = await this._getCouponDiscount();
    const orderItems = [];
    let orderTotal = 0;
    for (const item of orderItemsList) {
      const orderItem = await this._generateSingleOrderItemDetails(
        item.productId,
        item.productCount,
      );
      orderTotal += orderItem.total;
      orderItems.push(orderItem);
    }
    return {
      orderItemsCount: orderItems.length,
      orderItems: orderItems,
      orderTotal: orderTotal,
    };
  }

  async _generateSingleOrderItemDetails(productId: string, count: number) {
    const product = await this.productModel.findById(productId);
    const newOrderItem = {
      productId: productId,
      pricePerItem: product.pricing.sellingPrice,
      productCount: count,
      total: product.pricing.sellingPrice * count,
      productDetails: {
        imageUrl: product.imageUrls.coverImage,
        title: product.title,
        color: product.moreDetails.color,
        condition: product.condition,
        brand: product.brand,
        category: product.category,
      },
    };
    return newOrderItem;
  }

  async _handleSaveIndividualOrders(order: Order) {
    // const paymentType = order.paymentDetails.paymentType;
    // const paymentMethod = order.paymentDetails.paymentMethod;
    const paymentId = order.paymentDetails.paymentIds[0];
    // const partialPaymentId = order.paymentDetails.partialPaymentId;
    const itemsCount = order.orderItems.length;
    let amountPaid = order.paymentDetails.amountPaid;
    let amountDue = order.paymentDetails.amountDue;
    for (const orderItem of order.orderItems) {
      const couponDiscount = order.pricingDetails.couponDiscount / itemsCount;
      let payableAmount = orderItem.total - couponDiscount;
      amountPaid = amountPaid / itemsCount;
      amountDue = orderItem.total - couponDiscount - amountPaid;

      const newOrderItem = new this.orderItemModel({
        userId: order.userId,
        orderNumber: order.orderNumber,
        shippingDetails: order.shippingDetails,
        userDetails: {
          emailId: order.userDetails.emailId,
          phoneNumber: order.userDetails.phoneNumber,
          userName: order.userDetails.name,
        },
        pickUpDetails: order.pickUpDetails,
        paymentDetails: {
          paymentType: order.paymentDetails.paymentType,
          paymentMethod: order.paymentDetails.paymentMethod,
          paymentId: paymentId,
          partialPaymentId: order.paymentDetails.partialPaymentId,
          amountPaid: amountPaid,
          amountDue: amountDue,
          isPaid: amountDue == 0 ?? false,
        },
        deliveryType: order.deliveryType,
        pricingDetails: {
          billTotal: orderItem.total,
          payableTotal: payableAmount,
          couponCode: order.pricingDetails.couponCode,
          couponDiscount: order.pricingDetails.couponDiscount,
        },
        productDetails: orderItem.productDetails,
        orderDetails: {
          productId: orderItem.productId,
          pricePerItem: orderItem.pricePerItem,
          productCount: orderItem.productCount,
        },
      });
      newOrderItem.save();
      // await this.userModel.findByIdAndUpdate(order.userId, {p
      //   $pull: { cartItems: orderItem.productId },
      //   orderSummary: {},
      // });
    }
  }

  async createPaymentOrder() {
    // const order = instance.orders.create({
    //   amount: 50000,
    //   currency: 'INR',
    //   receipt: 'receipt#1',
    //   notes: {
    //     key1: 'value3',
    //     key2: 'value2',
    //   },
    // });
    // return order;
  }

  async validatePaymentSignature() {
    // const generated_signature = hmac_sha256("order_JHMGkySLiXlFMY" + "|" + razorpay_payment_id, secret);
  }

  sendNotification(data: any) {
    var headers = {
      'Content-Type': 'application/json; charset=utf-8',
      Authorization: `Basic NzRjZDliNTUtY2Q5ZC00MjExLTk4MWEtZDZlMjg5MDYyYzBm`,
    };

    var options = {
      host: 'onesignal.com',
      port: 443,
      path: '/api/v1/notifications',
      method: 'POST',
      headers: headers,
    };

    var https = require('https');
    var req = https.request(options, function (res) {
      res.on('data', function (data) {
        console.log('Response:');
        console.log(JSON.parse(data));
      });
    });

    req.on('error', function (e) {
      console.log('ERROR:');
      console.log(e);
    });

    req.write(JSON.stringify(data));
    req.end();
  }

  //order placed messages

  async _handleSendOrderPlacedMessage(userDoc: any, orderItems: any) {
    console.log('sending order message');
    const url = 'https://api.msg91.com/api/v5/flow';
    let order = orderItems[0].productDetails.title.substring(0, 27) + '...';
    if (orderItems.count > 1) {
      order =
        orderItems[0].productDetails.title.substring(0, 18) +
        '...' +
        '+' +
        `${orderItems.count - 1} ${orderItems.count > 2 ? 'items' : 'item'}`;
    }
    console.log('order message', order);
    console.log('count', order.length);
    const postBody = {
      flow_id: process.env.ORDER_PLACED_FLOW_ID,
      sender: process.env.ORDER_SMS_SENDER_ID,
      mobiles: '91' + userDoc.phoneNumber,
      order: order,
      authkey: process.env.SMS_AUTH_KEY,
    };
    console.log('udd', userDoc._id);
    console.log('91' + userDoc.phoneNumber);
    await axios.post(url, postBody);

    // const orderItemDetails = userDoc.orderSummary;
    // const url = 'https://api.msg91.com/api/v5/flow';
    // let order =
    //   orderItemDetails.orderItems[0].productDetails.title.substring(0, 27) +
    //   '...';
    // if (orderItemDetails.orderItemsCount > 1) {
    //   order =
    //     orderItemDetails.orderItems[0].productDetails.title.substring(0, 18) +
    //     '...' +
    //     '+' +
    //     `${orderItemDetails.orderItemsCount - 1} ${
    //       orderItemDetails.orderItemsCount > 2 ? 'items' : 'item'
    //     }`;
    // }
    // console.log('order message', order);
    // console.log('count', order.length);
    // const postBody = {
    //   flow_id: process.env.ORDER_PLACED_FLOW_ID,
    //   sender: process.env.ORDER_SMS_SENDER_ID,
    //   mobiles: '91' + userDoc.phoneNumber,
    //   order: order,
    //   authkey: process.env.SMS_AUTH_KEY,
    // };
    // await axios.post(url, postBody);
  }

  async _handleSendOrderPlacedMail(userDoc: any, orderItems: any) {
    console.log('sending order mail', orderItems);
    let order = orderItems[0].productDetails.title;
    if (orderItems.count > 1) {
      order =
        orderItems[0].productDetails.title +
        '+' +
        `${orderItems.count - 1} ${orderItems.count > 2 ? 'items' : 'item'}`;
    }
    const msg = {
      to: userDoc.emailId,
      from: 'info@unboxedkart.com',
      templateId: process.env.ORDER_PLACED_TEMPLATE_ID,
      dynamic_template_data: {
        order: order,
        name: userDoc.name,
      },
    };
    const transport = await SendGrid.send(msg)
      .then(() => console.log('email send'))
      .catch((e) => console.log('email error', e));
    return transport;

    // if (order.deliveryType == 'STORE PICKUP') {
    //   const msg = {
    //     to: order.userDetails.emailId,
    //     from: 'info@unboxedkart.com',
    //     templateId: 'd-a138d401839444518e9515218e7af1e7',
    //     dynamic_template_data: {
    //       order: order.orderDetails.productTitle,
    //       orderId: order.orderNumber,
    //       userName: order.userDetails.userName,
    //     },
    //   };
    //   const transport = await SendGrid.send(msg)
    //     .then(() => console.log('email send'))
    //     .catch((e) => console.log('email error', e));
    //   return transport;
    // } else if (order.deliveryType == 'HOME DELIVERY') {
    //   const msg = {
    //     to: 'bsunil135@gmail.com',
    //     from: 'info@unboxedkart.com',
    //     templateId: 'd-a138d401839444518e9515218e7af1e7',
    //     dynamic_template_data: {
    //       order: order.orderDetails.productTitle,
    //       orderId: order.orderNumber,
    //       userName: order.userDetails.userName,
    //     },
    //   };
    //   const transport = await SendGrid.send(msg)
    //     .then(() => console.log('email send'))
    //     .catch((e) => console.log('email error', e));
    //   return transport;
    // }
  }

  //referral order notifications

  async _handleSendReferralOrderPlaceMessage(
    name: string,
    phoneNumber: number,
  ) {
    console.log('sending referral message');
    const url = 'https://api.msg91.com/api/v5/flow';
    const postBody = {
      flow_id: process.env.REFERRAL_ORDER_FLOW_ID,
      sender: process.env.ORDER_SMS_SENDER_ID,
      mobiles: '91' + phoneNumber,
      name: name,
      authkey: process.env.SMS_AUTH_KEY,
    };
    console.log('91' + phoneNumber);
    await axios.post(url, postBody);
  }

  async _handleSendReferralOrderPlaceMail(userName: any, emailId: string) {
    const msg = {
      to: emailId,
      from: 'info@unboxedkart.com',
      templateId: process.env.REFERRAL_ORDER_TEMPLATE_ID,
      dynamic_template_data: {
        name: userName,
      },
    };
    const transport = await SendGrid.send(msg)
      .then(() => console.log('email send'))
      .catch((e) => console.log('email error', e));
    return transport;
  }

  async referralOrderNotification(referrerName, referrerId, referreName) {
    const title = `Hey ${referrerName}, Congratulations !`;
    const content = `Congratulations. Your friend (${referreName}) has ordered a product from unboxedkart using your referral coupon code. Referral bonus will be credited to your bank account after the product is successfully delivered. Please, add your bank details, if not added.T&Cs Apply.`;
    //without template
    var message = {
      app_id: '12fb7561-03e6-409e-bc03-a558aee286de',
      channel_for_external_user_ids: 'push',
      contents: {
        en: content,
      },
      headings: {
        en: title,
      },
      include_external_user_ids: [referrerId.substring(0, 20)],
    };
    const response = this.sendNotification(message);
  }

  // order confirmed messages

  async _handleSendOrderConfirmedMessage(order: any) {
    if (order.deliveryType == 'STORE PICKUP') {
      const url = process.env.SMS_FLOW_URL;
      const postBody = {
        flow_id: process.env.PICKUP_ORDER_CONFIRMED_FLOW_ID,
        sender: process.env.ORDER_SMS_SENDER_ID,
        mobiles: '91' + order.userDetails.phoneNumber,
        authkey: process.env.SMS_AUTH_KEY,
        order: order.productDetails.title.substring(0, 25) + '...',
        orderid: order.orderNumber,
        pickupdate: order.pickUpDetails.pickUpDateInString,
      };
      await axios.post(url, postBody);
    } else if (order.deliveryType == 'HOME DELIVERY') {
      const url = process.env.SMS_FLOW_URL;
      const postBody = {
        flow_id: process.env.DELIVERY_ORDER_CONFIRMED_FLOW_ID,
        sender: process.env.ORDER_SMS_SENDER_ID,
        mobiles: '91' + order.userDetails.phoneNumber,
        authkey: process.env.SMS_AUTH_KEY,
        order: order.productDetails.title.substring(0, 25) + '...',
        orderid: order.orderNumber,
        deliverydate: order.shippingDetails.deliveryDateInString,
      };
      await axios.post(url, postBody);
    }
  }

  async _handleSendOrderConfirmedMail(order: any) {
    if (order.deliveryType == 'STORE PICKUP') {
      const msg = {
        to: order.userDetails.emailId,
        from: 'info@unboxedkart.com',
        templateId: process.env.PICKUP_ORDER_CONFIRMED_TEMPLATE_ID,
        dynamic_template_data: {
          name: order.userDetails.name,
          order: order.productDetails.title,
          orderId: order.orderNumber,
          pickupdate: order.pickUpDetails.pickUpDateInString,
        },
      };
      const transport = await SendGrid.send(msg)
        .then(() => console.log('email send', 'confirmed'))
        .catch((e) => console.log('email error', e));
      return transport;
    } else if (order.deliveryType == 'HOME DELIVERY') {
      const msg = {
        to: order.userDetails.emailId,
        from: 'info@unboxedkart.com',
        templateId: process.env.DELIVERY_ORDER_CONFIRMED_TEMPLATE_ID,
        dynamic_template_data: {
          name: order.userDetails.name,
          order: order.productDetails.title,
          orderId: order.orderNumber,
          deliverydate: order.shippingDetails.deliveryDateInString,
        },
      };
      const transport = await SendGrid.send(msg)
        .then(() => console.log('email send'))
        .catch((e) => console.log('email error', e));
      return transport;
    }
  }

  async _handleOrderConfirmationNotification(order: any) {
    const title = `Hey ${order.userDetails.userName}, Your order is confirmed`;
    const content = `Your order for ${order.productDetails.title} is confirmed & will be ready for pick up by ${order.pickUpDetails.pickUpDateInString}. Click here to know more..`;
    //without template
    var message = {
      app_id: '12fb7561-03e6-409e-bc03-a558aee286de',
      channel_for_external_user_ids: 'push',
      contents: {
        en: content,
      },
      headings: {
        en: title,
      },
      include_external_user_ids: [order.userId.substring(0, 20)],
    };
    const response = this.sendNotification(message);
    console.log('response', response);
  }

  // out for pickup messages

  async _handleSendOutForPickUpMail(order: any) {
    const msg = {
      to: order.userDetails.emailId,
      from: 'info@unboxedkart.com',
      templateId: process.env.PICKUP_ORDER_READY_FOR_PICKUP,
      dynamic_template_data: {
        name: order.userDetails.userName,
        order: order.orderDetails.productTitle,
        orderId: order.orderNumber,
        pickupdate: order.pickUpDetails.pickUpDateInString,
        pickuptime: order.pickUpDetails.pickUpTimeInString,
        pickupstore: order.pickUpDetails.storeLocation.storeName,
        otp: '123456',
        directions: order.pickUpDetails.storeLocation.directions,
      },
    };
    const transport = await SendGrid.send(msg)
      .then(() => console.log('email send'))
      .catch((e) => console.log('email error', e));
    return transport;
  }

  async _handleSendOutForPickUpMessage(order: any) {
    const url = process.env.SMS_FLOW_URL;
    const postBody = {
      flow_id: process.env.PICKUP_ORDER_READY_FOR_PICKUP_FLOW_ID,
      sender: process.env.ORDER_SMS_SENDER_ID,
      mobiles: '91' + order.userDetails.phoneNumber,
      authkey: process.env.SMS_AUTH_KEY,
      order: order.productDetails.title.substring(0, 25) + '...',
      orderid: order.orderNumber,
      pickupdate: order.pickUpDetails.pickUpDateInString,
      pickuptime: order.pickUpDetails.pickUpTimeInString,
      pickupstore: order.pickUpDetails.storeLocation.storeName,
      otp: '123456',
      directions: order.pickUpDetails.storeLocation.directions,
    };
    await axios.post(url, postBody);
  }

  async _handleSendOrderReadyForPickUpNotification(order: any) {
    const title = `Hey ${order.userDetails.userName}, Your order is ready for pickup`;
    const content = `Your order for ${order.productDetails.title} is ready for pickup. Click here to get directions to our store.`;
    //without template
    var message = {
      app_id: '12fb7561-03e6-409e-bc03-a558aee286de',
      channel_for_external_user_ids: 'push',
      contents: {
        en: content,
      },
      headings: {
        en: title,
      },
      include_external_user_ids: [order.userId.substring(0, 20)],
    };
    const response = this.sendNotification(message);
  }

  // order shipped messages

  async _handleSendOrderShippedMessage(order: any) {
    const url = process.env.SMS_FLOW_URL;
    const postBody = {
      flow_id: process.env.DELIVERY_ORDER_SHIPPED_FLOW_ID,
      sender: process.env.ORDER_SMS_SENDER_ID,
      mobiles: '91' + order.userDetails.phoneNumber,
      authkey: process.env.SMS_AUTH_KEY,
      order: order.productDetails.title.substring(0, 25) + '...',
      orderid: order.orderNumber,
      deliverydate: order.shippingDetails.deliveryDate,
    };
    await axios.post(url, postBody);
  }

  async _handleSendOrderShippedMail(order: any) {
    const msg = {
      to: order.userDetails.emailId,
      from: 'info@unboxedkart.com',
      templateId: process.env.DELIVERY_ORDER_SHIPPED_TEMPLATE_ID,
      dynamic_template_data: {
        name: order.userDetails.userName,
        order: order.productDetails.title,
        orderid: order.orderNumber,
        deliverydate: order.shippingDetails.deliveryDate,
      },
    };
    const transport = await SendGrid.send(msg)
      .then(() => console.log('email send'))
      .catch((e) => console.log('email error', e));
    return transport;
  }

  async _handleSendOrderShippedNotification(order: any) {
    const title = `Hey ${order.userDetails.userName}, Your order has been shipped`;
    const content = `Your order for ${order.productDetails.title} with has been shipped & will be delivered to you by ${order.shippingDetails.deliveryDateInString}.`;
    //without template
    var message = {
      app_id: '12fb7561-03e6-409e-bc03-a558aee286de',
      channel_for_external_user_ids: 'push',
      contents: {
        en: content,
      },
      headings: {
        en: title,
      },
      include_external_user_ids: [order.userId.substring(0, 20)],
    };
    const response = this.sendNotification(message);
  }

  // out for delivery messages

  async _handleSendOutForDeliveryMessage(order: any) {
    console.log('order details', order);
    const url = process.env.SMS_FLOW_URL;
    const postBody = {
      flow_id: process.env.DELIVERY_ORDER_OUT_FOR_DELIVERY_FLOW_ID,
      sender: process.env.ORDER_SMS_SENDER_ID,
      mobiles: '91' + order.userDetails.phoneNumber,
      authkey: process.env.SMS_AUTH_KEY,
      order: order.productDetails.title.substring(0, 25) + '...',
      orderid: order.orderNumber,
      otp: '123456',
    };
    await axios.post(url, postBody);
  }

  async _handleSendOutForDeliveryMail(order: any) {
    const msg = {
      to: order.userDetails.emailId,
      from: 'info@unboxedkart.com',
      templateId: process.env.DELIVERY_ORDER_OUT_FOR_DELIVERY_TEMPLATE_ID,
      dynamic_template_data: {
        name: order.userDetails.userName,
        order: order.productDetails.title,
        orderid: order.orderNumber,
        otp: '123456',
      },
    };
    const transport = await SendGrid.send(msg)
      .then(() => console.log('email send'))
      .catch((e) => console.log('email error', e));
    return transport;
  }

  async _handleSendOutForDeliveryNotification(order: any) {
    const title = `Hey ${order.userDetails.userName}, Your order will be delivered today`;
    const content = `Your order for ${order.productDetails.title} is confirmed & will be delivered today.`;
    //without template
    var message = {
      app_id: '12fb7561-03e6-409e-bc03-a558aee286de',
      channel_for_external_user_ids: 'push',
      contents: {
        en: content,
      },
      headings: {
        en: title,
      },
      include_external_user_ids: [order.userId.substring(0, 20)],
    };
    const response = this.sendNotification(message);
    console.log('response', response);
  }

  // order delivered messages

  async _handleSendOrderDeliveredMessage(order: any) {
    console.log('order details', order);
    const url = process.env.SMS_FLOW_URL;
    const postBody = {
      flow_id: process.env.ORDER_DELIVERED_FLOW_ID,
      sender: process.env.ORDER_SMS_SENDER_ID,
      mobiles: '91' + order.userDetails.phoneNumber,
      authkey: process.env.SMS_AUTH_KEY,
      order: order.productDetails.title.substring(0, 25) + '...',
      orderid: order.orderNumber,
    };
    await axios.post(url, postBody);
  }

  async _handleSendOrderDeliveredMail(order: any) {
    const msg = {
      to: order.userDetails.emailId,
      from: 'info@unboxedkart.com',
      templateId: process.env.ORDER_DELIVERED_TEMPLATE_ID,
      dynamic_template_data: {
        name: order.userDetails.userName,
        order: order.productDetails.title,
        orderid: order.orderNumber,
      },
    };
    const transport = await SendGrid.send(msg)
      .then(() => console.log('email send'))
      .catch((e) => console.log('email error', e));
    return transport;
  }

  async _handleSendOrderDeliveredNotification(order: any) {
    const title = `Hey ${order.userDetails.userName}, Your order has been delivered`;
    const content = `Your order for ${order.productDetails.title} has been delivered. Click here to rate your purchase`;
    //without template
    var message = {
      app_id: '12fb7561-03e6-409e-bc03-a558aee286de',
      channel_for_external_user_ids: 'push',
      contents: {
        en: content,
      },
      headings: {
        en: title,
      },
      include_external_user_ids: [order.userId.substring(0, 20)],
    };
    const response = this.sendNotification(message);
  }

  async getSalesOverview(startDate: string) {
    const sales = await this.orderItemModel.find({
      orderStatus: 'DELIVERED',
      deliveryTimeStamp: { $gte: startDate },
    });
    const orders = await this.orderItemModel.find({
      orderDate: { $gte: startDate },
    });
    return {
      sales: sales as [],
      orders: orders as [],
    };
  }

  async uploadInvoice(file: any) {}
}

export interface IndividualOrderItem {
  paymentType: String;
  paymentMethod: string;
  partialPaymentId: string;
  paymentId: string;

  deliveryType: String;
  itemsCount: number;
  orderData: any;
  orderNumber: string;
  // deliveryAddress: string;
  // storeLocation: string;
  couponCode: string;
  couponDiscount: number;
  shippingDetails: {
    shipDate: any;
    deliveryDate: string;
    deliveryDateInString: string;
    deliveryAddress: any;
  };
  pickUpDetails: {
    pickUpDate: any;
    storeLocation: any;
    pickUpTimeStart: string;
    pickUpTimeEnd: string;
    pickUpTimeInString: string;
    pickUpDateInString: string;
  };
}

// async _getCouponDiscount(couponCode : string){
//   const couponDiscount = await this.
// }

// console.log('single product', order);
// console.log('order data', order);
// console.log(
//   'total',
//   order.total,
//   'coupon discount',
//   params.couponDiscount,
//   'length',
//   params.orderData.length,
// );

// const newOrder = new this.orderModel({
//   userId: userId,
//   orderNumber: orderNumber,
//   deliveryType: 0,
//   paymentDetails: {
//     paymentType: paymentTypes.PAY_AT_STORE,
//     billTotal: orderItemDetails.orderTotal,
//     payableTotal: payableAmount.payableAmount,
//     couponCode: orderSummary.couponCode,
//     couponDiscount: payableAmount.couponDiscount,
//   },
//   // deliveryAddress: entireBody.deliveryAddress,
//   itemsCount: orderItemDetails.orderItemsCount,
//   orderItems: orderItemDetails.orderItems,
// });

// const payableAmount = await this._validateCouponCode(
//   orderSummary.couponCode,
//   orderItemDetails.orderTotal,
// );

//creating order object

// if (paymentType == PaymentTypes.PARTIAL) {
//   let transactionData: any;
//   if (paymentMethod == PaymentMethods.PAY_AT_STORE_DUE) {
//     transactionData = await this.paymentModel.findOne({
//       paymentId: partialPaymentId,
//     });
//   } else if (paymentMethod == PaymentMethods.CASH_ON_DELIVERY_DUE) {
//     transactionData = await this.paymentModel.findOne({
//       paymentId: partialPaymentId,
//     });
//   }
//   const amount = transactionData.amount;
//   amountPaid = amount;
//   amountDue = payableAmount - amountPaid;
// } else if (paymentType == PaymentTypes.FULL) {
//   let transactionData: any;
//   if (paymentMethod == PaymentMethods.PREPAID) {
//     transactionData = await this.paymentModel.findOne({
//       paymentId: partialPaymentId,
//     });
//     const amount = transactionData.amount;
//     amountPaid = amount;
//     amountDue = payableAmount - amountPaid;
//   } else if (
//     paymentMethod == PaymentMethods.CASH_ON_DELIVERY ||
//     paymentMethod == PaymentMethods.PAY_AT_STORE
//   ) {
//     amountPaid = 0;
//     amountDue = payableAmount;
//   }
// }

//saving order individually in db

// await this._handleSaveIndividualOrders(userDoc, {
// orderNumber: orderNumber,
// deliveryType: orderSummary.deliveryType,
// paymentType: paymentType,

// itemsCount: orderItemDetails.orderItemsCount,
// orderData: orderItemDetails.orderItems,

// shippingDetails: orderSummary.shippingDetails,
// pickUpDetails : orderSummary.pickUpDetails,
// couponCode: orderSummary.couponCode,
// couponDiscount: couponDiscount,
// });

// let orderItemIds = [];

// orderNumber: orderNumber,
// orderDate: Date.now(),
// selectedPickUpDate: Date.now(),
// deliveryDate: orderSummary.shippingDetails.deliveryDateInString,
// pickUpDateInString: orderSummary.pickUpDetails.pickUpDateInString,
// pickUpTimeInString: orderSummary.pickUpDetails.pickUpTimeInString,
// paymentType: paymentTypes.PAY_AT_STORE,
// deliveryType: orderSummary.deliveryType,
// selectedAddress: orderSummary.shippingDetails.deliveryAddress,
// selectedStore: orderSummary.pickUpDetails.storeLocation,
// orderItems: orderItemDetails,
