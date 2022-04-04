import mongoose from 'mongoose';

export const StoreLocationSchema = new mongoose.Schema({
  storeName: { type: String, required: true },
  streetName: { type: String, required: true },
  cityName: { type: String, required: true },
  pinCode: { type: Number, required: true },
  directionsUrl: { type: String, required: true },
  storeTimings: { type: String, required: true },
  storeOpenDays: { type: String, required: true },
  contactNumber: { type: Number, required: true },
  alternateContactNumber: { type: Number, required: false },
});

export interface StoreLocation {
  storeName: string;
  streetName: string;
  cityName: string;
  pinCode: number;
  directionsUrl: string;
  storeTimings: string;
  storeOpenDays: string;
  contactNumber: number;
  alternateContactNumber: number;
}
