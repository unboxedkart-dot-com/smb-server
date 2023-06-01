import mongoose from 'mongoose';
export declare const StoreNotificationSchema: mongoose.Schema<any, mongoose.Model<any, any, any, any>, any, any>;
export interface StoreNotificationModel {
    userId: string;
    tokenNumber: string;
    title: string;
    subtitle: string;
    visitStatus: string;
    timestamp: string;
    dateInString: string;
    storeName: string;
    categoryCode: string;
    brandCode: string;
    productCode: string;
    processorCode: string;
    storageCode: string;
    connectivityCode: string;
}
