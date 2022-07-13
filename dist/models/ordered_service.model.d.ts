import mongoose from 'mongoose';
export declare const OrderedServiceSchema: mongoose.Schema<any, mongoose.Model<any, any, any, any>, any, any>;
export interface OrderedServiceModel {
    title: string;
    price: number;
    sellingPrice: number;
}
