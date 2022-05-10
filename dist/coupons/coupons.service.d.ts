/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/error" />
import { Model } from 'mongoose';
import { Coupon } from 'src/models/coupon.model';
import { User } from 'src/models/user.model';
import { CreateCouponDto } from './dto/create-coupon.dto';
export declare class CouponsService {
    private readonly couponModel;
    private readonly userModel;
    constructor(couponModel: Model<Coupon>, userModel: Model<User>);
    getAllCoupons(): Promise<Coupon[]>;
    getPersonalCoupon(userId: string): Promise<import("mongoose").Document<unknown, any, Coupon> & Coupon & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    createCoupon(entireBody: CreateCouponDto): Promise<void>;
    getCoupons(): Promise<Coupon[]>;
    createPersonalCoupon(userId: string): Promise<void>;
    validateCoupon(userId: string, couponCode: string, cartTotal: number): Promise<{
        isValid: boolean;
        couponDetails: {
            couponCode: string;
            couponDescription: string;
            discountAmount: number;
        };
        errorText?: undefined;
    } | {
        isValid: boolean;
        errorText: string;
        couponDetails?: undefined;
    }>;
    _getUserDetails(userId: string): Promise<{
        userDetails: {
            userId: string;
            phoneNumber: string;
            userName: string;
            userEmail: string;
        };
        couponCode: string;
    }>;
}
