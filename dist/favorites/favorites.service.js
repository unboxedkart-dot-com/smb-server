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
exports.FavoritesService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const mongoose_3 = require("mongoose");
let FavoritesService = class FavoritesService {
    constructor(favoriteModel, userModel, productModel, trackingNotificationModel) {
        this.favoriteModel = favoriteModel;
        this.userModel = userModel;
        this.productModel = productModel;
        this.trackingNotificationModel = trackingNotificationModel;
    }
    async getFavorites(userId) {
        const userDoc = await this.userModel.findOne({ _id: userId }).exec();
        const ObjectId = mongoose_2.default.Types.ObjectId;
        const favorites = userDoc.favoriteItemIds;
        const favoritesIds = [];
        favorites.forEach((doc) => favoritesIds.push(new ObjectId(doc)));
        console.log('getting favorites');
        if (favorites.length > 0) {
            console.log('fav', favorites);
            const products = await this.productModel.aggregate([
                {
                    $match: { _id: { $in: favoritesIds } },
                },
                {
                    $lookup: {
                        from: 'reviewsdatas',
                        localField: 'productCode',
                        foreignField: 'productCode',
                        as: 'rating',
                    },
                },
            ]);
            console.log(products);
            return products;
        }
        else {
            return [];
        }
    }
    async addFavorite(userId, productId) {
        const favorite = await this.favoriteModel.findOne({
            productId: productId,
            userId: userId,
        });
        if (!favorite) {
            const newFavorite = new this.favoriteModel({
                userId: userId,
                productId: productId,
            });
            await newFavorite.save();
            await this.userModel.updateOne({ _id: userId }, {
                $push: { favoriteItemIds: productId },
            });
            const userData = await this.userModel.findById(userId);
            const productData = await this.productModel.findById(productId);
            const newNotification = new this.trackingNotificationModel({
                userId: userId,
                title: `Favorite Added by ${userData.name} - ${userData.phoneNumber}`,
                subtitle: `${productData.title}`,
                content: `It was priced at ₹${productData.pricing.sellingPrice} (₹${productData.pricing.price})`,
                type: 'wishlist-item',
            });
            newNotification.save();
            console.log(userData);
        }
        else {
            return 'already exists';
        }
    }
    async deleteFavorite(userId, productId) {
        if (mongoose_2.default.isValidObjectId(productId)) {
            console.log('deleting fav');
            await this.favoriteModel.findOneAndDelete({
                userId: userId,
                productId: productId,
            });
            console.log('deleting fav 2');
            const user = await this.userModel.findByIdAndUpdate(userId, {
                $pull: { favoriteItemIds: productId },
            });
            const productData = await this.productModel.findById(productId);
            const newNotification = new this.trackingNotificationModel({
                userId: user.id,
                title: `Favorite Added by ${user.name} - ${user.phoneNumber}`,
                subtitle: `${productData.title}`,
                content: `It was priced at ₹${productData.pricing.sellingPrice} (₹${productData.pricing.price})`,
                type: 'wishlist-item',
            });
            newNotification.save();
            return {
                status: 'success',
                message: 'item deleted',
            };
        }
        else {
            throw new common_1.NotFoundException('could not find product');
        }
    }
};
FavoritesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)('Favorite')),
    __param(1, (0, mongoose_1.InjectModel)('User')),
    __param(2, (0, mongoose_1.InjectModel)('Product')),
    __param(3, (0, mongoose_1.InjectModel)('TrackingNotification')),
    __metadata("design:paramtypes", [mongoose_3.Model,
        mongoose_3.Model,
        mongoose_3.Model,
        mongoose_3.Model])
], FavoritesService);
exports.FavoritesService = FavoritesService;
//# sourceMappingURL=favorites.service.js.map