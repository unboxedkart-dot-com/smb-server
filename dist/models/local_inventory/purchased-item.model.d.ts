import mongoose from 'mongoose';
export declare const PurchasedProductSchema: mongoose.Schema<any, mongoose.Model<any, any, any, any>, any, any>;
export interface PurchasedProductModel {
    productCode: string;
    title: string;
    brand: string;
    category: string;
    color: string;
    brandCode: string;
    categoryCode: string;
    colorCode: string;
    purchaseDate: string;
}
