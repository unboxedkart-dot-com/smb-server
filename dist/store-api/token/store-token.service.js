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
exports.StoreTokenService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let StoreTokenService = class StoreTokenService {
    constructor(userModel, storeTokenModel, storeNotificationModel) {
        this.userModel = userModel;
        this.storeTokenModel = storeTokenModel;
        this.storeNotificationModel = storeNotificationModel;
    }
    async getAllOrders(status) { }
    async handleCreateToken(userId, body) {
        const newToken = new this.storeTokenModel(Object.assign({ userId: userId }, body));
        await newToken.save();
        const userDoc = await this.userModel.findById(userId);
        const newStoreNotification = new this.storeNotificationModel({
            userId: userId,
            title: `${userDoc.name} (${userDoc.phoneNumber}) visited ${body.storeName}`,
            subtitle: body.productTitle,
            tokenNumber: newToken._id,
            categoryCode: body.categoryCode,
            brandCode: body.brandCode,
            productCode: body.productCode,
            processorCode: body.processorCode,
            storageCode: body.storageCode,
            connectivityCode: body.connectivityCode,
            dateInString: "",
        });
        newStoreNotification.save();
        return "token added";
    }
};
StoreTokenService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)('User')),
    __param(1, (0, mongoose_1.InjectModel)('StoreToken')),
    __param(2, (0, mongoose_1.InjectModel)('StoreNotification')),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model])
], StoreTokenService);
exports.StoreTokenService = StoreTokenService;
//# sourceMappingURL=store-token.service.js.map