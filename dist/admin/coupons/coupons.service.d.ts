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
    getCoupons(): Promise<Coupon[]>;
    createCoupon(entireBody: CreateCouponDto): Promise<void>;
}
