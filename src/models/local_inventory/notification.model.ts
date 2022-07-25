import mongoose from 'mongoose';

export const NotificationSchema = new mongoose.Schema({
  title: { type: String, required: true },
  subtitle: { type: String, required: true },
  content: { type: String, required: true },
  // dateInString: { type: String, required: true },
  timestamp: { type: String, default: Date.now().toString() },
});

export interface NotificationModel {
  title: string;
  subtitle: string;
  content: string;
  // dateInString: string;
}
