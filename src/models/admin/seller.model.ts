import mongoose from 'mongoose';

export const SellerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  businessName: { type: String, required: true },
  businessDoc: { type: String, required: true },
  businessDocNumber: { type: String, required: true },
  businessDocUrl: { type: String },
  phoneNumber: { type: Number, required: true },
  alternatePhoneNumber: { type: Number },
  dateJoined: { type: String, default: Date.now().toString() },
  emailId: { type: String },
  city: { type: String, required: true },
});

export interface SellerModel {
  name: string;
  businessName: string;
  businessDoc: string;
  businessDocNumber: string;
  businessDocUrl: string;
  phoneNumber: number;
  alternatePhoneNumber: number;
  dateJoined: string;
  emailId: string;
  city: string;
}
