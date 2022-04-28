import mongoose from 'mongoose';
export declare const ProductDescriptionSchema: mongoose.Schema<any, mongoose.Model<any, any, any, any>, any, any>;
export interface ProductDescription {
    productCode: string;
    productDescription: string[];
}
