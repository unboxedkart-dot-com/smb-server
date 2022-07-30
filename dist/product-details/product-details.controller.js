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
exports.ProductDetailsController = void 0;
const common_1 = require("@nestjs/common");
const product_details_service_1 = require("./product-details.service");
let ProductDetailsController = class ProductDetailsController {
    constructor(productDetailsService) {
        this.productDetailsService = productDetailsService;
    }
    async handleGetProductSpecs(productId) {
        const productSpecs = await this.productDetailsService.getProductSpecs(productId);
        return productSpecs;
    }
    async handleGetProductDescription(productId) {
        const productDescription = await this.productDetailsService.getProductDescription(productId);
        return productDescription;
    }
    async getAvailableProducts(brandCode, categoryCode) {
        const response = await this.productDetailsService.getAvailableProducts(brandCode, categoryCode);
        return response;
    }
    async handleGetProductVariants(productCode) {
        console.log('productCode to get variants', productCode);
        const response = await this.productDetailsService.getProductVariants(productCode);
        return response;
    }
};
__decorate([
    (0, common_1.Get)('/specs/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProductDetailsController.prototype, "handleGetProductSpecs", null);
__decorate([
    (0, common_1.Get)('/description/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProductDetailsController.prototype, "handleGetProductDescription", null);
__decorate([
    (0, common_1.Get)('/available-products'),
    __param(0, (0, common_1.Query)('brand-code')),
    __param(1, (0, common_1.Query)('category-code')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], ProductDetailsController.prototype, "getAvailableProducts", null);
__decorate([
    (0, common_1.Get)('/variants'),
    __param(0, (0, common_1.Query)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProductDetailsController.prototype, "handleGetProductVariants", null);
ProductDetailsController = __decorate([
    (0, common_1.Controller)('product-details'),
    __metadata("design:paramtypes", [product_details_service_1.ProductDetailsService])
], ProductDetailsController);
exports.ProductDetailsController = ProductDetailsController;
//# sourceMappingURL=product-details.controller.js.map