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
exports.CampaignService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let CampaignService = class CampaignService {
    constructor(userModel, campaignModel) {
        this.userModel = userModel;
        this.campaignModel = campaignModel;
    }
    _generateOrderNumber() {
        const orderCode = 'OD';
        const randomNumber = Math.floor(10000000000000 + Math.random() * 90000000000000);
        const orderNumber = orderCode + randomNumber.toString();
        return orderNumber;
    }
    async createPaymentOrder(payableAmount, orderNumber) {
    }
    async getPayableAmount(userId) {
        console.log('getting payable amount');
        const userDoc = await this.userModel.findById(userId);
        let payableAmount = 2000;
        const orderNumber = this._generateOrderNumber();
        const paymentOrderId = await this.createPaymentOrder(payableAmount, orderNumber);
        await this.userModel.findByIdAndUpdate(userId, {
            'orderSummary.orderNumber': orderNumber,
            'orderSummary.paymentAmount': payableAmount,
            'orderSummary.paymentOrderId': paymentOrderId['id'],
        });
        return {
            payableAmount: payableAmount,
            paymentOrderId: paymentOrderId['id'],
            name: userDoc.representativeName,
            email: userDoc.emailId,
            phoneNumber: userDoc.phoneNumber,
        };
    }
    async addNewCampaign(userId, entireBody) {
        console.log('updating details', entireBody);
        const userDoc = await this.userModel.findById(userId);
        const newCampaign = new this.campaignModel({
            title: entireBody.title,
            description: entireBody.description,
            hasImage: entireBody.hasImage,
            hasVideo: entireBody.hasVideo,
            hasLink: entireBody.hasLink,
            imageUrl: entireBody.imageUrl,
            videoUrl: entireBody.videoUrl,
            linkUrl: entireBody.linkUrl,
            requiredViewsCount: entireBody.requiredViewsCount,
            campaignDateInString: entireBody.campaignDateInString,
            preferredGender: entireBody.preferredGender,
            preferredState: entireBody.preferredState,
            preferredDistrict: entireBody.preferredDistrict,
            preferredCity: entireBody.preferredCity,
            preferredPincode: entireBody.preferredPincode,
            userId: userId,
            userDetails: {
                phoneNumber: userDoc.phoneNumber,
                name: userDoc.representativeName,
                emailId: userDoc.emailId,
                companyName: userDoc.companyName,
                officePhoneNumber: userDoc.officeMobileNumber,
                officeAddress: userDoc.officeAddress,
            },
        });
        await newCampaign.save();
    }
};
CampaignService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)('User')),
    __param(1, (0, mongoose_1.InjectModel)('Campaign')),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model])
], CampaignService);
exports.CampaignService = CampaignService;
//# sourceMappingURL=campaign.service.js.map