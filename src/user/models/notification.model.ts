import mongoose from 'mongoose';


export const NotificationSchema = new mongoose.Schema({
  title: { type: String, required: true },
  subtitle: { type: String, required: true },
  content: { type: String, required: false },
  orderStatus: { type: String, required: true },
  dateInString: { type: String, required: false },
  productTitle: { type: String, required: true },
  orderId: { type: String, required: true },
  orderItemId: { type: String, required: true },
  userId: { type: String, required: true },
  type: { type: String, required: true },
  timestamp: { type: String, required: true, default: Date.now().toString() },
  seen: { type: Boolean, default: false },
  seenId: { type: String },
  userPhoneNumber: { type: String },
});

export interface NotificationModel {
  title: string;
  subtitle: string;
  content: string;
  orderStatus: string;
  dateInString: string;
  productTitle: string;
  orderId: string;
  orderItemId: string;
  userId: string;
  timestamp: string;
  type: string;
  seen: boolean;
  seenId: string;
  userPhoneNumber: string;
}
