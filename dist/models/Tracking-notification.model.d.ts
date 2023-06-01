import mongoose from 'mongoose';
export declare const TrackingNotificationSchema: mongoose.Schema<any, mongoose.Model<any, any, any, any>, any, any>;
export interface TrackingNotificationModel {
    title: string;
    subtitle: string;
    content: string;
    dateInString: string;
    timestamp: string;
    userId: string;
    productId: string;
    type: string;
    seen: boolean;
    seenId: string;
    userPhoneNumber: string;
}
