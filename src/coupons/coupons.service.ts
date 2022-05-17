import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Coupon, CouponTypes } from 'src/models/coupon.model';
import { CreateOrderDto } from 'src/orders/dto/create-order.dto';
import { User } from 'src/models/user.model';
import { CreateCouponDto } from './dto/create-coupon.dto';
import { Product } from 'src/models/product.model';

@Injectable()
export class CouponsService {
  constructor(
    @InjectModel('Coupon') private readonly couponModel: Model<Coupon>,
    @InjectModel('User') private readonly userModel: Model<User>,
    @InjectModel('Product') private readonly productModel: Model<Product>,
  ) {}

  async getAllCoupons() {
    const coupons = await this.couponModel.find({ isPersonalCoupon: false });
    return coupons as Coupon[];
  }

  async getPersonalCoupon(userId: string) {
    const coupon = await this.couponModel.findOne({
      'couponDetails.userId': userId,
    });
    console.log('personal coupon', coupon);
    return coupon;
  }

  async createCoupon(entireBody: CreateCouponDto) {
    console.log('entire body', entireBody);
    const newCoupon = new this.couponModel({
      couponCode: entireBody.couponCode,
      description: entireBody.description,
      discountAmount: entireBody.discountAmount,
      minimumOrderTotal: entireBody.minimumOrderTotal,
      discountType: entireBody.discountType,
      redemptionType: entireBody.redemptionType,
      expiryType: entireBody.expiryType,
      expiryTime: entireBody.expiryTime,
      redemptionLimit: entireBody.redemptionLimit,
    });
    newCoupon.save();
  }

  async getCoupons() {
    const coupons = await this.couponModel.find({ isPersonalCoupon: false });
    return coupons as Coupon[];
  }

  async createPersonalCoupon(userId: string) {
    const userDetails = await this._getUserDetails(userId);
    const newCoupon = new this.couponModel({
      couponCode: userDetails.couponCode,
      discountAmount: 500,
      minimumOrderTotal: 30000,
      discountType: CouponTypes.FLAT,
      isPersonalCoupon: true,
      couponDetails: userDetails.userDetails,
    });
    newCoupon.save();
    // save coupon in user details
    await this.userModel.findByIdAndUpdate(userId, {
      personalCouponCode: userDetails.couponCode,
    });
    // return userDetails;
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

  async validateCoupon(userId: string, couponCode: string) {
    const userDoc = await this.userModel.findById(userId);
    const cartValue = await this._calculateCartValue(
      userDoc.orderSummary.orderItems,
    );
    console.log('orderSummary', userDoc.orderSummary.orderItems);
    const coupon = await this.couponModel.findOne({
      couponCode: couponCode,
    });

    if (coupon) {
      console.log('ppp', coupon);

      if (
        coupon.isActive &&
        cartValue >= coupon.minimumOrderTotal &&
        coupon.couponDetails.userId != userId
      ) {
        console.log('cart total', cartValue);
        return {
          isValid: true,
          couponDetails: {
            couponCode: coupon.couponCode,
            couponDescription: coupon.description,
            discountAmount: coupon.discountAmount,
          },
        };
      } else {
        return {
          isValid: false,
          errorText: `Minimum cart value should be ${coupon.minimumOrderTotal} to apply this coupon code.`,
          // couponDetails: {
          //   couponCode: coupon.couponCode,
          //   couponDescription: 'Use this coupon to get 100 off',
          //   discountAmount: coupon.discountAmount,
          // },
        };
      }
    } else {
      return {
        isValid: false,
        errorText: 'Entered coupon is not valid for your account',
      };
    }
  }

  async _getUserDetails(userId: string) {
    const userDetails = await this.userModel.findById(userId);
    const randomNumber = Math.floor(100000 + Math.random() * 900000);
    const couponCode =
      'UNBOXED' + userDetails.name.substring(0, 6) + randomNumber;
    return {
      userDetails: {
        userId: userId,
        phoneNumber: userDetails.phoneNumber,
        userName: userDetails.name,
        userEmail: userDetails.emailId,
      },
      couponCode: couponCode,
    };
  }
}
