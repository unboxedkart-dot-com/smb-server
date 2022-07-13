import { stringList } from 'aws-sdk/clients/backup';
import mongoose from 'mongoose';
import {
  OrderedServiceModel,
  OrderedServiceSchema,
} from './ordered_service.model';
import { ServiceModel, ServiceSchema } from './service.model';

export const ServiceOrderSchema = new mongoose.Schema({
  orderNumber: { type: String, required: true },
  userId: { type: String, required: true },
  productTitle: { type: String, required: true },
  orderStatus: { type: String, required: true, default: 'REQUESTED' },
  productCode: { type: String, required: true },
  color: { type: String, required: true },
  colorCode: { type: String, required: true },
  serialNumber: { type: String, required: true },
  dateInString: { type: String, required: true },
  visitDate: { type: String, required: true },
  services: { type: [OrderedServiceSchema], required: true },
  timestamp: { type: Date, default: Date() },
  diagnosisFee: { type: Number, required: true },
});

export interface ServiceOrderModel {
  orderNumber: string;
  userId: string;
  productTitle: string;
  orderStatus: string;
  productCode: string;
  color: string;
  colorCode: string;
  serialNumber: string;
  dateInstring: string;
  visitDate: string;
  services: [OrderedServiceModel];
  diagnosisFee: Number;
}
