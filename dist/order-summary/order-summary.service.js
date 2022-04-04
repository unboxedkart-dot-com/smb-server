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
exports.OrderSummaryService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const order_model_1 = require("../models/order.model");
let OrderSummaryService = class OrderSummaryService {
    constructor(orderSummaryModel, userModel, productModel, couponModel) {
        this.orderSummaryModel = orderSummaryModel;
        this.userModel = userModel;
        this.productModel = productModel;
        this.couponModel = couponModel;
    }
    async getPayableAmount(userId) {
        const userDoc = await this.userModel.findById(userId, {
            orderSummary: 1,
            _id: 0,
        });
        const orderTotal = await this._calculateAmount(userDoc.orderSummary.orderItems);
        const getCouponDiscount = await this.couponModel.findOne({
            couponCode: userDoc.orderSummary.couponCode,
        });
        const payableAmount = orderTotal - getCouponDiscount.discountAmount;
        return payableAmount;
    }
    async _calculateAmount(orderItems) {
        let orderTotal = 0;
        for (const item of orderItems) {
            const price = await this._getSingleItemPrice(item.productId, item.productCount);
            orderTotal += price;
        }
        return orderTotal;
    }
    async _getSingleItemPrice(productId, productCount) {
        const product = await this.productModel.findById(productId);
        return product.pricing.sellingPrice * productCount;
    }
    async getOrderSummaryItems(userId) {
        const orderSummaryItemsData = [];
        const userDoc = await this.userModel.findById(userId);
        const orderSummaryItems = userDoc.orderSummary.orderItems;
        if (orderSummaryItems.length > 0) {
            for (const item of orderSummaryItems) {
                console.log('item od', item);
                const product = await this.productModel.findById(item.productId);
                console.log('single product', product);
                const newOrderSummaryItem = {
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
                orderSummaryItemsData.push(newOrderSummaryItem);
            }
            console.log('all', orderSummaryItemsData);
            console.log('all', orderSummaryItemsData);
        }
        return orderSummaryItemsData;
    }
    async createOrderSummaryItems(userId, entireBody) {
        const newOrderSummary = new this.orderSummaryModel({
            userId: userId,
            itemsCount: entireBody.orderItems.length,
            orderItems: entireBody.orderItems,
        });
        console.log('new', newOrderSummary);
        await this.userModel.findByIdAndUpdate(userId, {
            'orderSummary.orderItems': entireBody.orderItems,
        });
        newOrderSummary.save();
    }
    async addDeliveryAddress(userId, entireBody) {
        await this.userModel.findByIdAndUpdate(userId, {
            'orderSummary.deliveryType': order_model_1.DeliveryTypes.STORE_PICKUP,
            'orderSummary.deliveryAddress': {
                name: entireBody.name,
                phoneNumber: entireBody.phoneNumber,
                doorNo: entireBody.doorNo,
                street: entireBody.street,
                cityName: entireBody.cityName,
                landmark: entireBody.landmark,
                stateName: entireBody.stateName,
                pinCode: entireBody.pinCode,
                addressType: entireBody.addressType,
            },
        });
    }
    async addSelectedStoreDetails(userId, entireBody) {
        await this.userModel.findByIdAndUpdate(userId, {
            'orderSummary.deliveryType': order_model_1.DeliveryTypes.HOME_DELIVERY,
            'orderSummary.storeLocation': {
                storeName: entireBody.storeName,
                streetName: entireBody.streetName,
                cityName: entireBody.cityName,
                pinCode: entireBody.pinCode,
                directionsUrl: entireBody.directionsUrl,
                storeOpenDays: entireBody.storeOpenDays,
                storeTimings: entireBody.storeTimings,
                contactNumber: entireBody.contactNumber,
                alternateContactNumber: entireBody.alternateContactNumber,
            },
        });
    }
    async addCouponDetails(userId, entireBody) {
        await this.userModel.findByIdAndUpdate(userId, {
            'orderSummary.couponCode': 'SUNIL500',
        });
    }
};
OrderSummaryService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)('OrderSummary')),
    __param(1, (0, mongoose_1.InjectModel)('User')),
    __param(2, (0, mongoose_1.InjectModel)('Product')),
    __param(3, (0, mongoose_1.InjectModel)('Coupon')),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model])
], OrderSummaryService);
exports.OrderSummaryService = OrderSummaryService;
//# sourceMappingURL=order-summary.service.js.map