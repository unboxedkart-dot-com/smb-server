import mongoose from 'mongoose';

export const BuyerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  emailId: { type: String, required: true },
  phoneNumber: { type: Number, required: true },
  city: { type: String, required: true },
  leadSource: { type: String },
  leadSourceInformation: { type: String },
});

export interface BuyerModel {
  name: string;
  emailId: string;
  phoneNumber: number;
  city: string;
  leadSource: string;
  leadSourceInformation: string;
}
