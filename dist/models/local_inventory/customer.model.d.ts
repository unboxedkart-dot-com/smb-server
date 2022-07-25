import mongoose from 'mongoose';
import { PurchasedProductModel } from './purchased-item.model';
export declare const CustomerSchema: mongoose.Schema<any, mongoose.Model<any, any, any, any>, any, any>;
export interface CustomerModel {
    name: string;
    emailId: string;
    phoneNumber: number;
    city: string;
    dateJoined: string;
    leadSource: string;
    leadSourceInformation: string;
    itemsPurchased: PurchasedProductModel[];
}
