import mongoose from 'mongoose';

export const UserPaymentDetailsSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  upiId: { type: String, required: true },
  upiName: { type: String, required: true },
});

export interface UserPaymentDetails {
  userId: string;
  upiName: string;
  upiId: string;
}
