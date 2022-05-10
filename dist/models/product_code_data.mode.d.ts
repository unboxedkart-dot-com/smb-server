import mongoose from 'mongoose';
export declare const ProductDataSchema: mongoose.Schema<any, mongoose.Model<any, any, any, any>, any, any>;
export interface ProductData {
    productCode: string;
    highlights: string[];
    title: string;
    modelNumber: string;
}
