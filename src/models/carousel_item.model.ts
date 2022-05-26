import mongoose from 'mongoose';

export enum UserRoles {
  USER = 'user',
  SELLER = 'registered seller',
  ADMIN = 'administrator',
}

export const CarouselItemSchema = new mongoose.Schema({
  imageUrl: { type: String, required: true },
  placement: { type: String, required: true },
  brandCode: { type: String },
  categoryCode: { type: String },
  conditionCode: { type: String },
  productCode: { type: String },
  title: { type: String },
  isExact: { type: Boolean, default: false },
  productId: { type: String },
  index: { type: Number, required: true },
  isActive: { type: Boolean, default: true },
  startingPrice: { type: Number },
  endingPrice: { type: Number },
  seriesCode: { type: String },
  processorCode: { type: String },
  screenSizeCode: { type: String },
});

export interface CarouselItem {
  imageUrl: string;
  placement: true;
  brandCode: string;
  categoryCode: string;
  conditionCode: string;
  title: string;
  productCode: string;
  isExact: boolean;
  productId: string;
  isActive: boolean;
  index: number;
  startingPrice: number;
  endingPrice: number;
  seriesCode: string;
  processorCode : string;
  screenSizeCode : string;
}
