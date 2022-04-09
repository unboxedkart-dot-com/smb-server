import mongoose from 'mongoose';
export declare const ReviewsDataSchema: mongoose.Schema<any, mongoose.Model<any, any, any, any>, any, any>;
export interface ReviewsData {
    productId: string;
    averageRating: number;
    fiveStarCount: number;
    fourStarCount: number;
    threeStarCount: number;
    twoStarCount: number;
    OneStarCount: number;
    totalReviewsCount: number;
}
