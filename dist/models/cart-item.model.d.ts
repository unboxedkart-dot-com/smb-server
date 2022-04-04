import mongoose from 'mongoose';
export declare const CartItemSchema: mongoose.Schema<any, mongoose.Model<any, any, any, any>, any, any>;
export interface CartItem {
    userId: string;
    productId: string;
    timestamp: Date;
    productCount: number;
}
