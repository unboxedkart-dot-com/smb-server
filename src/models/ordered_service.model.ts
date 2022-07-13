import mongoose from 'mongoose';

export const OrderedServiceSchema = new mongoose.Schema({
  title: { type: String, required: true },
  price: { type: Number },
  sellingPrice: { type: Number },
});

export interface OrderedServiceModel {
  title: string;
  price: number;
  sellingPrice: number;
}
