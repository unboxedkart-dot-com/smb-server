import mongoose from 'mongoose';
import {
  PurchasedProductModel,
  PurchasedProductSchema,
} from './purchased-item.model';

export const CustomerSchema = new mongoose.Schema({
  name: { type: String, required : true },
  emailId: { type: String },
  phoneNumber: { type: Number, required: true },
  city: { type: String, required: true },
  dateJoined: { type: String, default: Date.now().toString() },
  leadSource: { type: String },
  leadSourceInformation: { type: String },
  itemsPurchased: { type: [PurchasedProductSchema] },
});

export interface CustomerModel {
  name: string;
  emailId: string;
  phoneNumber: number;
  city: string;
  dateJoined: string;
  leadSource: string;
  leadSourceInformation: string;
  itemsPurchased: PurchasedProductModel[];
}
