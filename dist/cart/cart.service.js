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
exports.CartService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let CartService = class CartService {
    constructor(cartItemModel, userModel, productModel) {
        this.cartItemModel = cartItemModel;
        this.userModel = userModel;
        this.productModel = productModel;
    }
    async getCartItems(userId) {
        const cartItemsData = [];
        const userDoc = await this.userModel.findById(userId);
        const cartItems = userDoc.cartItems;
        const cartItemIds = userDoc.cartItemIds;
        console.log('cart item', cartItemIds);
        if (cartItemIds.length > 0) {
            for (const item of cartItems) {
                const product = await this.productModel.findById(item.productId);
                console.log('single product', product);
                const newCartItem = {
                    productId: item.productId,
                    productCount: item.productCount,
                    productDetails: {
                        title: product.title,
                        imageUrl: product.imageUrls.coverImage,
                        color: product.moreDetails.color,
                        brand: product.brand,
                        category: product.category,
                        condition: product.condition,
                    },
                    pricingDetails: {
                        sellingPrice: product.pricing.sellingPrice,
                        price: product.pricing.price,
                    },
                };
                cartItemsData.push(newCartItem);
            }
            console.log('all', cartItemsData);
            console.log('all', cartItemsData);
        }
        return cartItemsData;
    }
    async addCartItem(userId, productId) {
        const product = await this.productModel.findById(productId);
        if (product) {
            const cartItem = await this.cartItemModel.findOne({
                productId: productId,
                userId: userId,
            });
            if (!cartItem) {
                this._handleAddCartItem(userId, productId);
            }
            else {
                return 'already exists';
            }
        }
    }
    async updateCartItem(userId, productId, productCount) {
        console.log('count', productCount);
        await this.cartItemModel.findOneAndUpdate({ productId: { $eq: productId } }, { productCount: productCount });
        await this.userModel.updateOne({ _id: userId, 'cartItems.productId': productId }, {
            $set: { 'cartItems.$.productCount': productCount },
        });
    }
    async deleteCartItem(userId, productId) {
        await this.cartItemModel.findOneAndDelete({
            userId: userId,
            productId: productId,
        });
        await this.userModel.updateOne({ _id: userId }, {
            $pull: {
                cartItemIds: productId,
                cartItems: { productId: productId },
            },
        });
    }
    async _handleAddCartItem(userId, productId) {
        const newCartItem = new this.cartItemModel({
            userId: userId,
            productId: productId,
        });
        await newCartItem.save();
        await this.userModel.updateOne({ _id: userId }, {
            $push: { cartItemIds: productId, cartItems: newCartItem },
        });
    }
};
CartService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)('CartItem')),
    __param(1, (0, mongoose_1.InjectModel)('User')),
    __param(2, (0, mongoose_1.InjectModel)('Product')),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model])
], CartService);
exports.CartService = CartService;
//# sourceMappingURL=cart.service.js.map