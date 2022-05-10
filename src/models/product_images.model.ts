import mongoose from 'mongoose';

export const ProductImagesSchema = new mongoose.Schema({
  productCode: { type: String, required: true },
  colorCode: { type: String, required: true },
  coverImage: { type: String },
  images: { type: [String], required: false },
  thumbnails: { type: [String], required: false },
  count: { type: Number, required: true },
});

export interface ProductImages {
  productCode: string;
  colorCode: string;
  coverImage: string;
  images: string[];
  thumbnails: string[];
  count: number;
}
