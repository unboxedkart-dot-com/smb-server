import mongoose from 'mongoose';
export declare const ReferralOrderSchema: mongoose.Schema<any, mongoose.Model<any, any, any, any>, any, any>;
export interface ReferralOrder {
    couponCode: string;
    orderNumber: string;
    referrerDetails: {
        userId: string;
        phoneNumber: string;
        userName: string;
        userEmail: string;
    };
    refereeDetails: {
        userId: string;
        userName: string;
    };
    cashBackDetails: {
        cashBackAmount: string;
        isCredited: string;
    };
    discountDetails: {
        discountAmount: string;
    };
    isCompeleted: boolean;
    timestamp: Date;
}
