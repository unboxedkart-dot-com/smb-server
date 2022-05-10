import mongoose from 'mongoose';
export declare enum CouponTypes {
    FLAT = "FLAT",
    PERCENTAGE = "PERCENTAGE",
    UPTO = "UPTO"
}
export declare enum RedemptionTypes {
    LIMITED = "LIMITED",
    UNLIMITED = "UNLIMITED"
}
export declare enum ExpiryTypes {
    LIMITED_TIME = "LIMITED TIME",
    NON_EXPIRABLE = "NON EXPIRABLE"
}
export interface ReferrerDetails {
    userId: {
        type: String;
        required: true;
        select: false;
    };
    phoneNumber: {
        type: Number;
        required: true;
    };
    userName: {
        type: String;
        required: true;
    };
    userEmail: {
        type: String;
        required: false;
    };
}
export declare const CouponSchema: mongoose.Schema<any, mongoose.Model<any, any, any, any>, any, any>;
export interface Coupon {
    couponCode: string;
    description: string;
    discountAmount: number;
    minimumOrderTotal: number;
    discountType: CouponTypes;
    expiryType: ExpiryTypes;
    redemptionType: RedemptionTypes;
    expiryTime: Date;
    redemptionLimit: number;
    isPersonalCoupon: boolean;
    isActive: boolean;
    couponDetails: {
        userId: string;
        phoneNumber: number;
        userName: string;
        userEmail: string;
    };
}
