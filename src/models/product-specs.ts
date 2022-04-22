import mongoose from 'mongoose';

export const ProductSpecsSchema = new mongoose.Schema({
  productId: { type: String, required: true },
  productCode: { type: String, required: true },
  productSpecs: [
    {
      title: { type: String, required: true },
      values: { type: Map, required: true },
    },
  ],
});

export interface ProductSpecs {
  productId: string;
  productCode: string;
  specs: [
    {
      title: string;
      values: string[];
    },
  ];
}
