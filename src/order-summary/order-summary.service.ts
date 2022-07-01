import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { createHmac } from 'crypto';
import { Model } from 'mongoose';
import * as Razorpay from 'razorpay';
import { CouponsService } from 'src/coupons/coupons.service';
import { CartItem } from 'src/models/cart-item.model';
import { Coupon } from 'src/models/coupon.model';
import {
  DeliveryTypes,
  PaymentMethods,
  PaymentTypes,
} from 'src/models/order.model';
import { OrderSummary } from 'src/models/order_summary.model';
import { Product } from 'src/models/product.model';
import { User } from 'src/models/user.model';
import { OrdersService } from 'src/orders/orders.service';
import { AddDeliveryAddressDto } from './dto/add-address.dto';
import { AddSelectedStoreDto } from './dto/add-selected-store.dto';
import { CreateOrderSummaryDto } from './dto/create-order-summary.dto';
import { UpdateProductCountDto } from './dto/update-count.dto';
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
    @InjectModel('Payment') private readonly paymentModel: Model<User>,
    @InjectModel('Product') private readonly productModel: Model<Product>,
    @InjectModel('Coupon') private readonly couponModel: Model<Coupon>,
    @Inject(forwardRef(() => OrdersService))
    private readonly ordersService: OrdersService,
    private readonly couponService: CouponsService,
  ) {}

  async getPayableAmount(userId: string) {
    console.log('getting payable amount');
    const userDoc = await this.userModel.findById(userId);
    const orderTotal = await this._calculateAmount(
      userDoc.orderSummary.orderItems,
    );

    let payableAmount = orderTotal;
    if (userDoc.orderSummary.couponCode != null) {
      const couponCode = userDoc.orderSummary.couponCode;
      const couponResults = await this.couponService.validateCoupon(
        userId,
        couponCode,
      );
      if (couponResults['isValid']) {
        console.log('coupon is valid');
        payableAmount =
          orderTotal - couponResults['couponDetails']['discountAmount'];
        console.log('coupon is valid', payableAmount);
      }
    }
    const orderNumber = this._generateOrderNumber();
    const paymentOrderId = await this.createPaymentOrder(
      payableAmount,
      orderNumber,
    );
    const partialPaymentOrderId = await this.createPaymentOrder(
      2000,
      orderNumber,
    );
    await this.userModel.findByIdAndUpdate(userId, {
      'orderSummary.orderNumber': orderNumber,
      'orderSummary.paymentAmount': payableAmount,
      'orderSummary.paymentOrderId': paymentOrderId['id'],
      'orderSummary.partialPaymentOrderId': partialPaymentOrderId['id'],
      'orderSummary.partialPaymentAmount': payableAmount,
    });

    return {
      payableAmount: payableAmount,
      paymentOrderId: paymentOrderId['id'],
      partialPaymentOrderId: partialPaymentOrderId['id'],
      partialPaymentAmount: 3,
      name: userDoc.name,
      email: userDoc.emailId,
      phoneNumber: userDoc.phoneNumber,
    };
  }

  async getPartialPaymentAmount(userId: string) {
    const userDoc = await this.userModel.findById(userId);
    let payableAmount = 2000;
    const orderNumber = this._generateOrderNumber();
    const paymentOrderId = await this.createPaymentOrder(
      payableAmount,
      orderNumber,
    );
    await this.userModel.findByIdAndUpdate(userId, {
      'orderSummary.partialPaymentOrderId': paymentOrderId['id'],
    });
    return {
      payableAmount: payableAmount,
      orderId: paymentOrderId['id'],
      name: userDoc.name,
      email: userDoc.emailId,
      phoneNumber: userDoc.phoneNumber,
    };
  }

  async createPaymentOrder(payableAmount: number, orderNumber: string) {
    const order = await instance.orders.create({
      amount: payableAmount,
      // amount: payableAmount * 100,
      currency: 'INR',
      receipt: orderNumber,
    });
    return order;
  }

  async addPaymentMethod(userId: string, paymentMethod: string) {
    console.log('adding payment method', paymentMethod, userId);
    // const userDoc
    // const orderNumber = this._generateOrderNumber();
    const updatedDoc = await this.userModel.findByIdAndUpdate(userId, {
      // 'orderSummary' : {}
      // phoneNumber : 7557575754
      'orderSummary.paymentMethod':
        paymentMethod == 'cod'
          ? PaymentMethods.CASH_ON_DELIVERY
          : PaymentMethods.PAY_AT_STORE,
      'orderSummary.paymentType': PaymentTypes.NULL,
      // 'orderSummary.orderNumber': orderNumber,
    });
    console.log('updated Doc', updatedDoc);
    // const orderNumber = this._generateOrderNumber();
    const order = await this.ordersService.createOrder(userId);
    console.log('order postpaid', order);
    return {
      status: 'success',
      message: 'payment is verified',
      orderNumber: updatedDoc.orderSummary.orderNumber,
    };
  }

  async verifyPaymentSignature(userId: string, entireBody: VerifyPaymentDto) {
    console.log('entrie body', entireBody);
    console.log('verifying full ', entireBody);
    const userDoc = await this.userModel.findById(userId);
    const paymentOrderId = userDoc.orderSummary.paymentOrderId;
    console.log('payment order id', paymentOrderId);
    const generatedSignature = createHmac('sha256', 'GUt36OWEcQtKk1gZhmK0o5nM');
    const encodedSignature = generatedSignature
      .update(paymentOrderId + '|' + entireBody.paymentId + '')
      .digest('hex');
    console.log('generated sig', generatedSignature);
    console.log('encoded', encodedSignature);
    console.log('given sig', entireBody.paymentSignature);
    if (encodedSignature == entireBody.paymentSignature) {
      console.log('full verifed');

      // const orderNumber = this._generateOrderNumber();

      console.log(entireBody, paymentOrderId);

      const newPayment = new this.paymentModel({
        userId: userId,
        orderNumber: userDoc.orderSummary.orderNumber,
        gateway: 'razorpay',
        status: 'verified',
        paymentOrderId: entireBody.orderId,
        paymentId: entireBody.paymentId,
        paymentType: 'pas-d',
        paymentMethod: 'razorpay',
        amount: userDoc.orderSummary.paymentAmount,
      });
      newPayment.save();

      await this.userModel.findByIdAndUpdate(userId, {
        // 'orderSummary.orderNumber': orderNumber,
        'orderSummary.paymentMethod': PaymentMethods.PREPAID,
        'orderSummary.paymentType': PaymentTypes.FULL,
        'orderSummary.paymentId': entireBody.paymentId,
        // 'orderSummary.paymentOrderId': paymentOrderId,
      });

      await this.ordersService.createOrder(userDoc._id.toString());
      // return orderNumber;

      return {
        status: 'success',
        message: 'payment is verified',
        orderNumber: userDoc.orderSummary.orderNumber,
      };
    } else {
      return {
        status: 'failed',
        message: 'payment is not verified',
      };
    }
  }

  async verifyPartialPaymentSignature(
    userId: string,
    entireBody: VerifyPaymentDto,
  ) {
    console.log('verifying partial ', entireBody);
    const userDoc = await this.userModel.findById(userId);
    const paymentOrderId = userDoc.orderSummary.partialPaymentOrderId;
    console.log('payment order id', paymentOrderId);
    const generatedSignature = createHmac('sha256', 'GUt36OWEcQtKk1gZhmK0o5nM');
    const encodedSignature = generatedSignature
      .update(paymentOrderId + '|' + entireBody.paymentId + '')
      .digest('hex');
    console.log('generated sig', generatedSignature);
    console.log('encoded', encodedSignature);
    console.log('given sig', entireBody.paymentSignature);
    if (encodedSignature == entireBody.paymentSignature) {
      const orderNumber = this._generateOrderNumber();
      console.log('partial verifed');

      console.log('order summary done');

      // const orderNumber = this._generateOrderNumber();

      const newPayment = new this.paymentModel({
        userId: userId,
        orderNumber: userDoc.orderSummary.orderNumber,
        gateway: 'razorpay',
        status: 'verified',
        paymentOrderId: entireBody.orderId,
        paymentId: entireBody.paymentId,
        paymentType: 'pas-d',
        paymentMethod: 'razorpay',
        amount: userDoc.orderSummary.partialPaymentAmount,
      });
      newPayment.save();

      console.log('new payment done');

      await this.userModel.findByIdAndUpdate(userId, {
        // 'orderSummary.orderNumber': orderNumber,
        'orderSummary.paymentMethod':
          userDoc.orderSummary.deliveryType == 'STORE PICKUP'
            ? PaymentMethods.PAY_AT_STORE_DUE
            : PaymentMethods.CASH_ON_DELIVERY_DUE,
        'orderSummary.paymentType': PaymentTypes.PARTIAL,
        'orderSummary.partialPaymentId': entireBody.paymentId,
        // 'orderSummary.partialPaymentOrderId': paymentOrderId,
      });

      // await this.userModel.findByIdAndUpdate(userId, {
      //   // 'orderSummary.orderNumber': orderNumber,
      //   'orderSummary.paymentMethod': PaymentMethods.PREPAID,
      //   'orderSummary.paymentType': PaymentTypes.FULL,
      //   'orderSummary.paymentId': entireBody.paymentId,
      //   // 'orderSummary.paymentOrderId': paymentOrderId,
      // });

      await this.ordersService.createOrder(userDoc._id.toString());

      console.log('new order done');
      // return orderNumber;
      return {
        status: 'success',
        message: 'payment is verified',
        orderNumber: userDoc.orderSummary.orderNumber,
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
      // 'orderSummary.orderItems': entireBody.orderItems,
      orderSummary: {
        orderItems: entireBody.orderItems,
      },
    });

    newOrderSummary.save();
  }

  async addDeliveryAddress(userId: string, entireBody: AddDeliveryAddressDto) {
    console.log('adding delivery address');
    const currentDate = new Date();
    const deliveryDate = new Date(
      currentDate.getTime() + 1000 * 60 * 60 * 24 * 5,
    );
    var month = deliveryDate.getMonth() + 1; //months from 1-12
    var day = deliveryDate.getDate();
    var year = deliveryDate.getFullYear();
    const deliveryDateInString = year + '/' + month + '/' + day;
    const user = await this.userModel.findByIdAndUpdate(userId, {
      'orderSummary.deliveryType': DeliveryTypes.HOME_DELIVERY,
      'orderSummary.shippingDetails': {
        deliveryAddress: {
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
        deliveryDate: deliveryDate,
        deliveryDateInString: deliveryDateInString,
      },
    });
    console.log('address added', user);
  }

  async addSelectedStoreDetails(
    userId: string,
    entireBody: AddSelectedStoreDto,
  ) {
    console.log('adding store details', entireBody);
    console.log('userId', userId);
    const user = await this.userModel.findByIdAndUpdate(userId, {
      'orderSummary.deliveryType': DeliveryTypes.STORE_PICKUP,
      'orderSummary.pickUpDetails': {
        storeLocation: {
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
        pickUpTimeStart: entireBody.pickUpTimeStart,
        pickUpTimeEnd: entireBody.pickUpTimeEnd,
        pickUpDate: entireBody.pickUpDate,
        pickUpTimeInString: entireBody.pickUpTimeInString,
        pickUpDateInString: entireBody.pickUpDateInString,
      },
      // 'orderSummary.storeLocation': {
      //   storeName: entireBody.storeName,
      //   streetName: entireBody.streetName,
      //   cityName: entireBody.cityName,
      //   pinCode: entireBody.pinCode,
      //   directionsUrl: entireBody.directionsUrl,
      //   storeOpenDays: entireBody.storeOpenDays,
      //   storeTimings: entireBody.storeTimings,
      //   contactNumber: entireBody.contactNumber,
      //   alternateContactNumber: entireBody.alternateContactNumber,
      // },
      // 'orderSummary.pickUpDetails.pickUpTimeStart': entireBody.pickUpTimeStart,
      // 'orderSummary.pickUpDetails.pickUpTimeEnd': entireBody.pickUpTimeEnd,
      // 'orderSummary.pickUpDetails.pickUpDate': entireBody.pickUpDate,
      // 'orderSummary.pickUpDetails.pickUpTimeInString':
      //   entireBody.pickUpTimeInString,
      // 'orderSummary.pickUpDetails.pickUpDateInString':
      //   entireBody.pickUpDateInString,
    });
    console.log('store location added', user);
  }

  async addCouponDetails(userId: string, couponCode: String) {
    const user = await this.userModel.findById(userId);
    const orderSummary = user.orderSummary;
    const cartValue = await this._calculateCartValue(orderSummary.orderItems);
    const coupon = await this.couponModel.findOne({
      couponCode: couponCode,
    });

    if (coupon) {
      if (
        coupon.isActive &&
        cartValue >= coupon.minimumOrderTotal &&
        coupon.couponDetails.userId != userId
      ) {
        console.log('cart total', cartValue);
        await this.userModel.findByIdAndUpdate(userId, {
          'orderSummary.couponCode': couponCode,
        });
      }
    }
  }

  async updateCount(userId: string, entireBody: UpdateProductCountDto) {
    const index = entireBody.productIndex;
    const doc = await this.userModel.findByIdAndUpdate(userId, {
      ['orderSummary.orderItems.' + index + '.productCount']:
        entireBody.updatedCount,
    });

    await this.orderSummaryModel.findOneAndUpdate(
      { userId: userId, isActive: true },
      {
        ['orderSummary.orderItems.' + index + '.productCount']:
          entireBody.updatedCount,
      },
    );
    console.log('updated doc', doc);
  }

  _generateOrderNumber() {
    const orderCode = 'OD';
    const randomNumber = Math.floor(
      10000000000000 + Math.random() * 90000000000000,
    );
    const orderNumber = orderCode + randomNumber.toString();
    return orderNumber;
  }

  async _calculateCartValue(orderItems: any) {
    let cartValue = 0;
    for (const item of orderItems) {
      const product = await this.productModel.findById(item.productId);
      const price = item.productCount * product.pricing.sellingPrice;
      cartValue += price;
    }
    console.log('cartvalue', cartValue);
    return cartValue;
  }
}
