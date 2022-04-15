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
exports.OrdersService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const order_model_1 = require("../models/order.model");
const mongoose_2 = require("mongoose");
const axios_1 = require("axios");
let OrdersService = class OrdersService {
    constructor(orderModel, productModel, couponModel, orderItemModel, userModel, reviewModel) {
        this.orderModel = orderModel;
        this.productModel = productModel;
        this.couponModel = couponModel;
        this.orderItemModel = orderItemModel;
        this.userModel = userModel;
        this.reviewModel = reviewModel;
    }
    async deleteAll() {
        await this.orderItemModel.deleteMany();
        await this.orderModel.deleteMany();
    }
    async createOrder(entireBody, userId) {
        console.log('userid', userId);
        const userDoc = await this.userModel.findById(userId);
        console.log('id is', userDoc.phoneNumber);
        const orderSummary = userDoc.orderSummary;
        const orderNumber = this._generateOrderNumber();
        console.log('user doc', userDoc);
        const orderItemDetails = await this._generateOrderItemDetails(orderSummary.orderItems);
        console.log('orderitemdetails', orderItemDetails.orderTotal);
        var payableAmount = orderItemDetails.orderTotal;
        var couponDiscount = 0;
        if (orderSummary.couponCode != null) {
            couponDiscount = await this._getCouponDiscount(orderSummary.couponCode, orderItemDetails.orderTotal);
            console.log('paybale amount', payableAmount);
            console.log('c amount', payableAmount);
            payableAmount = payableAmount - couponDiscount;
        }
        console.log('paybale amount', payableAmount);
        const newOrder = new this.orderModel({
            userId: userId,
            orderNumber: orderNumber,
            deliveryType: 0,
            paymentDetails: {
                paymentType: entireBody.paymentType,
                paymentId: userDoc.orderSummary.paymentId,
                billTotal: orderItemDetails.orderTotal,
                payableTotal: payableAmount,
                couponCode: orderSummary.couponCode,
                couponDiscount: couponDiscount,
            },
            itemsCount: orderItemDetails.orderItemsCount,
            orderItems: orderItemDetails.orderItems,
        });
        newOrder.save();
        const url = 'https://api.msg91.com/api/v5/flow';
        let order = orderItemDetails.orderItems[0].productDetails.title.substring(0, 27) +
            '...';
        if (orderItemDetails.orderItemsCount > 1) {
            order =
                orderItemDetails.orderItems[0].productDetails.title.substring(0, 18) +
                    '...' +
                    '+' +
                    `${orderItemDetails.orderItemsCount - 1} ${orderItemDetails.orderItemsCount > 2 ? 'items' : 'item'}`;
        }
        console.log('order message', order);
        console.log('count', order.length);
        const postBody = {
            flow_id: process.env.ORDER_PLACED_FLOW_ID,
            sender: process.env.ORDER_SMS_SENDER_ID,
            mobiles: '91' + userDoc.phoneNumber,
            order: order,
            authkey: process.env.SMS_AUTH_KEY,
        };
        await axios_1.default.post(url, postBody);
        await this._handleSaveIndividualOrders({
            paymentType: entireBody.paymentType,
            deliveryType: orderSummary.deliveryType,
            storeLocation: orderSummary.storeLocation,
            itemsCount: orderItemDetails.orderItemsCount,
            orderData: orderItemDetails.orderItems,
            orderNumber: orderNumber,
            deliveryAddress: orderSummary.deliveryAddress,
            couponCode: orderSummary.couponCode,
            couponDiscount: couponDiscount,
        });
        return {
            orderNumber: orderNumber,
            orderDate: Date.now(),
            selectedPickUpDate: Date.now(),
            paymentType: order_model_1.paymentTypes.PAY_AT_STORE,
            deliveryType: orderSummary.deliveryType,
            selectedAddress: orderSummary.deliveryAddress,
            selectedStore: orderSummary.storeLocation,
            orderItems: orderItemDetails,
        };
    }
    async getOrderItems(userId) {
        const orderItems = await this.orderItemModel.find({
            userId: { $eq: userId },
        });
        console.log('orderrrrr', orderItems);
        return orderItems;
    }
    async getOrderItem(userId, orderItemId) {
        var orderItem = await this.orderItemModel.findById(orderItemId);
        if (orderItem) {
            const review = await this.reviewModel.findOne({
                userId: userId,
                productId: orderItem.orderDetails.productId,
            });
            if (review) {
                return {
                    status: 'success',
                    message: 'order data received',
                    data: {
                        orderItem: orderItem,
                        reviewData: review,
                    },
                };
            }
            else {
                return {
                    status: 'success',
                    message: 'order data received',
                    data: {
                        orderItem: orderItem,
                        review: null,
                    },
                };
            }
        }
    }
    _generateOrderNumber() {
        const orderCode = 'OD';
        const randomNumber = Math.floor(10000000000000 + Math.random() * 90000000000000);
        const orderNumber = orderCode + randomNumber.toString();
        return orderNumber;
    }
    async _getCouponDiscount(couponCode, orderTotal) {
        const coupon = await this.couponModel.findOne({ couponCode: couponCode });
        console.log('coupon', coupon);
        if (coupon && orderTotal >= coupon.minimumOrderTotal) {
            console.log('coupon', coupon);
            return coupon.discountAmount;
        }
        return 0;
    }
    async _validateCouponCode(couponCode, orderTotal) {
        console.log('coupon validating', couponCode);
        if (couponCode != undefined) {
            const coupon = await this.couponModel.findOne({ couponCode: couponCode });
            if (coupon && orderTotal >= coupon.minimumOrderTotal) {
                console.log('coupon exists', coupon);
                const payableAmount = orderTotal - coupon.discountAmount;
                console.log('payable amount', payableAmount);
                return {
                    couponDiscount: coupon.discountAmount,
                    payableAmount: payableAmount,
                };
            }
        }
        else {
            return {
                couponDiscount: 0,
                payableAmount: orderTotal,
            };
        }
    }
    async _generateOrderItemDetails(orderItemsList) {
        const orderItems = [];
        let orderTotal = 0;
        for (const item of orderItemsList) {
            const orderItem = await this._generateSingleOrderItemDetails(item.productId, item.productCount);
            orderTotal += orderItem.total;
            orderItems.push(orderItem);
        }
        return {
            orderItemsCount: orderItems.length,
            orderItems: orderItems,
            orderTotal: orderTotal,
        };
    }
    async _generateSingleOrderItemDetails(productId, count) {
        const product = await this.productModel.findById(productId);
        const newOrderItem = {
            productId: productId,
            pricePerItem: product.pricing.sellingPrice,
            productCount: count,
            total: product.pricing.sellingPrice * count,
            productDetails: {
                imageUrl: product.imageUrls.coverImage,
                title: product.title,
                color: product.moreDetails.color,
                condition: product.condition,
                brand: product.brand,
                category: product.category,
            },
        };
        return newOrderItem;
    }
    async _handleSaveIndividualOrders(params) {
        for (const order of params.orderData) {
            console.log(params.couponCode);
            const payableAmount = params.couponDiscount != null
                ? parseInt((order.total - params.couponDiscount / params.itemsCount).toFixed(0))
                : order.total;
            const newOrderItem = new this.orderItemModel({
                orderNumber: params.orderNumber,
                shippingDetails: {
                    deliveryAddress: params.deliveryAddress,
                },
                pickUpDetails: {
                    storeLocation: params.storeLocation,
                },
                paymentDetails: {
                    paymentType: params.paymentType,
                },
                deliveryType: params.deliveryType,
                pricingDetails: {
                    billTotal: order.total,
                    payableTotal: payableAmount,
                    couponCode: params.couponCode,
                    couponDiscount: params.couponDiscount,
                },
                productDetails: {
                    imageUrl: order.productDetails.imageUrl,
                    title: order.productDetails.title,
                    color: order.productDetails.color,
                    condition: order.productDetails.condition,
                    brand: order.productDetails.brand,
                    category: order.productDetails.category,
                },
                orderDetails: {
                    productId: order.productId,
                    pricePerItem: order.pricePerItem,
                    productCount: order.productCount,
                },
            });
            newOrderItem.save();
        }
    }
    async createPaymentOrder() {
    }
    async validatePaymentSignature() {
    }
};
OrdersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)('Order')),
    __param(1, (0, mongoose_1.InjectModel)('Product')),
    __param(2, (0, mongoose_1.InjectModel)('Coupon')),
    __param(3, (0, mongoose_1.InjectModel)('OrderItem')),
    __param(4, (0, mongoose_1.InjectModel)('User')),
    __param(5, (0, mongoose_1.InjectModel)('Review')),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model])
], OrdersService);
exports.OrdersService = OrdersService;
//# sourceMappingURL=orders.service.js.map