import mongoose from 'mongoose';
export declare const MoreDetails: mongoose.Schema<any, mongoose.Model<any, any, any, any>, any, any>;
export interface MoreDetails {
    colorCode: string;
    color: string;
    storage: string;
    storageCode: string;
    connectivityCode: string;
    connectivity: string;
    processorCode: string;
    processor: string;
}
export declare const StoreTokenSchema: mongoose.Schema<any, mongoose.Model<any, any, any, any>, any, any>;
export interface StoreTokenModel {
    userId: string;
    productId: string;
    name: string;
    phoneNumber: number;
    emailId: string;
    categoryCode: string;
    category: string;
    brandCode: number;
    brand: string;
    productCode: string;
    productTitle: string;
    tokenStatus: string;
    tokenType: string;
    visitType: string;
    timestamp: string;
    moreDetails: {
        colorCode: string;
        color: string;
        storage: string;
        storageCode: string;
        connectivityCode: string;
        connectivity: string;
        processorCode: string;
        processor: string;
    };
}
