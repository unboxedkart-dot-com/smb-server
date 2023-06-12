import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as SendGrid from '@sendgrid/mail';
import axios from 'axios';
import { Model } from 'mongoose';
import { title } from 'process';
import { Coupon } from 'src/models/coupon.model';
import { ItemPurchasedUser } from 'src/models/item-purchased-user.model';
import { NotificationModel } from 'src/models/notification.model';
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
import { StoreNotificationModel } from 'src/models/store-app/store-notification.model';
import { User } from 'src/models/user.model';
import { CancelOrderDto } from './dto/cancel-order.dto';

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
    @InjectModel('Notification')
    private readonly notificationModel: Model<NotificationModel>,
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
    const currentTime = Date.now();
    //get order summary
    const userDoc = await this.userModel.findById(userId);
    const orderSummary = userDoc.orderSummary;
    const deliveryType = orderSummary.deliveryType;
    const paymentType = orderSummary.paymentType;
    const paymentMethod = orderSummary.paymentMethod;
    // const productData = orderSummary.

    //generating new order details
    const orderItemDetails = await this._generateOrderItemDetails(
      orderSummary.orderItems,
    );
    const productId = orderSummary.orderItems[0].productId;
    const productData = await this.productModel.findById(productId);
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

    console.log('adding a new order sss', orderSummary);
    console.log('adding a new payment sss', orderSummary.paymentId);

    const newOrder = new this.orderModel(
      {
        orderStatus:
          productData.quantity == 0
            ? OrderStatuses.PREORDERD
            : OrderStatuses.ORDERED,
        timestamp: currentTime,
        orderDate: currentTime,
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
          isPaid: amountDue == 0 ?? false,
          paymentIds: [orderSummary.paymentId],

          amountPaid: amountPaid,
          amountDue: amountDue,
        },
        itemsCount: orderItemDetails.orderItemsCount,
        orderItems: orderItemDetails.orderItems,
      },
      // { $push: { 'paymentDetails.paymentIds': orderSummary.paymentId } },
    );

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

    await this._handleSaveIndividualOrders(userId, userDoc, newOrder);
    // this._handleSendOrderPlacedMessage(userDoc, orderItemDetails.orderItems);
    // this._handleSendOrderPlacedMail(userDoc, orderItemDetails.orderItems);
    return orderSummary.orderNumber;
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
    console.log('order user id in reverse order', userId);
    const orderItems = await this.orderItemModel
      .find({
        userId: userId,
      })
      .sort({ timestamp: -1 });
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

  async _handleSaveIndividualOrders(
    userId: string,
    userDoc: User,
    order: Order,
    // orderType: string,
  ) {
    console.log('executing new individual order');
    // const paymentType = order.paymentDetails.paymentType;
    // const paymentMethod = order.paymentDetails.paymentMethod;
    const currentTime = Date.now();
    const paymentId = order.paymentDetails.paymentIds[0];
    // const partialPaymentId = order.paymentDetails.partialPaymentId;
    const itemsCount = order.orderItems.length;
    console.log('items count', itemsCount);
    const deliveryType = order.deliveryType;
    let amountPaid = order.paymentDetails.amountPaid / itemsCount;
    let amountDue = order.paymentDetails.amountDue;
    const couponDiscount = order.pricingDetails.couponDiscount / itemsCount;
    for (const orderItem of order.orderItems) {
      let productData = await this.productModel.findById(orderItem.productId);
      let payableAmount = orderItem.total - couponDiscount;
      // console.log('new amount paid', amountPaid);
      // amountPaid = amountPaid / itemsCount;
      // console.log('new amount paid', amountPaid);
      // console.log('new amount paid', amountPaid);
      amountDue = orderItem.total - couponDiscount - amountPaid;
      const newOrderItem = new this.orderItemModel({
        orderStatus:
          productData.quantity == 0
            ? OrderStatuses.PREORDERD
            : OrderStatuses.ORDERED,
        timestamp: currentTime,
        userId: order.userId,
        orderNumber: order.orderNumber,
        orderDate: order.orderDate,
        shippingDetails:
          deliveryType != 'STORE PICKUP' ? order.shippingDetails : null,
        userDetails: {
          emailId: order.userDetails.emailId,
          phoneNumber: order.userDetails.phoneNumber,
          userName: order.userDetails.name,
        },
        pickUpDetails:
          deliveryType == 'STORE PICKUP' ? order.pickUpDetails : null,
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
          couponCode: order.pricingDetails.couponCode ?? 'NA',
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
      const content =
        `Payable Amount is ₹${
          orderItem.pricePerItem - newOrderItem.pricingDetails.couponDiscount
        }` +
        (couponDiscount != 0 ? ' - ' : '') +
        (couponDiscount != 0 ? newOrderItem.pricingDetails.couponCode : '') +
        (couponDiscount != 0
          ? `(₹${newOrderItem.pricingDetails.couponDiscount})`
          : '');
      const newNotification = new this.notificationModel({
        userId: userId,
        title: `New Item Ordered by ${userDoc.name} - ${userDoc.phoneNumber}`,
        subtitle: `${orderItem.productDetails.title}`,
        content: content,
        // `Payable Amount is ₹${
        //   orderItem.pricePerItem - newOrderItem.pricingDetails.couponDiscount
        // } (₹${newOrderItem.pricingDetails.billTotal}) ${
        //   couponDiscount > 0 ? '-' : ''
        // }
        // ${couponDiscount > 0 ? newOrderItem.pricingDetails.couponCode : ''}
        // ${couponDiscount > 0 ? newOrderItem.pricingDetails.couponCode : ''}
        //     (₹${newOrderItem.pricingDetails.couponDiscount})`,
        type: 'new-order',
        userPhoneNumber: userDoc.phoneNumber,
        orderId: newOrderItem.orderNumber,
        orderItemId: newOrderItem.orderNumber,
        orderStatus: newOrderItem.orderStatus,
        productTitle: orderItem.productDetails.title,
      });
      newNotification.save();
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
      Authorization: `Basic ${process.env.NOTIFICATION_AUTH_KEY}`,
    };

    var options = {
      host: `${process.env.NOTIFICATION_HOST}`,
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
    const adminPostBody1 = {
      flow_id: process.env.ORDER_PLACED_FLOW_ID,
      sender: process.env.ORDER_SMS_SENDER_ID,
      mobiles: '919494111131',
      order: order,
      authkey: process.env.SMS_AUTH_KEY,
    };
    await axios.post(url, adminPostBody1);
    const adminPostBody2 = {
      flow_id: process.env.ORDER_PLACED_FLOW_ID,
      sender: process.env.ORDER_SMS_SENDER_ID,
      mobiles: '917097070707',
      order: order,
      authkey: process.env.SMS_AUTH_KEY,
    };
    await axios.post(url, adminPostBody2);

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

  async sendInvoiceCopy(userId: string, orderId: string) {
    const user = await this.userModel.findById(userId);
    const emailId = user.emailId;
  }
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
