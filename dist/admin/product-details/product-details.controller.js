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
    async handleSetProductSpecs(entireBody) {
        console.log('adding individual sepcs');
        const response = await this.productDetailsService.addProductSpecs(entireBody);
    }
    async modifyProductData() {
        await this.productDetailsService.addSeriesCodeToProductData();
    }
    async addProductData(request, entireBody) {
        const response = await this.productDetailsService.addProductData(entireBody);
        return response;
    }
    async handleAddProductImages(entireBody) {
        const response = await this.productDetailsService.addProductImages(entireBody);
        return response;
    }
    async handleAddManySpecs() {
        const response = await this.productDetailsService.addMultipleProductSpecs();
        return response;
    }
};
__decorate([
    (0, common_1.Post)('/specs'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_product_details_dto_1.CreateProductDetailsDto]),
    __metadata("design:returntype", Promise)
], ProductDetailsController.prototype, "handleSetProductSpecs", null);
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
    (0, common_1.Post)('/images'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [add_product_images_dto_1.AddProductImagesDto]),
    __metadata("design:returntype", Promise)
], ProductDetailsController.prototype, "handleAddProductImages", null);
__decorate([
    (0, common_1.Post)('/add-many-specs'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ProductDetailsController.prototype, "handleAddManySpecs", null);
ProductDetailsController = __decorate([
    (0, common_1.Controller)('product-details'),
    __metadata("design:paramtypes", [product_details_service_1.ProductDetailsService])
], ProductDetailsController);
exports.ProductDetailsController = ProductDetailsController;
//# sourceMappingURL=product-details.controller.js.map