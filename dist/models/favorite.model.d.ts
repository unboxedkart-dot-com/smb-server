import mongoose from 'mongoose';
export declare const FavoriteSchema: mongoose.Schema<any, mongoose.Model<any, any, any, any>, any, any>;
export interface Favorite {
    userId: string;
    productId: string;
    timestamp: Date;
}
