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
exports.AddressesService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let AddressesService = class AddressesService {
    constructor(addressModel) {
        this.addressModel = addressModel;
    }
    async getAddresses(userId) {
        const addresses = await this.addressModel
            .find({ userId: { $eq: userId } })
            .exec();
        return addresses;
    }
    async createAddress(address, userId) {
        const newAddress = new this.addressModel(Object.assign({ userId: userId }, address));
        await newAddress.save();
    }
    async updateAddress(address) {
        const result = await this.addressModel.updateOne({ _id: address.addressId }, { $set: address });
        return result;
    }
    async deleteAddress(id) {
        if (mongoose_2.default.isValidObjectId(id)) {
            const result = await this.addressModel.findByIdAndDelete(id);
            return result;
        }
        else {
            throw new common_1.NotFoundException('could not find address');
        }
    }
};
AddressesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)('Address')),
    __metadata("design:paramtypes", [mongoose_2.Model])
], AddressesService);
exports.AddressesService = AddressesService;
//# sourceMappingURL=addresses.service.js.map