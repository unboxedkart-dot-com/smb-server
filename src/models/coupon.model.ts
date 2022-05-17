import mongoose from 'mongoose';

export enum CouponTypes {
  FLAT = 'FLAT',
  PERCENTAGE = 'PERCENTAGE',
  UPTO = 'UPTO',
}

export enum RedemptionTypes {
  LIMITED = 'LIMITED',
  UNLIMITED = 'UNLIMITED',
}

export enum ExpiryTypes {
  LIMITED_TIME = 'LIMITED TIME',
  NON_EXPIRABLE = 'NON EXPIRABLE',
}

export interface ReferrerDetails {
  userId: { type: String; required: true; select: false };
  phoneNumber: { type: Number; required: true };
  userName: { type: String; required: true };
  userEmail: { type: String; required: false };
}

export const CouponSchema = new mongoose.Schema({
  couponCode: { type: String, required: true, select: true },
  description: { type: String, required: true },
  discountAmount: { type: Number, required: true },
  minimumOrderTotal: { type: Number, required: true },
  discountType: { type: String, required: true },
  redemptionType: { type: String, required: true },
  expiryType: { type: String, required: true },
  expiryTime: { type: Date, required: false },
  redemptionLimit: { type: Number, required: false },
  isPersonalCoupon: { type: Boolean, required: true, default: false },
  isActive: { type: Boolean, required: true, default: true },
  couponDetails:
    // { type: ReferrerDetails, required: false },
    {
      userId: { type: String, select: false },
      phoneNumber: { type: Number },
      userName: { type: String },
      userEmail: { type: String },
    },
});

export interface Coupon {
  couponCode: string;
  description: string;
  discountAmount: number;
  minimumOrderTotal: number;
  discountType: CouponTypes;
  expiryType: ExpiryTypes;
  redemptionType: RedemptionTypes;
  expiryTime: Date;
  redemptionLimit: number;
  isPersonalCoupon: boolean;
  isActive: boolean;
  couponDetails: {
    userId: string;
    phoneNumber: number;
    userName: string;
    userEmail: string;
  };
}
