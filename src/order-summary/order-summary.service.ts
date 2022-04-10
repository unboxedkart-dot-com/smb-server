import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { OrderSummary } from 'src/models/order_summary.model';
import { Product } from 'src/models/product.model';
import { User } from 'src/models/user.model';
import { Model } from 'mongoose';
import { CartItem } from 'src/models/cart-item.model';
import { CreateOrderSummaryDto } from './dto/create-order-summary.dto';
import { Coupon } from 'src/models/coupon.model';
import { DeliveryTypes } from 'src/models/order.model';
import { AddAddressDto } from 'src/addresses/dto';
import { UpdateProductCountDto } from './dto/update-count.dto';
import * as Razorpay from 'razorpay';
import * as CryptoJS from 'crypto-js';
import { createHmac } from 'crypto';

import { VerifyPaymentDto } from './dto/verify-payment.dto';

var instance = new Razorpay({
  key_id: 'rzp_live_Yf6SskMc0yCBdS',
  // process.env.PAYMENT_KEY_ID, // your `KEY_ID`
  key_secret: 'GUt36OWEcQtKk1gZhmK0o5nM',
  // process.env.PAYMENT_KEY_SECRET, // your `KEY_SECRET`
});

@Injectable()
export class OrderSummaryService {
  constructor(
    @InjectModel('OrderSummary')
    private readonly orderSummaryModel: Model<OrderSummary>,
    @InjectModel('User') private readonly userModel: Model<User>,
    @InjectModel('Product') private readonly productModel: Model<Product>,
    @InjectModel('Coupon') private readonly couponModel: Model<Coupon>,
  ) {}

  async getPayableAmount(userId: string) {
    const userDoc = await this.userModel.findById(
      userId,
      // {
      // orderSummary: 1,
      // _id: 0,
      // }
    );
    const orderTotal = await this._calculateAmount(
      userDoc.orderSummary.orderItems,
    );
    const coupon = await this.couponModel.findOne({
      couponCode: userDoc.orderSummary.couponCode,
    });
    let payableAmount = orderTotal;
    if (coupon) {
      payableAmount = orderTotal - coupon.discountAmount;
    }
    const paymentOrderId = await this.createPaymentOrder(payableAmount);
    await this.userModel.findByIdAndUpdate(userId, {
      'orderSummary.paymentOrderId': paymentOrderId["id"],
    });
    return {
      payableAmount: payableAmount,
      orderId: paymentOrderId['id'],
      name: userDoc.name,
      email: userDoc.emailId,
      phoneNumber: userDoc.phoneNumber,
    };
  }

  async createPaymentOrder(payableAmount: number) {
    const order = await instance.orders.create({
      amount: 100,
      // amount: payableAmount * 100,
      currency: 'INR',
      receipt: 'receipt#1',
    });
    return order;
  }

  async verifyPaymentSignature(
    userId: string,
    entireBody: VerifyPaymentDto,
    // paymentSignature: string,
    // paymentId: string,
  ) {
    console.log('entrie body', entireBody);
    const userDoc = await this.userModel.findById(userId);
    const paymentOrderId = userDoc.orderSummary.paymentOrderId;
    console.log('payment order id', paymentOrderId);
    // var hmac = crypto.createHmac('sha256', razorpaykeys.key_secret);
    const generatedSignature = createHmac('sha256', 'GUt36OWEcQtKk1gZhmK0o5nM');
    const encodedSignature = generatedSignature
      .update(paymentOrderId + '|' + entireBody.paymentId + '')
      .digest('hex');
    // const generatedSignature = CryptoJS.HmacSHA256(
    //   paymentOrderId + '|' + entireBody.paymentId,
    //   'GUt36OWEcQtKk1gZhmK0o5nM',
    // );
    // var encodedSignature = CryptoJS.enc.Base64.stringify(generatedSignature);
    console.log('generated sig', generatedSignature);
    console.log('encoded', encodedSignature);
    console.log('given sig', entireBody.paymentSignature);
    if (encodedSignature == entireBody.paymentSignature) {
      this.userModel.findByIdAndUpdate(userId, {
        'orderSummary.paymentId': entireBody.paymentId,
      });
      return {
        status: 'success',
        message: 'payment is verified',
      };
    } else {
      return {
        status: 'failed',
        message: 'payment is not verified',
      };
    }
  }

  async _calculateAmount(orderItems: any) {
    let orderTotal = 0;
    for (const item of orderItems) {
      const price = await this._getSingleItemPrice(
        item.productId,
        item.productCount,
      );
      orderTotal += price;
    }
    return orderTotal;
  }

  async _getSingleItemPrice(productId: string, productCount: number) {
    const product = await this.productModel.findById(productId);
    return product.pricing.sellingPrice * productCount;
  }

  async getOrderSummaryItems(userId: string) {
    const orderSummaryItemsData = [];
    //finding user doc
    const userDoc = await this.userModel.findById(userId);
    const orderSummaryItems = userDoc.orderSummary.orderItems;
    // return orderSummaryItems;
    if (orderSummaryItems.length > 0) {
      for (const item of orderSummaryItems) {
        console.log('item od', item);
        const product = await this.productModel.findById(item.productId);
        console.log('single product', product);
        const newOrderSummaryItem = {
          productId: item.productId,
          productCount: item.productCount,
          productDetails: {
            title: product.title,
            imageUrl: product.imageUrls.coverImage,
            color: product.moreDetails.color,
            brand: product.brand,
            category: product.category,
            condition: product.condition,
          },
          pricingDetails: {
            sellingPrice: product.pricing.sellingPrice,
            price: product.pricing.price,
          },
        };
        // adding product data and count to  cart items
        orderSummaryItemsData.push(newOrderSummaryItem);
      }
      console.log('all', orderSummaryItemsData);
      console.log('all', orderSummaryItemsData as CartItem[]);
    }
    return orderSummaryItemsData as CartItem[];
  }

  async createOrderSummaryItems(
    userId: string,
    entireBody: CreateOrderSummaryDto,
  ) {
    const newOrderSummary = new this.orderSummaryModel({
      userId: userId,
      itemsCount: entireBody.orderItems.length,
      orderItems: entireBody.orderItems,
    });
    console.log('new', newOrderSummary);
    await this.userModel.findByIdAndUpdate(userId, {
      'orderSummary.orderItems': entireBody.orderItems,
    });
    newOrderSummary.save();
  }

  async addDeliveryAddress(userId: string, entireBody: AddAddressDto) {
    console.log('adding delivery address');
    await this.userModel.findByIdAndUpdate(userId, {
      'orderSummary.deliveryType': DeliveryTypes.HOME_DELIVERY,
      'orderSummary.deliveryAddress': {
        userId: userId,
        name: entireBody.name,
        phoneNumber: entireBody.phoneNumber,
        doorNo: entireBody.doorNo,
        street: entireBody.street,
        cityName: entireBody.cityName,
        landmark: entireBody.landmark,
        stateName: entireBody.stateName,
        pinCode: entireBody.pinCode,
        addressType: entireBody.addressType,
      },
    });
  }

  async addSelectedStoreDetails(userId: string, entireBody: any) {
    await this.userModel.findByIdAndUpdate(userId, {
      'orderSummary.deliveryType': DeliveryTypes.STORE_PICKUP,
      'orderSummary.storeLocation': {
        storeName: entireBody.storeName,
        streetName: entireBody.streetName,
        cityName: entireBody.cityName,
        pinCode: entireBody.pinCode,
        directionsUrl: entireBody.directionsUrl,
        storeOpenDays: entireBody.storeOpenDays,
        storeTimings: entireBody.storeTimings,
        contactNumber: entireBody.contactNumber,
        alternateContactNumber: entireBody.alternateContactNumber,
      },
    });
  }

  async addCouponDetails(userId: string, entireBody: any) {
    await this.userModel.findByIdAndUpdate(userId, {
      'orderSummary.couponCode': 'SUNIL500',
    });
  }

  async updateCount(userId: string, entireBody: UpdateProductCountDto) {
    const index = entireBody.productIndex;
    const doc = await this.userModel.findByIdAndUpdate(userId, {
      ['orderSummary.orderItems.' + index + '.productCount']:
        entireBody.updatedCount,
    });
    console.log('updated doc', doc);
  }
}
