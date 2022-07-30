export declare class CreateCouponDto {
    couponCode: string;
    description: string;
    discountAmount: number;
    minimumOrderTotal: number;
    redemptionLimit: number;
    expiryTime: Date;
    discountType: string;
    redemptionType: string;
    expiryType: string;
    isPersonalCoupon: boolean;
}
