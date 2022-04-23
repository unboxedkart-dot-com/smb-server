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
const Razorpay = require("razorpay");
const crypto_1 = require("crypto");
var instance = new Razorpay({
    key_id: 'rzp_live_Yf6SskMc0yCBdS',
    key_secret: 'GUt36OWEcQtKk1gZhmK0o5nM',
});
let OrderSummaryService = class OrderSummaryService {
    constructor(orderSummaryModel, userModel, productModel, couponModel) {
        this.orderSummaryModel = orderSummaryModel;
        this.userModel = userModel;
        this.productModel = productModel;
        this.couponModel = couponModel;
    }
    async getPayableAmount(userId) {
        const userDoc = await this.userModel.findById(userId);
        const orderTotal = await this._calculateAmount(userDoc.orderSummary.orderItems);
        const coupon = await this.couponModel.findOne({
            couponCode: userDoc.orderSummary.couponCode,
        });
        let payableAmount = orderTotal;
        if (coupon) {
            payableAmount = orderTotal - coupon.discountAmount;
        }
        const paymentOrderId = await this.createPaymentOrder(payableAmount);
        await this.userModel.findByIdAndUpdate(userId, {
            'orderSummary.paymentOrderId': paymentOrderId['id'],
        });
        return {
            payableAmount: payableAmount,
            orderId: paymentOrderId['id'],
            name: userDoc.name,
            email: userDoc.emailId,
            phoneNumber: userDoc.phoneNumber,
        };
    }
    async createPaymentOrder(payableAmount) {
        const order = await instance.orders.create({
            amount: 100,
            currency: 'INR',
            receipt: 'receipt#1',
        });
        return order;
    }
    async verifyPaymentSignature(userId, entireBody) {
        console.log('entrie body', entireBody);
        const userDoc = await this.userModel.findById(userId);
        const paymentOrderId = userDoc.orderSummary.paymentOrderId;
        console.log('payment order id', paymentOrderId);
        const generatedSignature = (0, crypto_1.createHmac)('sha256', 'GUt36OWEcQtKk1gZhmK0o5nM');
        const encodedSignature = generatedSignature
            .update(paymentOrderId + '|' + entireBody.paymentId + '')
            .digest('hex');
        console.log('generated sig', generatedSignature);
        console.log('encoded', encodedSignature);
        console.log('given sig', entireBody.paymentSignature);
        if (encodedSignature == entireBody.paymentSignature) {
            this.userModel.findByIdAndUpdate(userId, {
                'orderSummary.paymentId': entireBody.paymentId,
            });
            return {
                status: 'success',
                message: 'payment is verified',
            };
        }
        else {
            return {
                status: 'failed',
                message: 'payment is not verified',
            };
        }
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
        console.log('adding delivery address');
        const currentDate = new Date();
        const deliveryDate = new Date(currentDate.getTime() + 1000 * 60 * 60 * 24 * 5);
        var month = deliveryDate.getMonth() + 1;
        var day = deliveryDate.getDate();
        var year = deliveryDate.getFullYear();
        const deliveryDateInString = year + '/' + month + '/' + day;
        const user = await this.userModel.findByIdAndUpdate(userId, {
            'orderSummary.deliveryType': order_model_1.DeliveryTypes.HOME_DELIVERY,
            'orderSummary.shippingDetails': {
                deliveryAddress: {
                    userId: userId,
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
                deliveryDate: deliveryDate,
                deliveryDateInString: deliveryDateInString,
            },
        });
        console.log('address added', user);
    }
    async addSelectedStoreDetails(userId, entireBody) {
        console.log('adding store details', entireBody);
        console.log('userId', userId);
        const user = await this.userModel.findByIdAndUpdate(userId, {
            'orderSummary.deliveryType': order_model_1.DeliveryTypes.STORE_PICKUP,
            'orderSummary.pickUpDetails': {
                storeLocation: {
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
                pickUpTimeStart: entireBody.pickUpTimeStart,
                pickUpTimeEnd: entireBody.pickUpTimeEnd,
                pickUpDate: entireBody.pickUpDate,
                pickUpTimeInString: entireBody.pickUpTimeInString,
                pickUpDateInString: entireBody.pickUpDateInString,
            },
        });
        console.log('store location added', user);
    }
    async addCouponDetails(userId, couponCode) {
        const couponDetails = await this.couponModel.find({
            couponCode: couponCode,
        });
        await this.userModel.findByIdAndUpdate(userId, {
            'orderSummary.couponCode': couponCode,
        });
    }
    async updateCount(userId, entireBody) {
        const index = entireBody.productIndex;
        const doc = await this.userModel.findByIdAndUpdate(userId, {
            ['orderSummary.orderItems.' + index + '.productCount']: entireBody.updatedCount,
        });
        console.log('updated doc', doc);
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