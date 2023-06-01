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
exports.UsageTrackingControllerService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("mongoose");
const mongoose_2 = require("@nestjs/mongoose");
let UsageTrackingControllerService = class UsageTrackingControllerService {
    constructor(userModel, productModel, trackingNotificationModel, carouselItemModel) {
        this.userModel = userModel;
        this.productModel = productModel;
        this.trackingNotificationModel = trackingNotificationModel;
        this.carouselItemModel = carouselItemModel;
    }
    async getNotifications(type) {
        const notifications = await this.trackingNotificationModel
            .find({ type: type })
            .sort({ timestamp: -1 });
        console.log('notifications', notifications);
        return notifications;
    }
    async addSearchedItem(userId, data) {
        const userDoc = await this.userModel.findById(userId);
        const newNotification = new this.trackingNotificationModel({
            userId: userId,
            title: `Item Searched by ${userDoc.name}`,
            subtitle: data.searchTerm,
            type: 'searched-item',
        });
        newNotification.save();
    }
    async addClickedOnBuyNow(userId, data) {
        const userDoc = await this.userModel.findById(userId);
        const product = await this.productModel.findById(data.productId);
        const newNotification = new this.trackingNotificationModel({
            userId: userId,
            title: `${userDoc.name} (${userDoc.phoneNumber}) tried to purchase `,
            subtitle: product.title,
            content: `It was priced at ₹${product.pricing.sellingPrice} (₹${product.pricing.price})`,
            type: 'clicked-on-buy-now',
        });
        newNotification.save();
    }
    async addViewedProduct(userId, data) {
        const userDoc = await this.userModel.findById(userId);
        const product = await this.productModel.findById(data.productId);
        const newNotification = new this.trackingNotificationModel({
            userId: userId,
            title: `Item Viewed by ${userDoc.name} - ${userDoc.phoneNumber}`,
            subtitle: product.title,
            content: `It was priced at ₹${product.pricing.sellingPrice} (₹${product.pricing.price})`,
            type: 'viewed-item',
        });
        newNotification.save();
    }
    async addWishlistItem(userId, data) {
        const userDoc = await this.userModel.findById(userId);
        const product = await this.productModel.findById(data.productId);
        const newNotification = new this.trackingNotificationModel({
            userId: userId,
            title: `Item added to wishlist by ${userDoc.name} - ${userDoc.phoneNumber}`,
            subtitle: product.title,
            content: `It was priced at ₹${product.pricing.sellingPrice} (₹${product.pricing.price})`,
            type: 'wishlist-item',
        });
        newNotification.save();
    }
    async removeWishlistItem(userId, data) {
        const userDoc = await this.userModel.findById(userId);
        const product = await this.productModel.findById(data.productId);
        const newNotification = new this.trackingNotificationModel({
            userId: userId,
            title: `Item removed from wishlist by ${userDoc.name} - ${userDoc.phoneNumber}`,
            subtitle: product.title,
            content: `It was priced at ₹${product.pricing.sellingPrice} (₹${product.pricing.price})`,
            type: 'wishlist-item',
        });
        newNotification.save();
    }
    async addCartItem(userId, data) {
        const userDoc = await this.userModel.findById(userId);
        const product = await this.productModel.findById(data.productId);
        const newNotification = new this.trackingNotificationModel({
            userId: userId,
            title: `Item added to Cart by ${userDoc.name} - ${userDoc.phoneNumber}`,
            subtitle: product.title,
            productId: data.productId,
            content: `It was priced at ₹${product.pricing.sellingPrice} (₹${product.pricing.price})`,
            type: 'cart-item',
        });
        newNotification.save();
    }
    async removeCartItem(userId, data) {
        const userDoc = await this.userModel.findById(userId);
        const product = await this.productModel.findById(data.productId);
        const newNotification = new this.trackingNotificationModel({
            userId: userId,
            title: `Item removed from Cart by ${userDoc.name} - ${userDoc.phoneNumber}`,
            subtitle: product.title,
            content: `It was priced at ₹${product.pricing.sellingPrice} (₹${product.pricing.price})`,
            type: 'cart-item',
        });
        newNotification.save();
    }
    async addClickedOnCall(userId) {
        const userDoc = await this.userModel.findById(userId);
        const newNotification = new this.trackingNotificationModel({
            userId: userId,
            title: `${userDoc.name} - ${userDoc.phoneNumber} tried to call unboxedkart`,
            type: 'clicked-on-call',
        });
        newNotification.save();
    }
    async clickedOnNeedMoreDiscount(userId, data) {
        const userDoc = await this.userModel.findById(userId);
        const product = await this.productModel.findById(data.productId);
        const newNotification = new this.trackingNotificationModel({
            userId: userId,
            title: `${userDoc.name} - ${userDoc.phoneNumber} needs more discount`,
            subtitle: product.title,
            content: `It was priced at ₹${product.pricing.sellingPrice} (₹${product.pricing.price})`,
            type: 'clicked-on-need-more-discount',
        });
        newNotification.save();
    }
    async KnowMoreAboutUnboxedkart(userId) {
        const userDoc = await this.userModel.findById(userId);
        const newNotification = new this.trackingNotificationModel({
            userId: userId,
            title: `${userDoc.name} - ${userDoc.phoneNumber} wants to know more about unboxedkart`,
            type: 'know-more-about-unboxedkart',
        });
        newNotification.save();
    }
    async KnowMoreAboutStorePickup(userId) {
        const userDoc = await this.userModel.findById(userId);
        const newNotification = new this.trackingNotificationModel({
            userId: userId,
            title: `${userDoc.name} - ${userDoc.phoneNumber} wants to know more about unboxedkart's Store Pickup`,
            type: 'know-more-about-store-pickup',
        });
        newNotification.save();
    }
    async findStores(userId) {
        const userDoc = await this.userModel.findById(userId);
        const newNotification = new this.trackingNotificationModel({
            userId: userId,
            title: `${userDoc.name} - ${userDoc.phoneNumber} wants to find Unboxedkart's Stores`,
            type: 'find-stores',
        });
        newNotification.save();
    }
    async handleViewedCarouselItem(userId, carouselId) {
        const userDoc = await this.userModel.findById(userId);
        const carouselItem = await this.carouselItemModel.findById(carouselId);
        console.log(carouselItem);
        const newNotification = new this.trackingNotificationModel({
            userId: userId,
            title: `${userDoc.name} - ${userDoc.phoneNumber} viewed banners (${carouselItem.placement})`,
            subtitle: `${carouselItem.productCode}`,
            type: 'viewed-carousel-item',
        });
        newNotification.save();
    }
};
UsageTrackingControllerService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_2.InjectModel)('User')),
    __param(1, (0, mongoose_2.InjectModel)('Product')),
    __param(2, (0, mongoose_2.InjectModel)('TrackingNotification')),
    __param(3, (0, mongoose_2.InjectModel)('CarouselItem')),
    __metadata("design:paramtypes", [mongoose_1.Model,
        mongoose_1.Model,
        mongoose_1.Model,
        mongoose_1.Model])
], UsageTrackingControllerService);
exports.UsageTrackingControllerService = UsageTrackingControllerService;
//# sourceMappingURL=usage-tracking.service.js.map