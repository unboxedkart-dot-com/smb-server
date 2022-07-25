import mongoose from 'mongoose';
export declare const BuyerSchema: mongoose.Schema<any, mongoose.Model<any, any, any, any>, any, any>;
export interface BuyerModel {
    name: string;
    emailId: string;
    phoneNumber: number;
    city: string;
}
