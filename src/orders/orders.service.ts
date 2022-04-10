import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { DeliveryTypes, Order, paymentTypes } from 'src/models/order.model';
import { Model } from 'mongoose';
import { CreateOrderDto } from './dto/create-order.dto';
import { Product } from 'src/models/product.model';
import { Coupon } from 'src/models/coupon.model';
import { identity } from 'rxjs';
import { OrderItem } from 'src/models/orderItem.model';
import { User } from 'src/models/user.model';
import { Review } from 'src/models/review.model';
import * as Razorpay from 'razorpay';

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
  ) {}

  async deleteAll() {
    await this.orderItemModel.deleteMany();
    await this.orderModel.deleteMany();
  }

  async createOrder(entireBody: CreateOrderDto, userId: string) {
    //get order summary
    console.log('userid', userId);
    const userDoc = await this.userModel.findById(userId, {
      orderSummary: 1,
      _id: 0,
    });

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

    //saving order individually in db
    await this._handleSaveIndividualOrders({
      paymentType: entireBody.paymentType,
      deliveryType: orderSummary.deliveryType,
      storeLocation: orderSummary.storeLocation,
      itemsCount: orderItemDetails.orderItemsCount,
      orderData: orderItemDetails.orderItems,
      orderNumber: orderNumber,
      deliveryAddress: orderSummary.deliveryAddress,
      couponCode: orderSummary.couponCode,
      couponDiscount: couponDiscount,
    });
    // return newOrder;
    return {
      orderNumber: orderNumber,
      orderDate: Date.now(),
      // expectedDeliveryDate: Date.now(),
      selectedPickUpDate: Date.now(),
      paymentType: paymentTypes.PAY_AT_STORE,
      deliveryType: orderSummary.deliveryType,
      selectedAddress: orderSummary.deliveryAddress,
      selectedStore: orderSummary.storeLocation,
      orderItems: orderItemDetails,
    };
  }

  async getOrderItems(userId: string) {
    const orderItems = await this.orderItemModel.find({
      userId: { $eq: userId },
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

  async _getCouponDiscount(couponCode: string, orderTotal: number) {
    const coupon = await this.couponModel.findOne({ couponCode: couponCode });
    console.log('coupon', coupon);
    if (coupon && orderTotal >= coupon.minimumOrderTotal) {
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

  async _handleSaveIndividualOrders(params: IndividualOrderItem) {
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
        orderNumber: params.orderNumber,
        shippingDetails: {
          deliveryAddress: params.deliveryAddress,
        },
        pickUpDetails: {
          storeLocation: params.storeLocation,
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

  // async _getCouponDiscount(couponCode : string){
  //   const couponDiscount = await this.
  // }
}

export interface IndividualOrderItem {
  paymentType: String;
  deliveryType: String;
  itemsCount: number;
  orderData: any;
  orderNumber: string;
  deliveryAddress: string;
  storeLocation: string;
  couponCode: string;
  couponDiscount: number;
}

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
