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
exports.ServiceService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let ServiceService = class ServiceService {
    constructor(serviceOrderModel, notificationModel, faqModel, userModel) {
        this.serviceOrderModel = serviceOrderModel;
        this.notificationModel = notificationModel;
        this.faqModel = faqModel;
        this.userModel = userModel;
    }
    async diagnosisFee(categoryCode) {
        return this._getDiagnosisFee(categoryCode);
    }
    async createServiceRequest(userId, entireBody) {
        const user = await this.userModel.findById(userId);
        if (user) {
            const fee = this._getDiagnosisFee(entireBody.categoryCode);
            const orderNumber = this._generateOrderNumber();
            const newOrder = new this.serviceOrderModel({
                userId: userId,
                phoneNumber: user.phoneNumber,
                name: user.name,
                emailId: user.emailId,
                productTitle: entireBody.productTitle,
                productCode: entireBody.productCode,
                color: entireBody.color,
                colorCode: entireBody.colorCode,
                serialNumber: entireBody.serialNumber,
                dateInString: entireBody.dateInString,
                visitDate: entireBody.visitDate,
                services: entireBody.services,
                orderNumber: orderNumber,
                diagnosisFee: fee,
            });
            await newOrder.save();
            return orderNumber;
        }
    }
    async orders(userId) {
        const orders = await this.serviceOrderModel.find({ userId: userId });
        return orders;
    }
    async notifications(userId) {
        const notifications = await this.notificationModel.find({ userId: userId });
        return notifications;
    }
    async faqs() {
        const faqs = await this.faqModel.find();
        return faqs;
    }
    _generateOrderNumber() {
        const orderCode = 'SRN';
        const randomNumber = Math.floor(10000000000000 + Math.random() * 90000000000000);
        const orderNumber = orderCode + randomNumber.toString();
        return orderNumber;
    }
    _getDiagnosisFee(category) {
        if (category == 'mobile-phone') {
            return 300;
        }
        else if (category == 'laptop') {
            return 800;
        }
        else if (category == 'tablet') {
            return 500;
        }
        else if (category == 'watch') {
            return 400;
        }
    }
};
ServiceService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)('ServiceOrder')),
    __param(1, (0, mongoose_1.InjectModel)('Notification')),
    __param(2, (0, mongoose_1.InjectModel)('Faq')),
    __param(3, (0, mongoose_1.InjectModel)('User')),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model])
], ServiceService);
exports.ServiceService = ServiceService;
//# sourceMappingURL=service.service.js.map