import mongoose from 'mongoose';

export const NotificationSchema = new mongoose.Schema({
  title: { type: String, required: true },
  subtitle: { type: String, required: true },
  content: { type: String, required: true },
//   dateInString: { type: String, required: true },
  notificationType: { type: String, default: null },
  timestamp: { type: Date, default: Date.now() },
  notificationDetail: { type: String },
});

export interface NotificationModel {
  title: string;
  subtitle: string;
  content: string;
//   dateInString: string;
  notificationType: string; 
  notificationDetail: string;
}



