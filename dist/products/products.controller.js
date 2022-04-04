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
exports.ProductsController = void 0;
const common_1 = require("@nestjs/common");
const products_service_1 = require("./products.service");
let ProductsController = class ProductsController {
    constructor(productsService) {
        this.productsService = productsService;
    }
    async addProduct(entireBody) {
        const generatedId = await this.productsService.insertProduct(entireBody);
        return { id: generatedId };
    }
    async getProduct(q) {
        const product = await this.productsService.getProduct(q);
        return product;
    }
    async handleDeleteProducts() {
        await this.productsService.deleteProducts();
        return 'products deleted';
    }
    async handleDeleteProduct(id) {
        await this.productsService.deleteSingleProduct(id);
        return 'product deleted';
    }
    async handleGetBestSellers(brand, condition, category) {
        const products = await this.productsService.getBestSellers(brand, category, condition);
        console.log("DB URL", process.env.DB_CONNECTION_URL);
        return products;
    }
    async handleGetBestSellersByBrand() {
    }
    async handleGetBestSellersByCategory() {
    }
    async handleGetBestSellersByCondition() {
    }
    async handleGetFeaturedProducts(brand, condition, category) {
        const products = await this.productsService.getFeaturedProducts(brand, category, condition);
        return products;
    }
    async handleGetFeaturedProductsByBrand() {
    }
    async handleGetFeaturedProductsByCategory() {
    }
    async handleGetFeaturedProductsByCondition() {
    }
};
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "addProduct", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('q')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "getProduct", null);
__decorate([
    (0, common_1.Delete)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "handleDeleteProducts", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Body)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "handleDeleteProduct", null);
__decorate([
    (0, common_1.Get)('best-sellers'),
    __param(0, (0, common_1.Query)('brand')),
    __param(1, (0, common_1.Query)('condition')),
    __param(2, (0, common_1.Query)('category')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "handleGetBestSellers", null);
__decorate([
    (0, common_1.Get)('best-sellers/brand/:brand'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "handleGetBestSellersByBrand", null);
__decorate([
    (0, common_1.Get)('best-sellers/category/:category'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "handleGetBestSellersByCategory", null);
__decorate([
    (0, common_1.Get)('best-sellers/condition/:condition'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "handleGetBestSellersByCondition", null);
__decorate([
    (0, common_1.Get)('featured-products'),
    __param(0, (0, common_1.Query)('brand')),
    __param(1, (0, common_1.Query)('condition')),
    __param(2, (0, common_1.Query)('category')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "handleGetFeaturedProducts", null);
__decorate([
    (0, common_1.Get)('featured-products/brand/:brand'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "handleGetFeaturedProductsByBrand", null);
__decorate([
    (0, common_1.Get)('featured-products/category/:category'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "handleGetFeaturedProductsByCategory", null);
__decorate([
    (0, common_1.Get)('featured-products/condition/:condition'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "handleGetFeaturedProductsByCondition", null);
ProductsController = __decorate([
    (0, common_1.Controller)('products'),
    __metadata("design:paramtypes", [products_service_1.ProductsService])
], ProductsController);
exports.ProductsController = ProductsController;
//# sourceMappingURL=products.controller.js.map