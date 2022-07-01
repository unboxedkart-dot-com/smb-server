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
const crypto_1 = require("crypto");
const mongoose_2 = require("mongoose");
const Razorpay = require("razorpay");
const coupons_service_1 = require("../coupons/coupons.service");
const order_model_1 = require("../models/order.model");
const orders_service_1 = require("../orders/orders.service");
var instance = new Razorpay({
    key_id: 'rzp_live_Yf6SskMc0yCBdS',
    key_secret: 'GUt36OWEcQtKk1gZhmK0o5nM',
});
let OrderSummaryService = class OrderSummaryService {
    constructor(orderSummaryModel, userModel, paymentModel, productModel, couponModel, ordersService, couponService) {
        this.orderSummaryModel = orderSummaryModel;
        this.userModel = userModel;
        this.paymentModel = paymentModel;
        this.productModel = productModel;
        this.couponModel = couponModel;
        this.ordersService = ordersService;
        this.couponService = couponService;
    }
    async getPayableAmount(userId) {
        console.log('getting payable amount');
        const userDoc = await this.userModel.findById(userId);
        const orderTotal = await this._calculateAmount(userDoc.orderSummary.orderItems);
        let payableAmount = orderTotal;
        if (userDoc.orderSummary.couponCode != null) {
            const couponCode = userDoc.orderSummary.couponCode;
            const couponResults = await this.couponService.validateCoupon(userId, couponCode);
            if (couponResults['isValid']) {
                console.log('coupon is valid');
                payableAmount =
                    orderTotal - couponResults['couponDetails']['discountAmount'];
                console.log('coupon is valid', payableAmount);
            }
        }
        const orderNumber = this._generateOrderNumber();
        const paymentOrderId = await this.createPaymentOrder(payableAmount, orderNumber);
        const partialPaymentOrderId = await this.createPaymentOrder(2000, orderNumber);
        await this.userModel.findByIdAndUpdate(userId, {
            'orderSummary.orderNumber': orderNumber,
            'orderSummary.paymentAmount': payableAmount,
            'orderSummary.paymentOrderId': paymentOrderId['id'],
            'orderSummary.partialPaymentOrderId': partialPaymentOrderId['id'],
            'orderSummary.partialPaymentAmount': payableAmount,
        });
        return {
            payableAmount: payableAmount,
            paymentOrderId: paymentOrderId['id'],
            partialPaymentOrderId: partialPaymentOrderId['id'],
            partialPaymentAmount: 2000,
            name: userDoc.name,
            email: userDoc.emailId,
            phoneNumber: userDoc.phoneNumber,
        };
    }
    async getPartialPaymentAmount(userId) {
        const userDoc = await this.userModel.findById(userId);
        let payableAmount = 2000;
        const orderNumber = this._generateOrderNumber();
        const paymentOrderId = await this.createPaymentOrder(payableAmount, orderNumber);
        await this.userModel.findByIdAndUpdate(userId, {
            'orderSummary.partialPaymentOrderId': paymentOrderId['id'],
        });
        return {
            payableAmount: payableAmount,
            orderId: paymentOrderId['id'],
            name: userDoc.name,
            email: userDoc.emailId,
            phoneNumber: userDoc.phoneNumber,
        };
    }
    async createPaymentOrder(payableAmount, orderNumber) {
        const order = await instance.orders.create({
            amount: payableAmount * 100,
            currency: 'INR',
            receipt: orderNumber,
        });
        return order;
    }
    async addPaymentMethod(userId, paymentMethod) {
        console.log('adding payment method', paymentMethod, userId);
        const updatedDoc = await this.userModel.findByIdAndUpdate(userId, {
            'orderSummary.paymentMethod': paymentMethod == 'cod'
                ? order_model_1.PaymentMethods.CASH_ON_DELIVERY
                : order_model_1.PaymentMethods.PAY_AT_STORE,
            'orderSummary.paymentType': order_model_1.PaymentTypes.NULL,
        });
        console.log('updated Doc', updatedDoc);
        const order = await this.ordersService.createOrder(userId);
        console.log('order postpaid', order);
        return {
            status: 'success',
            message: 'payment is verified',
            orderNumber: updatedDoc.orderSummary.orderNumber,
        };
    }
    async verifyPaymentSignature(userId, entireBody) {
        console.log('entrie body', entireBody);
        console.log('verifying full ', entireBody);
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
            console.log('full verifed');
            console.log(entireBody, paymentOrderId);
            const newPayment = new this.paymentModel({
                userId: userId,
                orderNumber: userDoc.orderSummary.orderNumber,
                gateway: 'razorpay',
                status: 'verified',
                paymentOrderId: entireBody.orderId,
                paymentId: entireBody.paymentId,
                paymentType: 'pas-d',
                paymentMethod: 'razorpay',
                amount: userDoc.orderSummary.paymentAmount,
            });
            newPayment.save();
            await this.userModel.findByIdAndUpdate(userId, {
                'orderSummary.paymentMethod': order_model_1.PaymentMethods.PREPAID,
                'orderSummary.paymentType': order_model_1.PaymentTypes.FULL,
                'orderSummary.paymentId': entireBody.paymentId,
            });
            await this.ordersService.createOrder(userDoc._id.toString());
            return {
                status: 'success',
                message: 'payment is verified',
                orderNumber: userDoc.orderSummary.orderNumber,
            };
        }
        else {
            return {
                status: 'failed',
                message: 'payment is not verified',
            };
        }
    }
    async verifyPartialPaymentSignature(userId, entireBody) {
        console.log('verifying partial ', entireBody);
        const userDoc = await this.userModel.findById(userId);
        const paymentOrderId = userDoc.orderSummary.partialPaymentOrderId;
        console.log('payment order id', paymentOrderId);
        const generatedSignature = (0, crypto_1.createHmac)('sha256', 'GUt36OWEcQtKk1gZhmK0o5nM');
        const encodedSignature = generatedSignature
            .update(paymentOrderId + '|' + entireBody.paymentId + '')
            .digest('hex');
        console.log('generated sig', generatedSignature);
        console.log('encoded', encodedSignature);
        console.log('given sig', entireBody.paymentSignature);
        if (encodedSignature == entireBody.paymentSignature) {
            const orderNumber = this._generateOrderNumber();
            console.log('partial verifed');
            console.log('order summary done');
            const newPayment = new this.paymentModel({
                userId: userId,
                orderNumber: userDoc.orderSummary.orderNumber,
                gateway: 'razorpay',
                status: 'verified',
                paymentOrderId: entireBody.orderId,
                paymentId: entireBody.paymentId,
                paymentType: 'pas-d',
                paymentMethod: 'razorpay',
                amount: userDoc.orderSummary.partialPaymentAmount,
            });
            newPayment.save();
            console.log('new payment done');
            await this.userModel.findByIdAndUpdate(userId, {
                'orderSummary.paymentMethod': userDoc.orderSummary.deliveryType == 'STORE PICKUP'
                    ? order_model_1.PaymentMethods.PAY_AT_STORE_DUE
                    : order_model_1.PaymentMethods.CASH_ON_DELIVERY_DUE,
                'orderSummary.paymentType': order_model_1.PaymentTypes.PARTIAL,
                'orderSummary.partialPaymentId': entireBody.paymentId,
            });
            await this.ordersService.createOrder(userDoc._id.toString());
            console.log('new order done');
            return {
                status: 'success',
                message: 'payment is verified',
                orderNumber: userDoc.orderSummary.orderNumber,
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
            orderSummary: {
                orderItems: entireBody.orderItems,
            },
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
        const user = await this.userModel.findById(userId);
        const orderSummary = user.orderSummary;
        const cartValue = await this._calculateCartValue(orderSummary.orderItems);
        const coupon = await this.couponModel.findOne({
            couponCode: couponCode,
        });
        if (coupon) {
            if (coupon.isActive &&
                cartValue >= coupon.minimumOrderTotal &&
                coupon.couponDetails.userId != userId) {
                console.log('cart total', cartValue);
                await this.userModel.findByIdAndUpdate(userId, {
                    'orderSummary.couponCode': couponCode,
                });
            }
        }
    }
    async updateCount(userId, entireBody) {
        const index = entireBody.productIndex;
        const doc = await this.userModel.findByIdAndUpdate(userId, {
            ['orderSummary.orderItems.' + index + '.productCount']: entireBody.updatedCount,
        });
        await this.orderSummaryModel.findOneAndUpdate({ userId: userId, isActive: true }, {
            ['orderSummary.orderItems.' + index + '.productCount']: entireBody.updatedCount,
        });
        console.log('updated doc', doc);
    }
    _generateOrderNumber() {
        const orderCode = 'OD';
        const randomNumber = Math.floor(10000000000000 + Math.random() * 90000000000000);
        const orderNumber = orderCode + randomNumber.toString();
        return orderNumber;
    }
    async _calculateCartValue(orderItems) {
        let cartValue = 0;
        for (const item of orderItems) {
            const product = await this.productModel.findById(item.productId);
            const price = item.productCount * product.pricing.sellingPrice;
            cartValue += price;
        }
        console.log('cartvalue', cartValue);
        return cartValue;
    }
};
OrderSummaryService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)('OrderSummary')),
    __param(1, (0, mongoose_1.InjectModel)('User')),
    __param(2, (0, mongoose_1.InjectModel)('Payment')),
    __param(3, (0, mongoose_1.InjectModel)('Product')),
    __param(4, (0, mongoose_1.InjectModel)('Coupon')),
    __param(5, (0, common_1.Inject)((0, common_1.forwardRef)(() => orders_service_1.OrdersService))),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        orders_service_1.OrdersService,
        coupons_service_1.CouponsService])
], OrderSummaryService);
exports.OrderSummaryService = OrderSummaryService;
//# sourceMappingURL=order-summary.service.js.map