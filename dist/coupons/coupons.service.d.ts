/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/error" />
import { Model } from 'mongoose';
import { Coupon } from 'src/models/coupon.model';
import { User } from 'src/models/user.model';
import { CreateCouponDto } from './dto/create-coupon.dto';
import { Product } from 'src/models/product.model';
export declare class CouponsService {
    private readonly couponModel;
    private readonly userModel;
    private readonly productModel;
    constructor(couponModel: Model<Coupon>, userModel: Model<User>, productModel: Model<Product>);
    getAllCoupons(): Promise<Coupon[]>;
    getPersonalCoupon(userId: string): Promise<import("mongoose").Document<unknown, any, Coupon> & Coupon & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    createCoupon(entireBody: CreateCouponDto): Promise<void>;
    getCoupons(): Promise<Coupon[]>;
    createPersonalCoupon(userId: string): Promise<void>;
    _calculateCartValue(orderItems: any): Promise<number>;
    validateCoupon(userId: string, couponCode: string): Promise<{
        isValid: boolean;
        couponDetails: {
            couponCode: string;
            couponDescription: string;
            discountAmount: number;
            expiryType: import("src/models/coupon.model").ExpiryTypes;
            expiryTime: Date;
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
