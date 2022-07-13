import mongoose from 'mongoose';
import { OrderedServiceModel } from './ordered_service.model';
export declare const ServiceOrderSchema: mongoose.Schema<any, mongoose.Model<any, any, any, any>, any, any>;
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
