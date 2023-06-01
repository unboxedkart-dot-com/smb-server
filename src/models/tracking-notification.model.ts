import mongoose from 'mongoose';
import { ServiceModel, ServiceSchema } from './service.model';

export const TrackingNotificationSchema = new mongoose.Schema({
  title: { type: String, required: true },
  subtitle: { type: String, required: false },
  content: { type: String, required: false },
  dateInString: { type: String, required: false },
  timestamp: { type: String, required: true, default: Date.now().toString() },
  userId: { type: String, required: false },
  productId: { type: String, required: false },
  type: { type: String, required: false },
  seen: { type: Boolean, default: false },
  seenId: { type: String },
  userPhoneNumber: { type: String },
});

export interface TrackingNotificationModel {
  title: string;
  subtitle: string;
  content: string;
  dateInString: string;
  timestamp: string;
  userId: string;
  productId: string;
  type: string;
  seen: boolean;
  seenId: string;
  userPhoneNumber: string;
}
