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
const coupon_model_1 = require("../models/coupon.model");
let CouponsService = class CouponsService {
    constructor(couponModel, userModel) {
        this.couponModel = couponModel;
        this.userModel = userModel;
    }
    async createPersonalCoupon(userId) {
        const userDetails = await this._getUserDetails(userId);
        const newCoupon = new this.couponModel({
            couponCode: userDetails.couponCode,
            discountAmount: 500,
            minimumOrderTotal: 30000,
            discountType: coupon_model_1.CouponTypes.FLAT,
            isPersonalCoupon: true,
            couponDetails: userDetails.userDetails,
        });
        newCoupon.save();
        await this.userModel.findByIdAndUpdate(userId, {
            personalCouponCode: userDetails.couponCode,
        });
    }
    async validateCoupon(userId, couponCode, cartTotal) {
        const coupon = await this.couponModel.findOne({
            couponCode: couponCode,
        });
        if (coupon) {
            console.log('ppp', coupon);
            if (cartTotal > coupon.minimumOrderTotal) {
                return {
                    isValid: true,
                    couponDetails: {
                        couponCode: coupon.couponCode,
                        couponDescription: 'Use this coupon to get 100 off',
                        discountAmount: 500,
                    },
                };
            }
            else {
                return {
                    isValid: false,
                    errorText: `Minimum cart value should be ${coupon.minimumOrderTotal} to apply this coupon code.`,
                };
            }
        }
        else {
            return {
                isValid: false,
                errorText: 'Entered coupon is not valid',
            };
        }
    }
    async createCoupon(userId, entireBody) { }
    async _getUserDetails(userId) {
        const userDetails = await this.userModel.findById(userId);
        const randomNumber = Math.floor(100000 + Math.random() * 900000);
        const couponCode = 'UNBOXED' + userDetails.name.substring(0, 6) + randomNumber;
        return {
            userDetails: {
                userId: userId,
                phoneNumber: userDetails.phoneNumber,
                userName: userDetails.name,
                userEmail: userDetails.emailId,
            },
            couponCode: couponCode,
        };
    }
};
CouponsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_2.InjectModel)('Coupon')),
    __param(1, (0, mongoose_2.InjectModel)('User')),
    __metadata("design:paramtypes", [mongoose_1.Model,
        mongoose_1.Model])
], CouponsService);
exports.CouponsService = CouponsService;
//# sourceMappingURL=coupons.service.js.map