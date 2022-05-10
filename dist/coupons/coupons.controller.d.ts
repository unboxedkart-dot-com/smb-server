/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose" />
import { AuthService } from 'src/auth/auth.service';
import { CouponsService } from './coupons.service';
import { CreateCouponDto } from './dto/create-coupon.dto';
export declare class CouponsController {
    private readonly couponsService;
    private readonly authService;
    constructor(couponsService: CouponsService, authService: AuthService);
    handleGetPersonalCoupon(request: any): Promise<import("mongoose").Document<unknown, any, import("../models/coupon.model").Coupon> & import("../models/coupon.model").Coupon & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    handleGetCoupons(): Promise<import("../models/coupon.model").Coupon[]>;
    handleCreatePersonalCoupon(request: any): Promise<void>;
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
    handleGetAllCoupons(request: any): Promise<import("../models/coupon.model").Coupon[]>;
    handleCreateCoupon(request: any, entireBody: CreateCouponDto): Promise<void>;
}
