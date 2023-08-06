import mongoose from 'mongoose';
export declare const PaymentSchema: mongoose.Schema<any, mongoose.Model<any, any, any, any>, any, any>;
export interface Payment {
    userId: string;
    orderNumber: string;
    gateway: string;
    status: string;
    orderDate: string;
    paymentOrderId: string;
    paymentId: string;
    paymentType: string;
    paymentMethod: string;
    amount: number;
    paymentTimeStamp: Date;
}
