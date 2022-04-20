import mongoose from 'mongoose';

export const ReferralOrderSchema = new mongoose.Schema({
  couponCode: { type: String, required: true, select: true },
  orderNumber: { type: String, required: true, select: true },
  referrerDetails: {
    userId: { type: String, required: true, select: false },
    phoneNumber: { type: Number, required: true },
    userName: { type: String, required: true },
    userEmail: { type: String, required: false },
  },
  refereeId: { type: String, required: true, select: true },
  cashBackDetails: {
    cashBackAmount: { type: Number, required: true },
    isCredited: { type: Boolean, required: true, default: false },
  },
  discountDetails: {
    discountAmount: { type: Number, required: true },
  },
  isCompeleted: { type: Boolean, required: true, default: false },
});

export interface ReferralOrder {
    couponCode: string;
    orderNumber: string;
    referrerDetails: {
      userId: string;
      phoneNumber: string;
      userName: string;
      userEmail: string;
    },
    refereeId: string;
    cashBackDetails: {
      cashBackAmount: string;
      isCredited: string;
    },
    discountDetails: {
      discountAmount: string;
    },
    isCompeleted: boolean;
}
