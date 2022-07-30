"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CouponsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("mongoose");
const mongoose_2 = require("@nestjs/mongoose");
let CouponsService = class CouponsService {
    constructor(couponModel, userModel, productModel) {
        this.couponModel = couponModel;
        this.userModel = userModel;
        this.productModel = productModel;
    }
    async getAllCoupons() {
        const coupons = await this.couponModel.find({ isPersonalCoupon: false });
        return coupons;
    }
    async getCoupons() {
        const coupons = await this.couponModel.find({ isPersonalCoupon: false });
        return coupons;
    }
    async createCoupon(entireBody) {
        console.log('entire body', entireBody);
        const newCoupon = new this.couponModel({
            couponCode: entireBody.couponCode,
            description: entireBody.description,
            discountAmount: entireBody.discountAmount,
            minimumOrderTotal: entireBody.minimumOrderTotal,
            discountType: entireBody.discountType,
            redemptionType: entireBody.redemptionType,
            expiryType: entireBody.expiryType,
            expiryTime: entireBody.expiryTime,
            redemptionLimit: entireBody.redemptionLimit,
        });
        newCoupon.save();
    }
};
CouponsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_2.InjectModel)('Coupon')),
    __param(1, (0, mongoose_2.InjectModel)('User')),
    __param(2, (0, mongoose_2.InjectModel)('Product')),
    __metadata("design:paramtypes", [mongoose_1.Model,
        mongoose_1.Model,
        mongoose_1.Model])
], CouponsService);
exports.CouponsService = CouponsService;
//# sourceMappingURL=coupons.service.js.map