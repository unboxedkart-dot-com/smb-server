import mongoose from 'mongoose';

export const PurchasedProductSchema = new mongoose.Schema({
  productCode: { type: String },
  title: { type: String },
  brand: { type: String },
  category: { type: String },
  color: { type: String },
  brandCode: { type: String },
  categoryCode: { type: String },
  colorCode: { type: String },
  purchaseDate: { type: String, default: Date.now().toString() },
});

export interface PurchasedProductModel {
  productCode: string;
  title: string;
  brand: string;
  category: string;
  color: string;
  brandCode: string;
  categoryCode: string;
  colorCode: string;
  purchaseDate: string;
}
