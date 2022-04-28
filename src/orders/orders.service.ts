import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as SendGrid from '@sendgrid/mail';
import axios from 'axios';
import { Model } from 'mongoose';
import { AuthService } from 'src/auth/auth.service';
import { Coupon } from 'src/models/coupon.model';
import { ItemPurchasedUser } from 'src/models/item-purchased-user.model';
import { Order, OrderStatuses, paymentTypes } from 'src/models/order.model';
import { OrderItem } from 'src/models/orderItem.model';
import { Product } from 'src/models/product.model';
import { ReferralOrder } from 'src/models/referral_order';
import { Review } from 'src/models/review.model';
import { User } from 'src/models/user.model';
import { CreateOrderDto } from './dto/create-order.dto';

// var instance = new Razorpay({
//   key_id: process.env.PAYMENT_KEY_ID,
//   key_secret: process.env.PAYMENT_KEY_SECRET,
// });

@Injectable()
export class OrdersService {
  constructor(
    @InjectModel('Order') private readonly orderModel: Model<Order>,
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

  async deleteAll() {
    await this.orderItemModel.deleteMany();
    await this.orderModel.deleteMany();
  }

  async getReferrals(userId: string) {
    const referrals = await this.referralModel.find({
      'referrerDetails.userId': userId,
    });
    return referrals as ReferralOrder[];
  }

  async createOrder(entireBody: CreateOrderDto, userId: string) {
    //get order summary
    console.log('given userid', userId);
    console.log('userid', userId);
    const userDoc = await this.userModel.findById(userId);
    console.log(userDoc);
    console.log('id is', userDoc.phoneNumber);

    const orderSummary = userDoc.orderSummary;
    //generating a unique ordernumber
    const orderNumber = this._generateOrderNumber();
    //generating new order details
    console.log('user doc', userDoc);
    const orderItemDetails = await this._generateOrderItemDetails(
      orderSummary.orderItems,
    );

    console.log('orderitemdetails', orderItemDetails.orderTotal);

    var payableAmount = orderItemDetails.orderTotal;
    var couponDiscount = 0;

    //validating coupon and coupon discount
    if (orderSummary.couponCode != null) {
      couponDiscount = await this._getCouponDiscount(
        userDoc._id.toString(),
        userDoc.name,
        orderNumber,
        orderSummary.couponCode,
        orderItemDetails.orderTotal,
      );
      console.log('paybale amount', payableAmount);
      console.log('c amount', payableAmount);
      payableAmount = payableAmount - couponDiscount;
    }
    console.log('paybale amount', payableAmount);
    const newOrder = new this.orderModel({
      userId: userId,
      userDetails: {
        name: userDoc.name,
        emailId: userDoc.emailId,
        phoneNumber: userDoc.phoneNumber,
      },
      orderNumber: orderNumber,
      deliveryType: 0,
      paymentDetails: {
        paymentType: entireBody.paymentType,
        paymentId: userDoc.orderSummary.paymentId,
        billTotal: orderItemDetails.orderTotal,
        payableTotal: payableAmount,
        couponCode: orderSummary.couponCode,
        couponDiscount: couponDiscount,
      },
      // deliveryAddress: entireBody.deliveryAddress,
      itemsCount: orderItemDetails.orderItemsCount,
      orderItems: orderItemDetails.orderItems,
    });

    newOrder.save();
    // if(orderSummary.couponCode!=null){

    // }
    this._handleSendOrderPlacedMessage(userDoc, orderItemDetails.orderItems);
    this._handleSendOrderPlacedMail(userDoc, orderItemDetails.orderItems);
    //saving order individually in db
    await this._handleSaveIndividualOrders(userDoc, {
      paymentType: entireBody.paymentType,
      deliveryType: orderSummary.deliveryType,
      // storeLocation: orderSummary.pickUpDetails.storeLocation,
      itemsCount: orderItemDetails.orderItemsCount,
      orderData: orderItemDetails.orderItems,
      orderNumber: orderNumber,
      shippingDetails: {
        shipDate: orderSummary.shippingDetails.shipDate,
        deliveryAddress: orderSummary.shippingDetails.deliveryAddress,
        deliveryDate: orderSummary.shippingDetails.deliveryDate,
        deliveryDateInString: orderSummary.shippingDetails.deliveryDateInString,
      },
      pickUpDetails: {
        pickUpDate: orderSummary.pickUpDetails.pickUpDate,
        storeLocation: orderSummary.pickUpDetails.storeLocation,
        pickUpTimeStart: orderSummary.pickUpDetails.pickUpTimeStart,
        pickUpTimeEnd: orderSummary.pickUpDetails.pickUpTimeEnd,
        pickUpTimeInString: orderSummary.pickUpDetails.pickUpTimeInString,
        pickUpDateInString: orderSummary.pickUpDetails.pickUpDateInString,
      },
      couponCode: orderSummary.couponCode,
      couponDiscount: couponDiscount,
    });

    // await this.userModel.findByIdAndUpdate(userId, { $pull: { cartItems : } });
    // return newOrder;
    return {
      orderNumber: orderNumber,
      orderDate: Date.now(),
      selectedPickUpDate: Date.now(),
      deliveryDate: orderSummary.shippingDetails.deliveryDateInString,
      pickUpDateInString: orderSummary.pickUpDetails.pickUpDateInString,
      pickUpTimeInString: orderSummary.pickUpDetails.pickUpTimeInString,
      paymentType: paymentTypes.PAY_AT_STORE,
      deliveryType: orderSummary.deliveryType,
      selectedAddress: orderSummary.shippingDetails.deliveryAddress,
      selectedStore: orderSummary.pickUpDetails.storeLocation,
      orderItems: orderItemDetails,
    };
    // await this.acceptOrder(orderItemDetails.orderItems[0].)
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
      orderStatus: OrderStatuses.DELIVERED,
    });

    this._handleSendOrderDeliveredMessage(order);
    this._handleSendOrderDeliveredMail(order);
    this._handleSendOrderDeliveredNotification(order);

    const itemPurchasedUsers = await this.itemPurchasedUsersModel.findOne({
      productId: order.orderDetails.productId,
    });
    if (itemPurchasedUsers) {
      await this.itemPurchasedUsersModel.findOneAndUpdate(
        {
          productId: order.orderDetails.productId,
        },
        {
          $push: {
            userIds: order.userId.substring(0, 20),
            users: {
              userId: order.userId,
              userName: order.userDetails.userName,
              phoneNumber: order.userDetails.phoneNumber,
              emailId: order.userDetails.emailId,
            },
          },
        },
      );
    } else {
      const newItemPurchasedUsers = new this.itemPurchasedUsersModel({
        productId: order.orderDetails.productId,
        users: [
          {
            userId: order.userId,
            userName: order.userDetails.userName,
            phoneNumber: order.userDetails.phoneNumber,
            emailId: order.userDetails.emailId,
          },
        ],
        userIds: [order.userId.substring(0, 20)],
      });
      newItemPurchasedUsers.save();
    }
    await this.userModel.findByIdAndUpdate(order.userId, {
      $push: { purchasedItemIds: order.orderDetails.productId },
    });
  }

  async getOrderItems(userId: string) {
    console.log('order user id', userId);
    const orderItems = await this.orderItemModel.find({
      userId: userId,
    });
    console.log('orderrrrr', orderItems);
    return orderItems as OrderItem[];
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

  _generateOrderNumber() {
    const orderCode = 'OD';
    const randomNumber = Math.floor(
      10000000000000 + Math.random() * 90000000000000,
    );
    const orderNumber = orderCode + randomNumber.toString();
    return orderNumber;
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
    if (coupon && orderTotal >= coupon.minimumOrderTotal) {
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

  async _handleSaveIndividualOrders(userDoc: any, params: IndividualOrderItem) {
    for (const order of params.orderData) {
      console.log(params.couponCode);
      const payableAmount =
        params.couponDiscount != null
          ? parseInt(
              (order.total - params.couponDiscount / params.itemsCount).toFixed(
                0,
              ),
            )
          : order.total;
      const newOrderItem = new this.orderItemModel({
        userId: userDoc._id,
        orderNumber: params.orderNumber,
        shippingDetails: {
          deliveryAddress: params.shippingDetails.deliveryAddress,
          deliveryDate: params.shippingDetails.deliveryDate,
          deliveryDateInString: params.shippingDetails.deliveryDateInString,
        },
        userDetails: {
          emailId: userDoc.emailId,
          phoneNumber: userDoc.phoneNumber,
          userName: userDoc.name,
        },
        pickUpDetails: {
          pickUpDate: params.pickUpDetails.pickUpDate,
          pickUpTimeStart: params.pickUpDetails.pickUpTimeStart,
          pickUpTimeEnd: params.pickUpDetails.pickUpTimeEnd,
          pickUpTimeInString: params.pickUpDetails.pickUpTimeInString,
          pickUpDateInString: params.pickUpDetails.pickUpDateInString,
          storeLocation: params.pickUpDetails.storeLocation,
        },
        paymentDetails: {
          paymentType: params.paymentType,
        },
        deliveryType: params.deliveryType,
        pricingDetails: {
          billTotal: order.total,
          payableTotal: payableAmount,
          couponCode: params.couponCode,
          couponDiscount: params.couponDiscount,
        },
        productDetails: {
          imageUrl: order.productDetails.imageUrl,
          title: order.productDetails.title,
          color: order.productDetails.color,
          condition: order.productDetails.condition,
          brand: order.productDetails.brand,
          category: order.productDetails.category,
        },
        orderDetails: {
          productId: order.productId,
          pricePerItem: order.pricePerItem,
          productCount: order.productCount,
        },
      });
      newOrderItem.save();
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

  // async handleOrderPlacedNotification(){}

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
      include_external_user_ids: [
        order.userId.substring(0, 20),
        // '796733d5-3865-46cb-bf4c-c6986d861e92',
        // '8180d163-e411-44d2-bd70-c0610495aff9',
      ],
    };
    // var message = {
    //   app_id: '12fb7561-03e6-409e-bc03-a558aee286de',
    //   // contents: {
    //   //   en: `Hey ${order.userDetails.userName}, Your order is confirmed...\n
    //   //   Your order for ${order.orderDetails.title} is confirmed & will be ready for pick up by ${order.pickUpDetails.pickUpDateInString}. Click here to know more..`,
    //   // },
    //   channel_for_external_user_ids: 'push',
    //   // included_segments: ['Subscribed Users'],
    //   contents: {
    //     en: `Your order for ${order.productDetails.title} is confirmed & will be ready for pick up by ${order.pickUpDetails.pickUpDateInString}. Click here to know more..`,
    //   },
    //   headings: {
    //     en: `Hey ${order.userDetails.userName}, Your order is confirmed....`,
    //   },
    //   // subtitle: { en: 'your order will be delivered by' },
    //   // template_id: '8ff9a58b-1181-4d21-ad79-b2f8b4ea1b23',
    //   // tags : [

    //   // ],
    //   // name: 'sunil',
    //   // order: 'iphone 12 pro',

    //   // tags: { name: 'sunil', order: 'iphone 12 pro' },
    //   // [{ "name": 'sunil' }, { "order": 'iphone 12 pro' }],
    //   include_external_user_ids: [
    //     order.userId.substring(0, 20),
    //     // '796733d5-3865-46cb-bf4c-c6986d861e92',
    //     // '8180d163-e411-44d2-bd70-c0610495aff9',
    //   ],
    // };
    const response = this.sendNotification(message);
    console.log('response', response);
  }

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
}

export interface IndividualOrderItem {
  paymentType: String;
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
