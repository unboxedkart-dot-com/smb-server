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
const uuid_1 = require("uuid");
let AuthService = class AuthService {
    constructor(refreshTokenModel, jwtService, adminModel) {
        this.refreshTokenModel = refreshTokenModel;
        this.jwtService = jwtService;
        this.adminModel = adminModel;
    }
    async loginAdmin(phoneNumber) {
        const admin = await this.adminModel
            .findOne({ phoneNumber: { $eq: phoneNumber } })
            .exec();
        if (admin) {
            await this.adminModel.findOneAndUpdate({ phoneNumber: { $eq: phoneNumber } }, { lastLoggedIn: Date.now() });
            const accessToken = await this.createJwt(admin.id);
            return {
                status: 'success',
                message: 'admin logged in',
                data: {
                    accessToken: accessToken,
                    userId: admin._id.toString().substring(0, 20),
                },
            };
        }
        else {
            throw new common_1.NotFoundException('user does not exits, please create user');
        }
    }
    async addNewRefreshToken(userId, previousToken) {
        await this.refreshTokenModel.findByIdAndUpdate(previousToken, {
            isActive: false,
        });
        const newRefreshToken = new this.refreshTokenModel({
            token: (0, uuid_1.v4)(),
            userId: userId,
        });
        newRefreshToken.save();
    }
    async newAccessToken(userId, refreshToken) {
        const refreshTokenDoc = await this.refreshTokenModel.findOne({
            token: refreshToken,
        });
        if (refreshTokenDoc &&
            refreshTokenDoc.isActive &&
            refreshTokenDoc.userId == userId) {
            const newAccessToken = await this.createJwt(refreshTokenDoc.userId);
            this.addNewRefreshToken(refreshTokenDoc.userId, refreshTokenDoc._id.toString());
            return {
                accessToken: newAccessToken,
                refreshToken: (0, uuid_1.v4)(),
            };
        }
        else {
            return 'you are not authorised';
        }
    }
    async createJwt(id) {
        const payload = { sub: id };
        const accessToken = this.jwtService.sign(payload, { expiresIn: '10m' });
        return accessToken;
    }
};
AuthService = __decorate([
    __param(0, (0, mongoose_1.InjectModel)('RefreshToken')),
    __param(2, (0, mongoose_1.InjectModel)('Admin')),
    __metadata("design:paramtypes", [mongoose_2.Model,
        jwt_1.JwtService,
        mongoose_2.Model])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map