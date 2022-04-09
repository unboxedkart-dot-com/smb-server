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
exports.StoreLocationService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let StoreLocationService = class StoreLocationService {
    constructor(storeLocationModel) {
        this.storeLocationModel = storeLocationModel;
    }
    async getStoreLocations() {
        const locations = await this.storeLocationModel.find({});
        return locations;
    }
    async addStoreLocation(userId, entireBody) {
        const newLocation = new this.storeLocationModel({
            storeName: entireBody.storeName,
            streetName: entireBody.streetName,
            cityName: entireBody.cityName,
            pinCode: entireBody.pinCode,
            directionsUrl: entireBody.directionsUrl,
            storeTimings: entireBody.storeTimings,
            storeOpenDays: entireBody.storeOpenDays,
            contactNumber: entireBody.contactNumber,
            alternateContactNumber: entireBody.alternateContactNumber,
        });
        newLocation.save();
    }
};
StoreLocationService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)('StoreLocation')),
    __metadata("design:paramtypes", [mongoose_2.Model])
], StoreLocationService);
exports.StoreLocationService = StoreLocationService;
//# sourceMappingURL=store-location.service.js.map