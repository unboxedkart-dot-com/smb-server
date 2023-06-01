import mongoose from 'mongoose';

export const NotificationSchema = new mongoose.Schema({
  title: { type: String, required: true },
  subtitle: { type: String, required: true },
  content: { type: String, required: true },
  // dateInString: { type: String, required: true },
  timestamp: { type: String, default: 'KKK' },
});

export interface NotificationModel {
  title: string;
  subtitle: string;
  content: string;
  timestamp: string;
  // dateInString: string;
}
