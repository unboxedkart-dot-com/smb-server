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
exports.LocalInventoryController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const s3_service_1 = require("../s3/s3.service");
const add_product_dto_1 = require("./dto/add-product.dto");
const add_seller_dto_1 = require("./dto/add-seller.dto");
const sell_product_dto_1 = require("./dto/sell-product.dto");
const local_inventory_service_1 = require("./local-inventory.service");
let LocalInventoryController = class LocalInventoryController {
    constructor(localInventoryService, s3Service) {
        this.localInventoryService = localInventoryService;
        this.s3Service = s3Service;
    }
    async handleGetSearchedProducts(title, category, brand, serialNumber) {
        return await this.localInventoryService.getNewSearch(title, category, brand, serialNumber);
    }
    async addProduct(request, entireBody) {
        console.log('entire body', entireBody);
        const generatedId = await this.localInventoryService.addProduct(entireBody);
    }
    async sellProduct(request, entireBody) {
        console.log('seeling');
        await this.localInventoryService.sellProduct(entireBody);
    }
    async addVendor(request, entireBody) {
        return await this.localInventoryService.addVendor(entireBody);
    }
    async handleGetVendors() {
        return await this.localInventoryService.getVendors();
    }
    async handleGetCustomers() {
        return await this.localInventoryService.getCustomers();
    }
    async getOverview() { }
    async getSalesData() { }
    async getAvailableInventory(title, category, brand, serialNumber) {
        return this.localInventoryService.getAvailableInventory(title, category, brand, serialNumber);
    }
    async getSoldInventory(startDate, endDate) {
        console.log('getting sold inventory');
        return this.localInventoryService.getSoldInventory(startDate, endDate);
    }
    async getVendors() {
        return this.localInventoryService.getVendors();
    }
    async handleUploadPurchaseInvoice(file, request, Body) {
        console.log('uploading invoice', file, typeof file);
        const response = this.s3Service.uploadPurchaseInvoice(file);
        return response;
    }
    async handleUploadOriginalInvoice(file, request, Body) {
        console.log('uploading invoice', file, typeof file);
        const response = this.s3Service.uploadOriginalInvoice(file);
        return response;
    }
    async handleUploadSellerIdProof(file, request, Body) {
        console.log('uploading invoice', file, typeof file);
        const response = this.s3Service.uploadSellerIdProof(file);
        return response;
    }
    async getNotifications() {
        return this.localInventoryService.getNotifications();
    }
};
__decorate([
    (0, common_1.Get)('/search'),
    __param(0, (0, common_1.Query)('title')),
    __param(1, (0, common_1.Query)('category')),
    __param(2, (0, common_1.Query)('brand')),
    __param(3, (0, common_1.Query)('serialNumber')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, String]),
    __metadata("design:returntype", Promise)
], LocalInventoryController.prototype, "handleGetSearchedProducts", null);
__decorate([
    (0, common_1.Post)('/add-product'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, add_product_dto_1.AddProductDto]),
    __metadata("design:returntype", Promise)
], LocalInventoryController.prototype, "addProduct", null);
__decorate([
    (0, common_1.Patch)('/sell-product'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, sell_product_dto_1.SellProductDto]),
    __metadata("design:returntype", Promise)
], LocalInventoryController.prototype, "sellProduct", null);
__decorate([
    (0, common_1.Post)('/add-vendor'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, add_seller_dto_1.AddVendorDto]),
    __metadata("design:returntype", Promise)
], LocalInventoryController.prototype, "addVendor", null);
__decorate([
    (0, common_1.Get)('/get-vendors'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], LocalInventoryController.prototype, "handleGetVendors", null);
__decorate([
    (0, common_1.Get)('/get-customers'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], LocalInventoryController.prototype, "handleGetCustomers", null);
__decorate([
    (0, common_1.Get)('overview'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], LocalInventoryController.prototype, "getOverview", null);
__decorate([
    (0, common_1.Get)('/sales-data'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], LocalInventoryController.prototype, "getSalesData", null);
__decorate([
    (0, common_1.Get)('/available-inventory'),
    __param(0, (0, common_1.Query)('title')),
    __param(1, (0, common_1.Query)('category')),
    __param(2, (0, common_1.Query)('brand')),
    __param(3, (0, common_1.Query)('serialNumber')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, String]),
    __metadata("design:returntype", Promise)
], LocalInventoryController.prototype, "getAvailableInventory", null);
__decorate([
    (0, common_1.Get)('/sold-inventory'),
    __param(0, (0, common_1.Query)('startDate')),
    __param(1, (0, common_1.Query)('endDate')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], LocalInventoryController.prototype, "getSoldInventory", null);
__decorate([
    (0, common_1.Get)('/vendors'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], LocalInventoryController.prototype, "getVendors", null);
__decorate([
    (0, common_1.Post)('/upload-purchase-invoice'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file')),
    __param(0, (0, common_1.UploadedFile)()),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], LocalInventoryController.prototype, "handleUploadPurchaseInvoice", null);
__decorate([
    (0, common_1.Post)('/upload-original-invoice'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file')),
    __param(0, (0, common_1.UploadedFile)()),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], LocalInventoryController.prototype, "handleUploadOriginalInvoice", null);
__decorate([
    (0, common_1.Post)('/upload-seller-id-proof'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file')),
    __param(0, (0, common_1.UploadedFile)()),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], LocalInventoryController.prototype, "handleUploadSellerIdProof", null);
__decorate([
    (0, common_1.Get)('/get-notifications'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], LocalInventoryController.prototype, "getNotifications", null);
LocalInventoryController = __decorate([
    (0, common_1.Controller)('local-inventory'),
    __param(1, (0, common_1.Inject)((0, common_1.forwardRef)(() => s3_service_1.S3Service))),
    __metadata("design:paramtypes", [local_inventory_service_1.LocalInventoryService,
        s3_service_1.S3Service])
], LocalInventoryController);
exports.LocalInventoryController = LocalInventoryController;
//# sourceMappingURL=local-inventory.controller.js.map