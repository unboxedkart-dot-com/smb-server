import mongoose from 'mongoose';
export declare const ServiceSchema: mongoose.Schema<any, mongoose.Model<any, any, any, any>, any, any>;
export interface ServiceModel {
    productCode: string;
    title: string;
    price: number;
    sellingPrice: number;
    colors: [string];
}
