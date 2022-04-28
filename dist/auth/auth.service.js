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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const axios_1 = require("axios");
const coupon_model_1 = require("../models/coupon.model");
const SendGrid = require("@sendgrid/mail");
let AuthService = class AuthService {
    constructor(userModel, couponModel, searchTermModel, jwtService) {
        this.userModel = userModel;
        this.couponModel = couponModel;
        this.searchTermModel = searchTermModel;
        this.jwtService = jwtService;
        SendGrid.setApiKey('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');
    }
    async sendOtp(phoneNumber) {
        const url = `${process.env.SEND_OTP_URL_PREFIX}template_id=${process.env.OTP_TEMPLATE_ID}&mobile=91${phoneNumber}&authkey=${process.env.SMS_AUTH_KEY}&otp_length=6&otp_expiry=${process.env.OTP_EXPIRY_TIME}`;
        console.log('sms url', url);
        const response = await axios_1.default.get(url);
        const responseData = response.data;
        console.log(response);
        if (responseData['type'] == 'success') {
            return {
                status: 'success',
                message: 'otp sent successfully',
            };
        }
        else {
            return {
                status: 'failed',
                message: 'otp is not sent',
            };
        }
    }
    async verifyOtp(phoneNumber, otp) {
        const url = `${process.env.VERIFY_OTP_URL_PREFIX}otp=${otp}&authkey=${process.env.SMS_AUTH_KEY}&mobile=91${phoneNumber}&otp_expiry=${process.env.OTP_EXPIRY_TIME}`;
        console.log('validate url', url);
        const response = await axios_1.default.get(url);
        const responseData = response.data;
        console.log(responseData);
        console.log('status', responseData['type']);
        if (responseData['type'] == 'success' ||
            responseData['message'] == 'Mobile no. already verified') {
            console.log('status new', true);
            return true;
        }
        else {
            console.log('status new', false);
            return false;
        }
    }
    async resendOtp(phoneNumber, type) {
        const retryType = type == 0 ? 'text' : 'default';
        const url = `${process.env.RESEND_OTP_URL_PREFIX}authkey=${process.env.SMS_AUTH_KEY}&retrytype=${retryType}=&mobile=91${phoneNumber}`;
        const response = await axios_1.default.get(url);
        const responseData = response.data;
        if (responseData['type'] == 'success') {
            return {
                status: 'success',
                message: 'otp resent successfully',
            };
        }
        else {
            return {
                status: 'success',
                message: 'otp is not sent',
            };
        }
    }
    async _getRecentSearches(recentSearches) {
        const searches = [];
        console.log('length', recentSearches.length);
        recentSearches.forEach((value, index) => {
            console.log(index);
            console.log(value);
        });
        if (recentSearches.length > 0) {
            for (let i = recentSearches.length - 1; i >= 0 && i > recentSearches.length - 4; i--) {
                console.log('value of i', i);
                console.log('recentsearchterm', recentSearches[i].searchTerm);
                searches.push(recentSearches[i].searchTerm);
            }
        }
        return searches;
    }
    async _getPopularSearches() {
        const popularSearches = [];
        const searches = await this.searchTermModel
            .find({ isPopular: true })
            .limit(3);
        if (searches.length > 0) {
            for (let term of searches) {
                popularSearches.push(term.searchTerm);
            }
        }
        return popularSearches;
    }
    async loginUser(entireBody) {
        const otpStatus = await this.verifyOtp(entireBody.phoneNumber, entireBody.otp);
        console.log('login status', otpStatus);
        if (otpStatus) {
            const user = await this.userModel
                .findOne({ phoneNumber: { $eq: entireBody.phoneNumber } })
                .exec();
            if (user) {
                await this.userModel.findOneAndUpdate({ phoneNumber: { $eq: entireBody.phoneNumber } }, { lastLoggedIn: Date.now() });
                const accessToken = await this.createJwt(user.id);
                console.log('user recent', user.recentSearches);
                const recentSearches = await this._getRecentSearches(user.recentSearches);
                const popularSearches = await this._getPopularSearches();
                console.log('recent searches array');
                console.log(recentSearches);
                return {
                    status: 'success',
                    message: 'user logged in',
                    data: {
                        accessToken: accessToken,
                        wishlist: user.favoriteItemIds,
                        cart: user.cartItemIds,
                        userId: user._id.toString().substring(0, 20),
                        recentSearches: recentSearches,
                        popularSearches: popularSearches,
                        purchasedItemIds: user.purchasedItemIds,
                    },
                };
            }
            else {
                throw new common_1.NotFoundException('user does not exits, please create user');
            }
        }
        else {
            throw new common_1.UnauthorizedException('invalid otp');
        }
    }
    async validateOtp(phoneNumber, otp) {
        const otpStatus = await this.verifyOtp(phoneNumber, otp);
        if (otpStatus) {
            const user = await this.userModel.findOne({ phoneNumber: phoneNumber });
            if (user) {
                return {
                    status: 'failed',
                    message: 'User already exists with this mobile number.',
                    content: 'Login with the same mobile number or use another mobile number to create account',
                };
            }
            else {
                return {
                    status: 'success',
                    message: 'otp is valid',
                };
            }
        }
        else {
            return {
                status: 'failed',
                message: 'Invalid OTP entered',
                content: 'The entered OTP is not valid, please enter otp sent to your mobile number',
            };
        }
    }
    _createCouponCode(name) {
        const randomNumber = Math.floor(1000 + Math.random() * 9000);
        const couponCode = name.substring(0, 6) + randomNumber;
        return couponCode.toUpperCase();
    }
    async createUser(entireBody) {
        const otpStatus = await this.verifyOtp(entireBody.phoneNumber, entireBody.otp);
        if (otpStatus) {
            const userDoc = await this.userModel.findOne({
                phoneNumber: { $eq: entireBody.phoneNumber },
            });
            if (userDoc) {
                return {
                    status: 'failed',
                    message: 'user already exists',
                };
            }
            else {
                const coupon = this._createCouponCode(entireBody.name);
                const newUser = new this.userModel({
                    name: entireBody.name,
                    phoneNumber: entireBody.phoneNumber,
                    deviceId: entireBody.deviceId,
                    emailId: entireBody.emailId,
                    gender: entireBody.gender,
                    lastLoggedIn: Date.now(),
                    personalCouponCode: coupon,
                });
                const userDoc = await newUser.save();
                console.log('new user doc', userDoc);
                const newCoupon = new this.couponModel({
                    couponCode: coupon,
                    discountAmount: 500,
                    minimumOrderTotal: 30000,
                    discountType: coupon_model_1.CouponTypes.FLAT,
                    isPersonalCoupon: true,
                    couponDetails: {
                        userId: userDoc._id,
                        phoneNumber: entireBody.phoneNumber,
                        userName: entireBody.name,
                        userEmail: entireBody.emailId,
                    },
                });
                newCoupon.save();
                this._sendAccountCreatedMessage(userDoc);
                this._sendAccountCreatedMail(userDoc);
                const popularSearches = await this._getPopularSearches();
                const accessToken = await this.createJwt(userDoc.id);
                return {
                    status: 'success',
                    message: 'user created successfully',
                    data: {
                        accessToken: accessToken,
                        userId: newUser._id.toString().substring(0, 20),
                        popularSearches: popularSearches,
                    },
                };
            }
        }
        else {
            return {
                status: 'failed',
                message: 'invalid otp',
            };
        }
    }
    async _sendAccountCreatedMail(userDoc) {
        const msg = {
            to: userDoc.emailId,
            from: 'info@unboxedkart.com',
            templateId: process.env.WELCOME_TEMPLATE_ID,
            dynamic_template_data: {
                name: userDoc.name,
            },
        };
        const transport = await SendGrid.send(msg)
            .then(() => console.log('email send'))
            .catch((e) => console.log('email error', e));
        return transport;
    }
    async _sendAccountCreatedMessage(userDoc) {
        const url = process.env.SMS_FLOW_URL;
        const postBody = {
            flow_id: process.env.WELCOME_FLOW_ID,
            sender: process.env.ORDER_SMS_SENDER_ID,
            mobiles: '91' + userDoc.phoneNumber,
            name: userDoc.name,
            authkey: process.env.SMS_AUTH_KEY,
        };
        await axios_1.default.post(url, postBody);
    }
    async createJwt(id) {
        console.log('payload id', id);
        const payload = { sub: id };
        console.log('payload', payload);
        const accessToken = this.jwtService.sign(payload, { expiresIn: '10m' });
        return accessToken;
    }
    async CheckIfAdmin(userId) {
        console.log('checking admin status', userId);
        const user = await this.userModel.findById(userId).select('+userRole');
        console.log('new user got', user);
        if (user && user.userRole == 'ADMIN') {
            console.log('new sss user', user);
            return true;
        }
        else {
            return false;
        }
    }
    async sendSampleMail() {
    }
};
AuthService = __decorate([
    __param(0, (0, mongoose_1.InjectModel)('User')),
    __param(1, (0, mongoose_1.InjectModel)('Coupon')),
    __param(2, (0, mongoose_1.InjectModel)('SearchTerm')),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        jwt_1.JwtService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map