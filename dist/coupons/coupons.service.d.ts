/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/error" />
import { Model } from 'mongoose';
import { Coupon } from 'src/models/coupon.model';
import { CreateOrderDto } from 'src/orders/dto/create-order.dto';
import { User } from 'src/models/user.model';
export declare class CouponsService {
    private readonly couponModel;
    private readonly userModel;
    constructor(couponModel: Model<Coupon>, userModel: Model<User>);
    getPersonalCoupon(userId: string): Promise<import("mongoose").Document<unknown, any, Coupon> & Coupon & {
        _id: import("mongoose").Types.ObjectId;
    }>;
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
    createCoupon(userId: string, entireBody: CreateOrderDto): Promise<void>;
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
