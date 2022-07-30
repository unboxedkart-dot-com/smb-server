import { AuthService } from 'src/auth/auth.service';
import { Coupon } from 'src/models/coupon.model';
import { CouponsService } from './coupons.service';
import { CreateCouponDto } from './dto/create-coupon.dto';
import { Model } from 'mongoose';
export declare class CouponsController {
    private readonly couponsService;
    private readonly authService;
    private readonly couponModel;
    constructor(couponsService: CouponsService, authService: AuthService, couponModel: Model<Coupon>);
    handleGetAllCoupons(request: any): Promise<Coupon[]>;
    handleCreateCoupon(request: any, entireBody: CreateCouponDto): Promise<void>;
    getCoupons(): Promise<Coupon[]>;
}
