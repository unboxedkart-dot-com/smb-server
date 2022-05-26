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
const add_product_data_dto_1 = require("./dto/add-product-data.dto");
const add_product_images_dto_1 = require("./dto/add-product-images.dto");
const create_product_details_dto_1 = require("./dto/create-product-details.dto");
const product_details_service_1 = require("./product-details.service");
let ProductDetailsController = class ProductDetailsController {
    constructor(productDetailsService) {
        this.productDetailsService = productDetailsService;
    }
    async handleAddMany() {
        await this.productDetailsService.addMoreProductData();
    }
    async handleGetProductSpecs(productId) {
        const productSpecs = await this.productDetailsService.getProductSpecs(productId);
        return productSpecs;
    }
    async handleGetProductDescription(productId) {
        const productDescription = await this.productDetailsService.getProductDescription(productId);
        return productDescription;
    }
    async handleSetProductSpecs(entireBody) {
        const response = await this.productDetailsService.addProductSpecs(entireBody);
    }
    async addSomething() {
        const response = await this.productDetailsService.addSomething();
    }
    async modifyProductData() {
        await this.productDetailsService.addSeriesCodeToProductData();
    }
    async addProductData(request, entireBody) {
        const response = await this.productDetailsService.addProductData(entireBody);
        return response;
    }
    async getAvailableProducts(brandCode, categoryCode) {
        const response = await this.productDetailsService.getAvailableProducts(brandCode, categoryCode);
        return response;
    }
    async handleAddProductImages(entireBody) {
        const response = await this.productDetailsService.addProductImages(entireBody);
        return response;
    }
    async handleGetProductVariants(productCode) {
        console.log('productCode to get variants', productCode);
        const response = await this.productDetailsService.getProductVariants(productCode);
        return response;
    }
};
__decorate([
    (0, common_1.Post)('add-many'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ProductDetailsController.prototype, "handleAddMany", null);
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
    (0, common_1.Post)('/specs'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_product_details_dto_1.CreateProductDetailsDto]),
    __metadata("design:returntype", Promise)
], ProductDetailsController.prototype, "handleSetProductSpecs", null);
__decorate([
    (0, common_1.Post)('some'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ProductDetailsController.prototype, "addSomething", null);
__decorate([
    (0, common_1.Patch)('modify-product-data'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ProductDetailsController.prototype, "modifyProductData", null);
__decorate([
    (0, common_1.Post)('/data'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, add_product_data_dto_1.AddProductDataDto]),
    __metadata("design:returntype", Promise)
], ProductDetailsController.prototype, "addProductData", null);
__decorate([
    (0, common_1.Get)('/available-products'),
    __param(0, (0, common_1.Query)('brand-code')),
    __param(1, (0, common_1.Query)('category-code')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], ProductDetailsController.prototype, "getAvailableProducts", null);
__decorate([
    (0, common_1.Post)('/images'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [add_product_images_dto_1.AddProductImagesDto]),
    __metadata("design:returntype", Promise)
], ProductDetailsController.prototype, "handleAddProductImages", null);
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