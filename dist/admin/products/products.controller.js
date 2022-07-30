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
const auth_service_1 = require("../../auth/auth.service");
const jwt_auth_guard_1 = require("../../auth/jwt-strategies/jwt-auth.guard");
const add_product_dto_1 = require("./dto/add-product.dto");
const products_service_1 = require("./products.service");
let ProductsController = class ProductsController {
    constructor(productsService, authService) {
        this.productsService = productsService;
        this.authService = authService;
    }
    async removeRatings() {
        await this.productsService.handleRemoveRating();
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
    async addProduct(request, entireBody) {
        const generatedId = await this.productsService.insertProduct(entireBody);
        return {
            data: {
                response: generatedId,
            },
        };
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
};
__decorate([
    (0, common_1.Patch)('remove-ratings'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "removeRatings", null);
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
    (0, common_1.Post)('/add'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, add_product_dto_1.CreateProductDto]),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "addProduct", null);
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
ProductsController = __decorate([
    (0, common_1.Controller)('products'),
    __param(1, (0, common_1.Inject)((0, common_1.forwardRef)(() => auth_service_1.AuthService))),
    __metadata("design:paramtypes", [products_service_1.ProductsService,
        auth_service_1.AuthService])
], ProductsController);
exports.ProductsController = ProductsController;
//# sourceMappingURL=products.controller.js.map