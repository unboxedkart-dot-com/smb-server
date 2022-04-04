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
const axios_1 = require("@nestjs/axios");
const jwt_1 = require("@nestjs/jwt");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let AuthService = class AuthService {
    constructor(userModel, jwtService, httpService) {
        this.userModel = userModel;
        this.jwtService = jwtService;
        this.httpService = httpService;
    }
    async sendOtp(phoneNumber) {
        return '123456';
    }
    verifyOtp(phoneNumber, otp) {
        if (otp == 123456) {
            return true;
        }
        else {
            return false;
        }
    }
    async loginUser(phoneNumber, otp) {
        const otpStatus = this.verifyOtp(phoneNumber, otp);
        if (otpStatus) {
            const user = await this.userModel
                .findOne({ phoneNumber: { $eq: phoneNumber } })
                .exec();
            console.log("user dara", user);
            const accessToken = await this.createJwt(user.id);
            return accessToken;
        }
        else {
            return 'false';
        }
    }
    async validateOtp(phoneNumber, otp) {
        const otpStatus = this.verifyOtp(phoneNumber, otp);
        return otpStatus;
    }
    async createUser(user) {
        const userStatus = await this.userModel.findOne({
            phoneNumber: { $eq: user.phoneNumber },
        });
        if (userStatus) {
            return 'user already exists';
        }
        else {
            const newUser = new this.userModel(user);
            const result = await newUser.save();
            const accessToken = await this.createJwt(result.id);
            return accessToken;
        }
    }
    async createJwt(id) {
        console.log('payload id', id);
        const payload = { sub: id };
        console.log('payload', payload);
        return {
            accessToken: this.jwtService.sign(payload, { expiresIn: '10m' }),
        };
    }
};
AuthService = __decorate([
    __param(0, (0, mongoose_1.InjectModel)('User')),
    __metadata("design:paramtypes", [mongoose_2.Model,
        jwt_1.JwtService,
        axios_1.HttpService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map