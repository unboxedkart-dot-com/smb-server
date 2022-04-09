import mongoose from 'mongoose';
export declare const ReviewSchema: mongoose.Schema<any, mongoose.Model<any, any, any, any>, any, any>;
export interface Review {
    userId: string;
    userName: string;
    rating: number;
    reviewTitle: string;
    reviewContent: string;
    productId: string;
    productTitle: string;
    imageUrl: string;
    isApproved: string;
    timestamp: Date;
}
