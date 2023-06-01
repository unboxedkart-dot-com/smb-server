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
    constructor(userModel, productModel, storeTokenModel, enquiryModel, storeNotificationModel) {
        this.userModel = userModel;
        this.productModel = productModel;
        this.storeTokenModel = storeTokenModel;
        this.enquiryModel = enquiryModel;
        this.storeNotificationModel = storeNotificationModel;
    }
    async handleCreateToken(userId, body) {
        const userDoc = await this.userModel.findById(userId);
        const currentTime = Date.now();
        console.log(currentTime);
        if (body.productId != null) {
            const product = await this.productModel.findById(body.productId);
            const moreDetails = {
                colorCode: product.moreDetails.colorCode,
                color: product.moreDetails.color,
                storage: product.moreDetails.storage,
                storageCode: product.moreDetails.storageCode,
                connectivityCode: product.moreDetails.connectivityCode,
                connectivity: product.moreDetails.connectivity,
            };
            console.log('current product', product);
            const newToken = new this.storeTokenModel({
                userId: userId,
                name: userDoc.name,
                phoneNumber: userDoc.phoneNumber,
                moreDetails: moreDetails,
                productId: body.productId,
                tokenNumber: body.tokenNumber,
                categoryCode: product.categoryCode,
                category: product.category,
                brandCode: product.brandCode,
                brand: product.brand,
                productCode: product.productCode,
                productTitle: product.title,
                visitType: 'post-reservation',
                timestamp: currentTime,
            });
            newToken.save();
            const newStoreNotification = new this.storeNotificationModel({
                userId: userId,
                storeName: body.storeName,
                title: `${userDoc.name} (${userDoc.phoneNumber}) visited ${body.storeName} (online)`,
                subtitle: product.title,
                tokenNumber: newToken._id,
                categoryCode: product.categoryCode,
                brandCode: product.brandCode,
                productCode: product.productCode,
                productTitle: product.title,
                storageCode: product.moreDetails.storageCode,
                connectivityCode: product.moreDetails.connectivityCode,
                dateInString: 'ss',
                timestamp: currentTime,
                moreDetails: moreDetails,
            });
            newStoreNotification.save();
        }
        else {
            const moreDetails = {
                colorCode: body.colorCode,
                color: body.color,
                storage: body.storage,
                storageCode: body.storageCode,
                connectivityCode: body.connectivityCode,
                connectivity: body.connectivity,
            };
            const newToken = new this.storeTokenModel(Object.assign({ userId: userId, name: userDoc.name, phoneNumber: userDoc.phoneNumber, moreDetails: moreDetails, timestamp: 1682520068000 }, body));
            await newToken.save();
            const newStoreNotification = new this.storeNotificationModel({
                userId: userId,
                storeName: body.storeName,
                title: `${userDoc.name} (${userDoc.phoneNumber}) visited ${body.storeName} (walk-in)`,
                subtitle: body.productTitle,
                tokenNumber: newToken._id,
                categoryCode: body.categoryCode,
                brandCode: body.brandCode,
                productCode: body.productCode,
                productTitle: body.productTitle,
                storageCode: body.storageCode,
                connectivityCode: body.connectivityCode,
                dateInString: 'ss',
                timestamp: currentTime,
                moreDetails: moreDetails,
            });
            newStoreNotification.save();
        }
        return {
            'time in string': Date.now(),
            'time2': Date.now().toFixed,
            'time3': Date.now().toExponential,
            'time4': Date.now().toPrecision,
            'time5': Date.now().toLocaleString,
            'time6': Date.now().toString,
        };
    }
    async handleGetTokens(startDate, endDate) {
        console.log('ranghe');
        console.log(startDate);
        console.log(endDate);
        const tokens = await this.storeTokenModel.find({});
        return tokens;
    }
    async handleCreateEnquiry(userId, body) {
        const userDoc = await this.userModel.findById(userId);
        const currentTime = Date.now();
        console.log(currentTime);
        const moreDetails = {
            colorCode: body.colorCode,
            color: body.color,
            storage: body.storage,
            storageCode: body.storageCode,
            connectivityCode: body.connectivityCode,
            connectivity: body.connectivity,
        };
        const newToken = new this.storeTokenModel(Object.assign({ userId: userId, name: userDoc.name, phoneNumber: userDoc.phoneNumber, moreDetails: moreDetails, timestamp: 1682520068000 }, body));
        await newToken.save();
        const newStoreNotification = new this.storeNotificationModel({
            userId: userId,
            subtitle: body.productTitle,
            tokenNumber: newToken._id,
            categoryCode: body.categoryCode,
            brandCode: body.brandCode,
            productCode: body.productCode,
            productTitle: body.productTitle,
            storageCode: body.storageCode,
            connectivityCode: body.connectivityCode,
            dateInString: 'ss',
            timestamp: currentTime,
            moreDetails: moreDetails,
        });
        newStoreNotification.save();
        return {
            'time in string': Date.now(),
            'time2': Date.now().toFixed,
            'time3': Date.now().toExponential,
            'time4': Date.now().toPrecision,
            'time5': Date.now().toLocaleString,
            'time6': Date.now().toString,
        };
    }
};
StoreTokenService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)('User')),
    __param(1, (0, mongoose_1.InjectModel)('Product')),
    __param(2, (0, mongoose_1.InjectModel)('StoreToken')),
    __param(3, (0, mongoose_1.InjectModel)('StoreNotification')),
    __param(3, (0, mongoose_1.InjectModel)('StoreToken')),
    __param(4, (0, mongoose_1.InjectModel)('StoreNotification')),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model])
], StoreTokenService);
exports.StoreTokenService = StoreTokenService;
//# sourceMappingURL=store-token.service.js.map