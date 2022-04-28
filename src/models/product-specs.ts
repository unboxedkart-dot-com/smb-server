import mongoose from 'mongoose';

export const ProductSpecsSchema = new mongoose.Schema({
  productCode: { type: String, required: true },
  productSpecs: [
    {
      title: { type: String, required: true },
      values: { type: Map, required: true },
    },
  ],
});

export interface ProductSpecs {
  productCode: string;
  productSpecs: [
    {
      title: string;
      values: string[];
    },
  ];
}
