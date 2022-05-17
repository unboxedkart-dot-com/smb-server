import mongoose from 'mongoose';
export declare const SavedToLaterSchema: mongoose.Schema<any, mongoose.Model<any, any, any, any>, any, any>;
export interface SavedToLater {
    userId: string;
    productId: string;
    timestamp: Date;
    productCount: number;
}
