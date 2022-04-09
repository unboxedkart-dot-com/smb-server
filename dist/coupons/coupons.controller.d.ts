/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose" />
import { CouponsService } from './coupons.service';
export declare class CouponsController {
    private readonly couponsService;
    constructor(couponsService: CouponsService);
    handleGetPersonalCoupon(request: any): Promise<import("mongoose").Document<unknown, any, import("../models/coupon.model").Coupon> & import("../models/coupon.model").Coupon & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    handleCreateCoupon(request: any): Promise<void>;
    handleValidateCoupon(couponCode: string, cartTotal: number, request: any): Promise<{
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
}
