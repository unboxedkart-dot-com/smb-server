import mongoose from 'mongoose';

export enum CouponTypes {
  FLAT = 'FLAT',
  PERCENTAGE = 'PERCENTAGE',
  UPTO = 'UPTO',
}

export const CouponSchema = new mongoose.Schema({
  couponCode: { type: String, required: true, select: true },
  discountAmount: { type: String, required: true },
  minimumOrderTotal: { type: Number, required: true },
  discountType: { type: String, required: true },
  expiryTime: { type: Date, required: true, default: Date.now() },
  isPersonalCoupon: { type: Boolean, required: true, default: false },
  couponDetails: {
    userId: { type: String, required: true },
    phoneNumber: { type: Number, required: true },
    userName: { type: String, required: true },
    userEmail: { type: String, required: false },
  },
});

export interface Coupon {
  couponCode: string;
  discountAmount: number;
  minimumOrderTotal: number;
  discountType: CouponTypes;
  expiryTime: Date;
  isPersonalCoupon: boolean;
  couponDetails: [
    {
      userId: string;
      phoneNumber: number;
      userName: string;
      userEmail: string;
    },
  ];
}
