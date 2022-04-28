import mongoose from 'mongoose';

export const ProductSchema = new mongoose.Schema({
  SKU: { type: String, required: true },
  productCode: { type: String, required: true },
  aboutProduct: { type: [String], required: true },
  title: { type: String, required: true },
  modelNumber: { type: String, required: true },
  brand: { type: String, required: true },
  brandCode: { type: String, required: true },
  category: { type: String, required: true },
  categoryCode: { type: String, required: true },
  condition: { type: String, required: true },
  conditionCode: { type: String, required: true },
  imageUrls: {
    coverImage: { type: String, required: true },
    images: { type: [String], required: true },
  },
  pricing: {
    price: { type: Number, required: true },
    sellingPrice: { type: Number, required: true },
  },
  quantity: { type: Number, required: true },
  highlights: { type: [String], required: false },
  searchCases: { type: [String], required: true },
  isBestSeller: { type: Boolean, required: false, default: false },
  isFeatured: { type: Boolean, required: false, default: false },
  moreDetails: {
    color: { type: String, required: true },
    colorCode: { type: String, required: true },
    storage: { type: String, required: true },
    storageCode: { type: String, required: true },
  },
});

export interface Product {
  id: string;
  productCode: string;
  aboutProduct: string;
  SKU: string;
  title: string;
  modelNumber: string;
  brand: string;
  brandCode: string;
  category: string;
  categoryCode: string;
  condition: string;
  conditionCode: string;
  imageUrls: {
    coverImage: string;
    images: [string];
  };
  pricing: {
    price: number;
    sellingPrice: number;
  };
  quantity: number;
  highlights: [string];
  searchCases: [string];
  isBestSeller: boolean;
  isFeatured: boolean;
  moreDetails: {
    color: string;
    colorCode: string;
    storage: string;
    storageCode: string;
  };
}
