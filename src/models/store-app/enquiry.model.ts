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

export const EnquirySchema = new mongoose.Schema({
  name: { type: String, required: true },
  phoneNumber: { type: Number, required: true },
  advisor: { type: String, required: true },
  advisorCode: { type: String, required: true },
  enquirySourceCode: { type: String, required: false },
  enquirySource: { type: String, required: false },
  enquiryStatusCode: { type: String, required: false },
  enquiryStatus: { type: String, required: false },
  productAvailabilityCode: { type: String, required: false },
  productAvailability: { type: String, required: false },
  quotedPrice: { type: String, required: false },
  askPrice: { type: String, required: false },
  categoryCode: { type: String, required: false },
  category: { type: String, required: true },
  brandCode: { type: String, required: true },
  brand: { type: String, required: true },
  productCode: { type: String, required: true },
  productTitle: { type: String, required: true },
  timestamp: { type: Number, required: true },
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

export interface EnquiryModel {
  name: string,
  phoneNumber: number,
  advisor: string,
  advisorCode: string,
  enquirySourceCode: string,
  enquirySource: string,
  enquiryStatusCode: string,
  enquiryStatus: string,
  productAvailabilityCode: string,
  productAvailability: string,
  quotedPrice: string,
  askPrice: string,
  categoryCode: string,
  category: string,
  brandCode: string,
  brand: string,
  productCode: string,
  productTitle: string,
  timestamp: number,
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
