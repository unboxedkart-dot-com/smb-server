import mongoose from 'mongoose';
import { ServiceModel, ServiceSchema } from './service.model';

export const NotificationSchema = new mongoose.Schema({
  title: { type: String, required: true },
  subtitle: { type: String, required: true },
  orderStatus: { type: String, required: true },
  dateInString: { type: String, required: true },
  deviceTitle: { type: String, required: true },
  orderId: { type: String, required: true },
  userId: { type: String, required: true },
});

export interface NotificationModel {
  title: string;
  subtitle: string;
  orderStatus: string;
  dateInString: string;
  deviceTitle: string;
  orderId: string;
  userId: string;
}
