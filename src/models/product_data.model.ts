import mongoose from 'mongoose';

export const ProductDataSchema = new mongoose.Schema({
  productCode: { type: String, required: true },
  highlights: { type: [String], required: false },
  title: { type: String, required: true },
  modelNumber: { type: String, required: true },
  modelCode: { type: String, required: true },
  category: { type: String, required: true },
  categoryCode: { type: String, required: true },
  seriesCode: { type: String, required: false },
  brand: { type: String, required: true },
  brandCode: { type: String, required: true },

  storages: [
    {
      code: { type: String },
      title: { type: String },
    },
  ],
  colors: [
    {
      code: { type: String },
      title: { type: String },
    },
  ],
  rams: [
    {
      code: { type: String },
      title: { type: String },
    },
  ],
  processors: [
    {
      code: { type: String },
      title: { type: String },
    },
  ],
  connectivity: [
    {
      code: { type: String },
      title: { type: String },
    },
  ],
  screenSizes: [
    {
      code: { type: String },
      title: { type: String },
    },
  ],
  combinations: [
    {
      code: { type: String },
      title: { type: String },
    },
  ],
});

export interface ProductData {
  productCode: string;
  highlights: string[];
  category: string;
  categoryCode: string;
  seriesCode: string;
  brand: string;
  brandCode: string;
  title: string;
  modelNumber: string;
  modelCode: string;
  processors: [
    {
      code: string;
      title: string;
    },
  ];
  rams: [
    {
      code: string;
      title: string;
    },
  ];
  colors: [
    {
      code: string;
      title: string;
    },
  ];
  storages: [
    {
      code: string;
      title: string;
    },
  ];
  connectivity: [
    {
      code: string;
      title: string;
    },
  ];
  screenSizes: [
    {
      code: string;
      title: string;
    },
  ];
  combinations: [
    {
      code: string;
      title: string;
    },
  ];
}
