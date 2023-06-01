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
exports.UsageTrackingController = void 0;
const common_1 = require("@nestjs/common");
const auth_service_1 = require("../auth/auth.service");
const jwt_auth_guard_1 = require("../auth/jwt-strategies/jwt-auth.guard");
const add_cart_item_dto_1 = require("./dtos/add-cart-item.dto");
const add_searched_term_dto_1 = require("./dtos/add-searched-term.dto");
const add_viewed_product_dto_1 = require("./dtos/add-viewed-product.dto");
const add_wishlist_item_dto_1 = require("./dtos/add-wishlist-item.dto");
const clicked_on_buy_now_dto_1 = require("./dtos/clicked-on-buy-now.dto");
const clicked_on_need_more_discount_dto_1 = require("./dtos/clicked-on-need-more-discount.dto");
const remove_cart_item_dto_1 = require("./dtos/remove-cart-item.dto");
const remove_wishlist_item_dto_1 = require("./dtos/remove-wishlist-item.dto");
const usage_tracking_service_1 = require("./usage-tracking.service");
let UsageTrackingController = class UsageTrackingController {
    constructor(usageTrackingService, authService) {
        this.usageTrackingService = usageTrackingService;
        this.authService = authService;
    }
    async handleGetNotifications(request, type) {
        return this.usageTrackingService.getNotifications(type);
    }
    async handleAddSearchedItem(request, entireBody) {
        const userId = request.user.userId;
        return this.usageTrackingService.addSearchedItem(userId, entireBody);
    }
    async handleAddViewedProduct(request, entireBody) {
        console.log('adding viewed product');
        console.log(entireBody);
        const userId = request.user.userId;
        return this.usageTrackingService.addViewedProduct(userId, entireBody);
    }
    async handleAddClickedOnBuyNow(request, entireBody) {
        console.log('trying to do something');
        const userId = request.user.userId;
        return this.usageTrackingService.addClickedOnBuyNow(userId, entireBody);
    }
    async handleAddWishlistItem(request, entireBody) {
        const userId = request.user.userId;
        return this.usageTrackingService.addWishlistItem(userId, entireBody);
    }
    async handleAddCartItem(request, entireBody) {
        const userId = request.user.userId;
        return this.usageTrackingService.addCartItem(userId, entireBody);
    }
    async handleRemoveCartItem(request, entireBody) {
        const userId = request.user.userId;
        return this.usageTrackingService.removeCartItem(userId, entireBody);
    }
    async handleWishlistCartItem(request, entireBody) {
        const userId = request.user.userId;
        return this.usageTrackingService.removeWishlistItem(userId, entireBody);
    }
    async handleAddClickedToCall(request) {
        const userId = request.user.userId;
        return this.usageTrackingService.addClickedOnCall(userId);
        ('');
    }
    async handleClickedOnNeedMoreDiscount(request, entireBody) {
        const userId = request.user.userId;
        return this.usageTrackingService.clickedOnNeedMoreDiscount(userId, entireBody);
    }
    async handleKnowMoreAboutUnboxedkart(request) {
        const userId = request.user.userId;
        return this.usageTrackingService.KnowMoreAboutUnboxedkart(userId);
    }
    async handleKnowMoreAboutStorePickup(request) {
        const userId = request.user.userId;
        return this.usageTrackingService.KnowMoreAboutStorePickup(userId);
    }
    async KnowMoreAboutStores(request) {
        const userId = request.user.userId;
        return this.usageTrackingService.findStores(userId);
    }
    async viewCarouselItem(carouselId, request) {
        const userId = request.user.userId;
        console.log('trying to add carousel', carouselId);
        return this.usageTrackingService.handleViewedCarouselItem(userId, carouselId);
    }
};
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Query)('type')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], UsageTrackingController.prototype, "handleGetNotifications", null);
__decorate([
    (0, common_1.Post)('/searched-item'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, add_searched_term_dto_1.AddSearchedTermDto]),
    __metadata("design:returntype", Promise)
], UsageTrackingController.prototype, "handleAddSearchedItem", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)('/viewed-product'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, add_viewed_product_dto_1.AddViewedProductDto]),
    __metadata("design:returntype", Promise)
], UsageTrackingController.prototype, "handleAddViewedProduct", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)('/clicked-on-buy-now'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, clicked_on_buy_now_dto_1.ClickedOnBuyNowDto]),
    __metadata("design:returntype", Promise)
], UsageTrackingController.prototype, "handleAddClickedOnBuyNow", null);
__decorate([
    (0, common_1.Post)('/add-wishlist-item'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, add_wishlist_item_dto_1.AddWishlistItemDto]),
    __metadata("design:returntype", Promise)
], UsageTrackingController.prototype, "handleAddWishlistItem", null);
__decorate([
    (0, common_1.Post)('/add-cart-item'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, add_cart_item_dto_1.AddCartItemDto]),
    __metadata("design:returntype", Promise)
], UsageTrackingController.prototype, "handleAddCartItem", null);
__decorate([
    (0, common_1.Post)('/remove-cart-item'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, remove_cart_item_dto_1.RemoveCartItemDto]),
    __metadata("design:returntype", Promise)
], UsageTrackingController.prototype, "handleRemoveCartItem", null);
__decorate([
    (0, common_1.Post)('/remove-wishlist-item'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, remove_wishlist_item_dto_1.RemoveWishlistItemDto]),
    __metadata("design:returntype", Promise)
], UsageTrackingController.prototype, "handleWishlistCartItem", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)('/clicked-to-call'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UsageTrackingController.prototype, "handleAddClickedToCall", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)('/clicked-on-need-more-discount'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, clicked_on_need_more_discount_dto_1.clickedOnNeedMoreDiscountDto]),
    __metadata("design:returntype", Promise)
], UsageTrackingController.prototype, "handleClickedOnNeedMoreDiscount", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)('/know-more-about-unboxedkart'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UsageTrackingController.prototype, "handleKnowMoreAboutUnboxedkart", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)('/know-more-about-store-pickup'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UsageTrackingController.prototype, "handleKnowMoreAboutStorePickup", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)('/find-stores'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UsageTrackingController.prototype, "KnowMoreAboutStores", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)('/view-carousel'),
    __param(0, (0, common_1.Body)('carouselId')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], UsageTrackingController.prototype, "viewCarouselItem", null);
UsageTrackingController = __decorate([
    (0, common_1.Controller)('usage-tracking'),
    __param(1, (0, common_1.Inject)((0, common_1.forwardRef)(() => auth_service_1.AuthService))),
    __metadata("design:paramtypes", [usage_tracking_service_1.UsageTrackingControllerService,
        auth_service_1.AuthService])
], UsageTrackingController);
exports.UsageTrackingController = UsageTrackingController;
//# sourceMappingURL=usage-tracking.controller.js.map