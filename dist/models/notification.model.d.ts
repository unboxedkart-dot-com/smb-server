import mongoose from 'mongoose';
export declare const NotificationSchema: mongoose.Schema<any, mongoose.Model<any, any, any, any>, any, any>;
export interface NotificationModel {
    title: string;
    subtitle: string;
    content: string;
    orderStatus: string;
    dateInString: string;
    productTitle: string;
    orderId: string;
    orderItemId: string;
    userId: string;
    timestamp: string;
    type: string;
    seen: boolean;
    seenId: string;
    userPhoneNumber: string;
}
