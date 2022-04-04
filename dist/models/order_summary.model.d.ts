import mongoose from 'mongoose';
export declare const OrderSummarySchema: mongoose.Schema<any, mongoose.Model<any, any, any, any>, any, any>;
export interface OrderSummary {
    userId: string;
    timestamp: Date;
    orderItems: [
        {
            productId: string;
            productCount: number;
        }
    ];
}
