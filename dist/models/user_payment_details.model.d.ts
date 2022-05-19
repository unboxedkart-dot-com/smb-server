import mongoose from 'mongoose';
export declare const UserPaymentDetailsSchema: mongoose.Schema<any, mongoose.Model<any, any, any, any>, any, any>;
export interface UserPaymentDetails {
    userId: string;
    upiName: string;
    upiId: string;
}
