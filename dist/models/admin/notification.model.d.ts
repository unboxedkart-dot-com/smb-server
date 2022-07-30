import mongoose from 'mongoose';
export declare const NotificationSchema: mongoose.Schema<any, mongoose.Model<any, any, any, any>, any, any>;
export interface NotificationModel {
    title: string;
    subtitle: string;
    content: string;
    notificationType: string;
    notificationDetail: string;
}
