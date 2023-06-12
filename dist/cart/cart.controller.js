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
exports.CartController = void 0;
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("../auth/jwt-strategies/jwt-auth.guard");
const cart_service_1 = require("./cart.service");
const add_cart_item_dto_1 = require("./dto/add-cart-item.dto");
const update_cart_item_dto_1 = require("./dto/update-cart-item.dto");
let CartController = class CartController {
    constructor(cartService) {
        this.cartService = cartService;
    }
    async handleGetCartItems(request) {
        const userId = request.user.userId;
        console.log('getting cart items', userId);
        const result = await this.cartService.getCartItems(userId);
        return result;
    }
    async handleGetSaveLaterProducts(request) {
        const userId = request.user.userId;
        const result = await this.cartService.getSavedLaterProducts(userId);
        return result;
    }
    async handleAddCartItem(entireBody, request) {
        const userId = request.user.userId;
        const result = await this.cartService.addCartItem(userId, entireBody.productId);
        return result;
    }
    async handleAddProductToSaveLater(entireBody, request) {
        console.log('adding product to savelayer');
        const userId = request.user.userId;
        const result = await this.cartService.addSavedToLater(userId, entireBody.productId);
        return result;
    }
    async handleUpdateCartItem(entireBody, request) {
        const userId = request.user.userId;
        const result = await this.cartService.updateCartItem(userId, entireBody.productId, entireBody.productCount);
        return result;
    }
    async handleDeleteCartItem(request, productId) {
        const userId = request.user.userId;
        const result = await this.cartService.deleteCartItem(userId, productId);
        return result;
    }
    async handleRemoveProductFromSaveLater(request, productId) {
        const userId = request.user.userId;
        const result = await this.cartService.removeProductFromSaveLater(userId, productId);
        return result;
    }
};
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CartController.prototype, "handleGetCartItems", null);
__decorate([
    (0, common_1.Get)('/save-later'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CartController.prototype, "handleGetSaveLaterProducts", null);
__decorate([
    (0, common_1.Post)('add'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [add_cart_item_dto_1.AddCartItemDto, Object]),
    __metadata("design:returntype", Promise)
], CartController.prototype, "handleAddCartItem", null);
__decorate([
    (0, common_1.Post)('/save-later/add'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [add_cart_item_dto_1.AddCartItemDto, Object]),
    __metadata("design:returntype", Promise)
], CartController.prototype, "handleAddProductToSaveLater", null);
__decorate([
    (0, common_1.Patch)('update'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_cart_item_dto_1.UpdateCartItemDto, Object]),
    __metadata("design:returntype", Promise)
], CartController.prototype, "handleUpdateCartItem", null);
__decorate([
    (0, common_1.Delete)('delete/:id'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], CartController.prototype, "handleDeleteCartItem", null);
__decorate([
    (0, common_1.Delete)('/save-later/delete/:id'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], CartController.prototype, "handleRemoveProductFromSaveLater", null);
CartController = __decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Controller)('cart'),
    __metadata("design:paramtypes", [cart_service_1.CartService])
], CartController);
exports.CartController = CartController;
//# sourceMappingURL=cart.controller.js.map