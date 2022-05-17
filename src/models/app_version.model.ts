import mongoose from 'mongoose';
import { OrderSummary, OrderSummarySchema } from './order_summary.model';

export const AppVersionSchema = new mongoose.Schema({
  version: { type: String, required: true },
  minAppVersion: { type: String, required: true },
  publishDate: { type: String, required: true },
  description: { type: String, required: true },
  timestamp: { type: Date, default: Date.now() },
});

export interface AppVersion {
  version: string;
  minAppVersion: string;
  publishDate: string;
  description: string;
}
