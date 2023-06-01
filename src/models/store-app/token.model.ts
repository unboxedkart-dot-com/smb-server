import mongoose from 'mongoose';

export const MoreDetails = new mongoose.Schema({
  colorCode: { type: String, required: false },
  color: { type: String, required: false },
  storage: { type: String, required: false },
  storageCode: { type: String, required: false },
  connectivityCode: { type: String, required: false },
  connectivity: { type: String, required: false },
  processorCode: { type: String, required: false },
  processor: { type: String, required: false },
});

export interface MoreDetails {
  colorCode: string;
  color: string;
  storage: string;
  storageCode: string;
  connectivityCode: string;
  connectivity: string;
  processorCode: string;
  processor: string;
}

export const StoreTokenSchema = new mongoose.Schema({
  userId: { type: String, required: true, select: false },
  productId: { type: String, required: false, select: false },
  tokenNumber: { type: String, required: true },
  tokenType: { type: String, default: 'open' },
  name: { type: String, required: true },
  phoneNumber: { type: Number, required: true },
  emailId: { type: String, required: false },
  categoryCode: { type: String, required: false },
  category: { type: String, required: true },
  brandCode: { type: String, required: true },
  brand: { type: String, required: true },
  productCode: { type: String, required: true },
  productTitle: { type: String, required: true },
  tokenStatus: { type: String, default: 'visited' },
  visitType: { type: String, default: 'walk-in' },
  timestamp: { type: Number, required: true },
  // moreDetails: { type: MoreDetails, required: false },
  moreDetails: {
    colorCode: { type: String, required: false },
    color: { type: String, required: false },
    storage: { type: String, required: false },
    storageCode: { type: String, required: false },
    connectivityCode: { type: String, required: false },
    connectivity: { type: String, required: false },
    processorCode: { type: String, required: false },
    processor: { type: String, required: false },
  },
});

export interface StoreTokenModel {
  userId: string;
  productId: string;
  name: string;
  phoneNumber: number;
  emailId: string;
  categoryCode: string;
  category: string;
  brandCode: number;
  brand: string;
  productCode: string;
  productTitle: string;
  tokenStatus: string;
  tokenType: string;
  visitType: string;
  timestamp: string;
  // moreDetails: MoreDetails;
  moreDetails: {
    colorCode: string;
    color: string;
    storage: string;
    storageCode: string;
    connectivityCode: string;
    connectivity: string;
    processorCode: string;
    processor: string;
  };
}
