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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let UserService = class UserService {
    constructor(userModel, userPaymentDetailsModel) {
        this.userModel = userModel;
        this.userPaymentDetailsModel = userPaymentDetailsModel;
    }
    async getUserDetails(userId) {
        const user = await this.userModel.findById(userId);
        return user;
    }
    async getUserData(userId) {
        const user = await this.userModel.findById(userId, {
            purchasedItemIds: 1,
            answeredQuestionIds: 1,
        });
    }
    async updateUserDetails(userId, entireBody) {
        console.log('updating details', entireBody);
        await this.userModel.findByIdAndUpdate(userId, {
            name: entireBody.name,
            gender: entireBody.gender,
        });
    }
    async getPaymentDetails(userId) {
        const userPaymentDetails = await this.userPaymentDetailsModel.findOne({
            userId: userId,
        });
        return userPaymentDetails;
    }
    async updatePaymentDetails(userId, entireBody) {
        console.log('updating details', entireBody);
        const paymentDetails = await this.userPaymentDetailsModel.findOne({
            userId: userId,
        });
        console.log('paymentdetails', paymentDetails);
        if (paymentDetails) {
            console.log('old');
            await this.userPaymentDetailsModel.findOneAndUpdate({
                userId: userId,
            }, {
                upiId: entireBody.upiId,
                upiName: entireBody.upiName,
            });
        }
        else {
            console.log('new');
            const newPayment = new this.userPaymentDetailsModel({
                userId: userId,
                upiName: entireBody.upiName,
                upiId: entireBody.upiId,
            });
            newPayment.save();
        }
    }
};
UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)('User')),
    __param(1, (0, mongoose_1.InjectModel)('UserPaymentDetails')),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map