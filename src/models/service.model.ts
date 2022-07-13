import mongoose from 'mongoose';

export const ServiceSchema = new mongoose.Schema({
  productCode: { type: String, required: true },
  title: { type: String, required: true },
  price: { type: Number },
  sellingPrice: { type: Number },
  colors: { type: [String], required: true },
});

export interface ServiceModel {
  productCode: string;
  title: string;
  price: number;
  sellingPrice: number;
  colors: [string];
}
