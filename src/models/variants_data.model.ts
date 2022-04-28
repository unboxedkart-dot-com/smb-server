import mongoose from 'mongoose';

export const VariantsDataSchema = new mongoose.Schema({
  productCode: { type: String, required: true },
  colors: { type: Array, required: true },
  conditions: { type: Array, required: true },
  storages: { type: Array, required: false },
  processors: { type: Array, required: false },
  rams: { type: Array, required: false },
});

export interface VariantsData {
  productCode: string;
  colors: [];
  conditions: [];
  storages: [];
  processors: [];
  rams: [];
}
