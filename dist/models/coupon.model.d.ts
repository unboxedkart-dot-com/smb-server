import mongoose from 'mongoose';
export declare enum CouponTypes {
    FLAT = "FLAT",
    PERCENTAGE = "PERCENTAGE",
    UPTO = "UPTO"
}
export declare const CouponSchema: mongoose.Schema<any, mongoose.Model<any, any, any, any>, any, any>;
export interface Coupon {
    couponCode: string;
    discountAmount: number;
    minimumOrderTotal: number;
    discountType: CouponTypes;
    expiryTime: Date;
    isPersonalCoupon: boolean;
    couponDetails: [
        {
            userId: string;
            phoneNumber: number;
            userName: string;
            userEmail: string;
        }
    ];
}
