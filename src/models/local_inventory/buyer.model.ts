import mongoose from 'mongoose';

export const BuyerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  emailId: { type: String, required: true },
  phoneNumber: { type: Number, required: true },
  city: { type: String, required: true },
});

export interface BuyerModel {
  name: string;
  emailId: string;
  phoneNumber: number;
  city: string;
}
