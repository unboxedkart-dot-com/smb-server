import mongoose from 'mongoose';

export const StoreNotificationSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  tokenNumber: { type: String, required: true },
  title: { type: String, required: true },
  subtitle: { type: String, required: true },
  visitStatus: { type: String, default: 'visited' },
  timestamp: { type: Number, required : true},
  dateInString: { type: String, required: true },
  storeName: { type: String, required: true },
  categoryCode: { type: String, required: false },
  brandCode: { type: String, required: false },
  productCode: { type: String, required: false },
  processorCode: { type: String, required: false },
  storageCode: { type: String, required: false },
  connectivityCode: { type: String, required: false },
});

export interface StoreNotificationModel {
  userId: string;
  tokenNumber: string;
  title: string;
  subtitle: string;
  visitStatus: string;
  timestamp: string;
  dateInString: string;
  storeName: string;
  categoryCode: string;
  brandCode: string;
  productCode: string;
  processorCode: string;
  storageCode: string;
  connectivityCode: string;
}
