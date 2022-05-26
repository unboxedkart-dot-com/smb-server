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
const auth_service_1 = require("../auth/auth.service");
const jwt_auth_guard_1 = require("../auth/jwt-strategies/jwt-auth.guard");
const add_product_dto_1 = require("./dto/add-product.dto");
const products_service_1 = require("./products.service");
let ProductsController = class ProductsController {
    constructor(productsService, authService) {
        this.productsService = productsService;
        this.authService = authService;
    }
    async addProduct(request, entireBody) {
        const generatedId = await this.productsService.insertProduct(entireBody);
        return {
            data: {
                response: generatedId,
            },
        };
    }
    async addManyProducts() {
    }
    async getProduct(q) {
        const product = await this.productsService.getProduct(q);
        return product;
    }
    async getSelectedVariant(product, condition, storage, color, processor, combination, ram, screenSize) {
        const response = await this.productsService.getSelectedVariant(product, condition, storage, color, processor, ram, combination, screenSize);
        console.log('getting variant product', product);
        return response;
    }
    async handleDeleteProducts() {
        await this.productsService.deleteProducts();
        return 'products deleted';
    }
    async handleUpdateInventoryCount(count, request, productId) {
        const userId = request.user.userId;
        const isAdmin = await this.authService.CheckIfAdmin(userId);
        if (!isAdmin) {
            await this.productsService.updateInventoryCount({ productId, count });
            return {
                statusCode: 200,
                message: 'product inventory count is updated',
            };
        }
        else {
            throw new common_1.ForbiddenException('you are not allowed to perform this action');
        }
    }
    async handleDeleteProduct(id, request) {
        const userId = request.user.userId;
        const isAdmin = await this.authService.CheckIfAdmin(userId);
        if (isAdmin) {
            await this.productsService.deleteSingleProduct(id);
        }
        else {
            throw new common_1.ForbiddenException('You are not allowed to perform this action');
        }
    }
    async handleGetSimilarProducts(productId) {
        const products = await this.productsService.getSimilarProducts(productId);
        return products;
    }
    async handleGetRelatedProducts(productId) {
        const products = await this.productsService.getRelatedProducts(productId);
        return products;
    }
    async handleGetBestSellers(brand, condition, category) {
        const products = await this.productsService.getBestSellers(brand, category, condition);
        return products;
    }
    async handleGetFeaturedProducts(brand, condition, category) {
        const products = await this.productsService.getFeaturedProducts(brand, category, condition);
        return products;
    }
};
__decorate([
    (0, common_1.Post)('/add'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, add_product_dto_1.CreateProductDto]),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "addProduct", null);
__decorate([
    (0, common_1.Post)('/add-many'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "addManyProducts", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('q')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "getProduct", null);
__decorate([
    (0, common_1.Get)('/variant'),
    __param(0, (0, common_1.Query)('product')),
    __param(1, (0, common_1.Query)('condition')),
    __param(2, (0, common_1.Query)('storage')),
    __param(3, (0, common_1.Query)('color')),
    __param(4, (0, common_1.Query)('processor')),
    __param(5, (0, common_1.Query)('combination')),
    __param(6, (0, common_1.Query)('ram')),
    __param(7, (0, common_1.Query)('screenSize')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, String, String, String, String, String]),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "getSelectedVariant", null);
__decorate([
    (0, common_1.Delete)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "handleDeleteProducts", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Patch)('/update-count/:id'),
    __param(0, (0, common_1.Body)('count')),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object, String]),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "handleUpdateInventoryCount", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Body)('id')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "handleDeleteProduct", null);
__decorate([
    (0, common_1.Get)('/similar-products/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "handleGetSimilarProducts", null);
__decorate([
    (0, common_1.Get)('/related-products/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "handleGetRelatedProducts", null);
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
    (0, common_1.Get)('featured-products'),
    __param(0, (0, common_1.Query)('brand')),
    __param(1, (0, common_1.Query)('condition')),
    __param(2, (0, common_1.Query)('category')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "handleGetFeaturedProducts", null);
ProductsController = __decorate([
    (0, common_1.Controller)('products'),
    __param(1, (0, common_1.Inject)((0, common_1.forwardRef)(() => auth_service_1.AuthService))),
    __metadata("design:paramtypes", [products_service_1.ProductsService,
        auth_service_1.AuthService])
], ProductsController);
exports.ProductsController = ProductsController;
//# sourceMappingURL=products.controller.js.map