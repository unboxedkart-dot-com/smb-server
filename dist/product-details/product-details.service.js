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
exports.ProductDetailsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_decorators_1 = require("@nestjs/mongoose/dist/common/mongoose.decorators");
const mongoose_1 = require("mongoose");
let ProductDetailsService = class ProductDetailsService {
    constructor(productSpecsModel) {
        this.productSpecsModel = productSpecsModel;
    }
    async getProductSpecs(productId) {
        const response = await this.productSpecsModel.findOne({
            productId: productId,
        }, { _id: 0, productSpecs: 1 });
        return response['productSpecs'];
    }
    async addProductSpecs(entireBody) {
        console.log('adding specs', entireBody);
        const newProductSpecs = new this.productSpecsModel({
            productId: entireBody.productId,
            productCode: entireBody.productCode,
            productSpecs: entireBody.productSpecs,
        });
        newProductSpecs.save();
    }
};
ProductDetailsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_decorators_1.InjectModel)('ProductSpecs')),
    __metadata("design:paramtypes", [mongoose_1.Model])
], ProductDetailsService);
exports.ProductDetailsService = ProductDetailsService;
//# sourceMappingURL=product-details.service.js.map