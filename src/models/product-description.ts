import mongoose from 'mongoose';

export const ProductDescriptionSchema = new mongoose.Schema({
  productCode: { type: String, required: true },
  productDescriptions: { type: Array, required: true },
});

export interface ProductDescription {
  productCode: string;
  productDescription: string[];
}


