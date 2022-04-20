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
const SendGrid = require("@sendgrid/mail");
const axios_1 = require("axios");
const mongoose_2 = require("mongoose");
const order_model_1 = require("../models/order.model");
let OrdersService = class OrdersService {
    constructor(orderModel, productModel, couponModel, orderItemModel, userModel, reviewModel, referralModel) {
        this.orderModel = orderModel;
        this.productModel = productModel;
        this.couponModel = couponModel;
        this.orderItemModel = orderItemModel;
        this.userModel = userModel;
        this.reviewModel = reviewModel;
        this.referralModel = referralModel;
        SendGrid.setApiKey(process.env.MAIL_API_KEY);
    }
    async deleteAll() {
        await this.orderItemModel.deleteMany();
        await this.orderModel.deleteMany();
    }
    async createOrder(entireBody, userId) {
        console.log('given userid', userId);
        console.log('userid', userId);
        const userDoc = await this.userModel.findById(userId);
        console.log(userDoc);
        console.log('id is', userDoc.phoneNumber);
        const orderSummary = userDoc.orderSummary;
        const orderNumber = this._generateOrderNumber();
        console.log('user doc', userDoc);
        const orderItemDetails = await this._generateOrderItemDetails(orderSummary.orderItems);
        console.log('orderitemdetails', orderItemDetails.orderTotal);
        var payableAmount = orderItemDetails.orderTotal;
        var couponDiscount = 0;
        if (orderSummary.couponCode != null) {
            couponDiscount = await this._getCouponDiscount(userDoc._id.toString(), userDoc.name, orderNumber, orderSummary.couponCode, orderItemDetails.orderTotal);
            console.log('paybale amount', payableAmount);
            console.log('c amount', payableAmount);
            payableAmount = payableAmount - couponDiscount;
        }
        console.log('paybale amount', payableAmount);
        const newOrder = new this.orderModel({
            userId: userId,
            userDetails: {
                name: userDoc.name,
                emailId: userDoc.emailId,
                phoneNumber: userDoc.phoneNumber,
            },
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
        this._handleSendOrderPlacedMessage(userDoc, orderItemDetails.orderItems);
        this._handleSendOrderPlacedMail(userDoc, orderItemDetails.orderItems);
        await this._handleSaveIndividualOrders(userDoc, {
            paymentType: entireBody.paymentType,
            deliveryType: orderSummary.deliveryType,
            itemsCount: orderItemDetails.orderItemsCount,
            orderData: orderItemDetails.orderItems,
            orderNumber: orderNumber,
            shippingDetails: {
                shipDate: orderSummary.shippingDetails.shipDate,
                deliveryAddress: orderSummary.shippingDetails.deliveryAddress,
                deliveryDate: orderSummary.shippingDetails.deliveryDate,
                deliveryDateInString: orderSummary.shippingDetails.deliveryDateInString,
            },
            pickUpDetails: {
                pickUpDate: orderSummary.pickUpDetails.pickUpDate,
                storeLocation: orderSummary.pickUpDetails.storeLocation,
                pickUpTimeStart: orderSummary.pickUpDetails.pickUpTimeStart,
                pickUpTimeEnd: orderSummary.pickUpDetails.pickUpTimeEnd,
                pickUpTimeInString: orderSummary.pickUpDetails.pickUpTimeInString,
                pickUpDateInString: orderSummary.pickUpDetails.pickUpDateInString,
            },
            couponCode: orderSummary.couponCode,
            couponDiscount: couponDiscount,
        });
        return {
            orderNumber: orderNumber,
            orderDate: Date.now(),
            selectedPickUpDate: Date.now(),
            deliveryDate: orderSummary.shippingDetails.deliveryDateInString,
            pickUpDateInString: orderSummary.pickUpDetails.pickUpDateInString,
            pickUpTimeInString: orderSummary.pickUpDetails.pickUpTimeInString,
            paymentType: order_model_1.paymentTypes.PAY_AT_STORE,
            deliveryType: orderSummary.deliveryType,
            selectedAddress: orderSummary.shippingDetails.deliveryAddress,
            selectedStore: orderSummary.pickUpDetails.storeLocation,
            orderItems: orderItemDetails,
        };
    }
    async acceptOrder(userId, orderItemId) {
        const order = await this.orderItemModel.findByIdAndUpdate(orderItemId, {
            orderStatus: order_model_1.OrderStatuses.ACCEPTED,
        });
        this._handleSendOrderConfirmedMessage(order);
        this._handleSendOrderConfirmedMail(order);
    }
    async orderReadyForPickUp(userId, orderItemId) {
        const order = await this.orderItemModel.findByIdAndUpdate(orderItemId, {
            orderStatus: order_model_1.OrderStatuses.READY_FOR_PICKUP,
        });
        this._handleSendOutForPickUpMessage(order);
        this._handleSendOutForPickUpMail(order);
    }
    async orderShipped(userId, orderItemId) {
        const order = await this.orderItemModel.findByIdAndUpdate(orderItemId, {
            orderStatus: order_model_1.OrderStatuses.SHIPPED,
        });
        this._handleSendOrderShippedMessage(order);
        this._handleSendOrderShippedMail(order);
    }
    async orderOutForDelivery(userId, orderItemId) {
        const order = await this.orderItemModel.findByIdAndUpdate(orderItemId, {
            orderStatus: order_model_1.OrderStatuses.OUT_FOR_DELIVERY,
        });
        this._handleSendOutForPickUpMessage(order);
        this._handleSendOutForPickUpMail(order);
    }
    async orderDelivered(userId, orderItemId) {
        const order = await this.orderItemModel.findByIdAndUpdate(orderItemId, {
            orderStatus: order_model_1.OrderStatuses.DELIVERED,
        });
        this._handleSendOrderDeliveredMessage(order);
        this._handleSendOrderDeliveredMail(order);
    }
    async getOrderItems(userId) {
        console.log('order user id', userId);
        const orderItems = await this.orderItemModel.find({
            userId: userId,
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
            console.log('currentorderreview', review);
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
    async _getCouponDiscount(userId, userName, orderNumber, couponCode, orderTotal) {
        const coupon = await this.couponModel
            .findOne({ couponCode: couponCode })
            .select('+couponDetails.userId');
        console.log('coupon', coupon);
        if (coupon && orderTotal >= coupon.minimumOrderTotal) {
            const newReferral = new this.referralModel({
                orderNumber: orderNumber,
                couponCode: coupon.couponCode,
                referrerDetails: {
                    userId: coupon.couponDetails.userId,
                    phoneNumber: coupon.couponDetails.phoneNumber,
                    userName: coupon.couponDetails.userName,
                    userEmail: coupon.couponDetails.userEmail,
                },
                refereeId: userId,
                cashBackDetails: {
                    cashBackAmount: '500',
                },
                discountDetails: {
                    discountAmount: coupon.discountAmount,
                },
            });
            newReferral.save();
            console.log('starting referral message');
            await this._handleSendReferralOrderPlaceMessage(userName, coupon.couponDetails.phoneNumber);
            console.log('starting referral mail');
            await this._handleSendReferralOrderPlaceMail(userName, coupon.couponDetails.userEmail);
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
    async _handleSaveIndividualOrders(userDoc, params) {
        for (const order of params.orderData) {
            console.log(params.couponCode);
            const payableAmount = params.couponDiscount != null
                ? parseInt((order.total - params.couponDiscount / params.itemsCount).toFixed(0))
                : order.total;
            const newOrderItem = new this.orderItemModel({
                userId: userDoc._id,
                orderNumber: params.orderNumber,
                shippingDetails: {
                    deliveryAddress: params.shippingDetails.deliveryAddress,
                    deliveryDate: params.shippingDetails.deliveryDate,
                    deliveryDateInString: params.shippingDetails.deliveryDateInString,
                },
                userDetails: {
                    emailId: userDoc.emailId,
                    phoneNumber: userDoc.phoneNumber,
                    userName: userDoc.name,
                },
                pickUpDetails: {
                    pickUpDate: params.pickUpDetails.pickUpDate,
                    pickUpTimeStart: params.pickUpDetails.pickUpTimeStart,
                    pickUpTimeEnd: params.pickUpDetails.pickUpTimeEnd,
                    pickUpTimeInString: params.pickUpDetails.pickUpTimeInString,
                    pickUpDateInString: params.pickUpDetails.pickUpDateInString,
                    storeLocation: params.pickUpDetails.storeLocation,
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
    async _handleSendOrderPlacedMessage(userDoc, orderItems) {
        console.log('sending order message');
        const url = 'https://api.msg91.com/api/v5/flow';
        let order = orderItems[0].productDetails.title.substring(0, 27) + '...';
        if (orderItems.count > 1) {
            order =
                orderItems[0].productDetails.title.substring(0, 18) +
                    '...' +
                    '+' +
                    `${orderItems.count - 1} ${orderItems.count > 2 ? 'items' : 'item'}`;
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
        console.log('udd', userDoc._id);
        console.log('91' + userDoc.phoneNumber);
        await axios_1.default.post(url, postBody);
    }
    async _handleSendOrderPlacedMail(userDoc, orderItems) {
        console.log('sending order mail', orderItems);
        let order = orderItems[0].productDetails.title;
        if (orderItems.count > 1) {
            order =
                orderItems[0].productDetails.title +
                    '+' +
                    `${orderItems.count - 1} ${orderItems.count > 2 ? 'items' : 'item'}`;
        }
        const msg = {
            to: userDoc.emailId,
            from: 'info@unboxedkart.com',
            templateId: process.env.ORDER_PLACED_TEMPLATE_ID,
            dynamic_template_data: {
                order: order,
                name: userDoc.name,
            },
        };
        const transport = await SendGrid.send(msg)
            .then(() => console.log('email send'))
            .catch((e) => console.log('email error', e));
        return transport;
    }
    async _handleSendReferralOrderPlaceMessage(name, phoneNumber) {
        console.log('sending referral message');
        const url = 'https://api.msg91.com/api/v5/flow';
        const postBody = {
            flow_id: process.env.REFERRAL_ORDER_FLOW_ID,
            sender: process.env.ORDER_SMS_SENDER_ID,
            mobiles: '91' + phoneNumber,
            name: name,
            authkey: process.env.SMS_AUTH_KEY,
        };
        console.log('91' + phoneNumber);
        await axios_1.default.post(url, postBody);
    }
    async _handleSendReferralOrderPlaceMail(userName, emailId) {
        const msg = {
            to: emailId,
            from: 'info@unboxedkart.com',
            templateId: process.env.REFERRAL_ORDER_TEMPLATE_ID,
            dynamic_template_data: {
                name: userName,
            },
        };
        const transport = await SendGrid.send(msg)
            .then(() => console.log('email send'))
            .catch((e) => console.log('email error', e));
        return transport;
    }
    async _handleSendOrderConfirmedMessage(order) {
        if (order.deliveryType == 'STORE PICKUP') {
            const url = process.env.SMS_FLOW_URL;
            const postBody = {
                flow_id: process.env.PICKUP_ORDER_CONFIRMED_FLOW_ID,
                sender: process.env.ORDER_SMS_SENDER_ID,
                mobiles: '91' + order.userDetails.phoneNumber,
                authkey: process.env.SMS_AUTH_KEY,
                order: order.productDetails.title.substring(0, 25) + '...',
                orderid: order.orderNumber,
                pickupdate: order.pickUpDetails.pickUpDateInString,
            };
            await axios_1.default.post(url, postBody);
        }
        else if (order.deliveryType == 'HOME DELIVERY') {
            const url = process.env.SMS_FLOW_URL;
            const postBody = {
                flow_id: process.env.DELIVERY_ORDER_CONFIRMED_FLOW_ID,
                sender: process.env.ORDER_SMS_SENDER_ID,
                mobiles: '91' + order.userDetails.phoneNumber,
                authkey: process.env.SMS_AUTH_KEY,
                order: order.productDetails.title.substring(0, 25) + '...',
                orderid: order.orderNumber,
                deliverydate: order.shippingDetails.deliveryDateInString,
            };
            await axios_1.default.post(url, postBody);
        }
    }
    async _handleSendOrderConfirmedMail(order) {
        if (order.deliveryType == 'STORE PICKUP') {
            const msg = {
                to: order.userDetails.emailId,
                from: 'info@unboxedkart.com',
                templateId: process.env.PICKUP_ORDER_CONFIRMED_TEMPLATE_ID,
                dynamic_template_data: {
                    name: order.userDetails.name,
                    order: order.orderDetails.title,
                    orderId: order.orderNumber,
                    pickupdate: order.pickUpDetails.pickUpDateInString,
                },
            };
            const transport = await SendGrid.send(msg)
                .then(() => console.log('email send', 'confirmed'))
                .catch((e) => console.log('email error', e));
            return transport;
        }
        else if (order.deliveryType == 'HOME DELIVERY') {
            const msg = {
                to: order.userDetails.emailId,
                from: 'info@unboxedkart.com',
                templateId: process.env.DELIVERY_ORDER_CONFIRMED_TEMPLATE_ID,
                dynamic_template_data: {
                    name: order.userDetails.name,
                    order: order.orderDetails.title,
                    orderId: order.orderNumber,
                    deliverydate: order.shippingDetails.deliveryDateInString,
                },
            };
            const transport = await SendGrid.send(msg)
                .then(() => console.log('email send'))
                .catch((e) => console.log('email error', e));
            return transport;
        }
    }
    async _handleSendOutForPickUpMail(order) {
        const msg = {
            to: order.userDetails.emailId,
            from: 'info@unboxedkart.com',
            templateId: process.env.PICKUP_ORDER_READY_FOR_PICKUP,
            dynamic_template_data: {
                name: order.userDetails.userName,
                order: order.orderDetails.productTitle,
                orderId: order.orderNumber,
                pickupdate: order.pickUpDetails.pickUpDateInString,
                pickuptime: order.pickUpDetails.pickUpTimeInString,
                pickupstore: order.pickUpDetails.storeLocation.storeName,
                otp: '123456',
                directions: order.pickUpDetails.storeLocation.directions,
            },
        };
        const transport = await SendGrid.send(msg)
            .then(() => console.log('email send'))
            .catch((e) => console.log('email error', e));
        return transport;
    }
    async _handleSendOutForPickUpMessage(order) {
        const url = process.env.SMS_FLOW_URL;
        const postBody = {
            flow_id: process.env.PICKUP_ORDER_READY_FOR_PICKUP_FLOW_ID,
            sender: process.env.ORDER_SMS_SENDER_ID,
            mobiles: '91' + order.userDetails.phoneNumber,
            authkey: process.env.SMS_AUTH_KEY,
            order: order.productDetails.title.substring(0, 25) + '...',
            orderid: order.orderNumber,
            pickupdate: order.pickUpDetails.pickUpDateInString,
            pickuptime: order.pickUpDetails.pickUpTimeInString,
            pickupstore: order.pickUpDetails.storeLocation.storeName,
            otp: '123456',
            directions: order.pickUpDetails.storeLocation.directions,
        };
        await axios_1.default.post(url, postBody);
    }
    async _handleSendOrderShippedMessage(order) {
        const url = process.env.SMS_FLOW_URL;
        const postBody = {
            flow_id: process.env.DELIVERY_ORDER_SHIPPED_FLOW_ID,
            sender: process.env.ORDER_SMS_SENDER_ID,
            mobiles: '91' + order.userDetails.phoneNumber,
            authkey: process.env.SMS_AUTH_KEY,
            order: order.productDetails.title.substring(0, 25) + '...',
            orderid: order.orderNumber,
            deliverydate: order.shippingDetails.deliveryDate,
        };
        await axios_1.default.post(url, postBody);
    }
    async _handleSendOrderShippedMail(order) {
        const msg = {
            to: order.userDetails.emailId,
            from: 'info@unboxedkart.com',
            templateId: process.env.DELIVERY_ORDER_SHIPPED_TEMPLATE_ID,
            dynamic_template_data: {
                name: order.userDetails.userName,
                order: order.productDetails.title,
                orderid: order.orderNumber,
                deliverydate: order.shippingDetails.deliveryDate,
            },
        };
        const transport = await SendGrid.send(msg)
            .then(() => console.log('email send'))
            .catch((e) => console.log('email error', e));
        return transport;
    }
    async _handleSendOutForDeliveryMessage(order) {
        const url = process.env.SMS_FLOW_URL;
        const postBody = {
            flow_id: process.env.DELIVERY_ORDER_OUT_FOR_DELIVERY_FLOW_ID,
            sender: process.env.ORDER_SMS_SENDER_ID,
            mobiles: '91' + order.userDetails.phoneNumber,
            authkey: process.env.SMS_AUTH_KEY,
            order: order.productDetails.title.substring(0, 25) + '...',
            orderid: order.orderNumber,
            otp: '123456',
        };
        await axios_1.default.post(url, postBody);
    }
    async _handleSendOutForDeliveryMail(order) {
        const msg = {
            to: order.userDetails.emailId,
            from: 'info@unboxedkart.com',
            templateId: process.env.DELIVERY_ORDER_OUT_FOR_DELIVERY_TEMPLATE_ID,
            dynamic_template_data: {
                name: order.userDetails.userName,
                order: order.productDetails.title,
                orderid: order.orderNumber,
                otp: '123456',
            },
        };
        const transport = await SendGrid.send(msg)
            .then(() => console.log('email send'))
            .catch((e) => console.log('email error', e));
        return transport;
    }
    async _handleSendOrderDeliveredMessage(order) {
        const url = process.env.SMS_FLOW_URL;
        const postBody = {
            flow_id: process.env.ORDER_DELIVERED_FLOW_ID,
            sender: process.env.ORDER_SMS_SENDER_ID,
            mobiles: '91' + order.userDetails.phoneNumber,
            authkey: process.env.SMS_AUTH_KEY,
            order: order.productDetails.title.substring(0, 25) + '...',
            orderid: order.orderNumber,
        };
        await axios_1.default.post(url, postBody);
    }
    async _handleSendOrderDeliveredMail(order) {
        const msg = {
            to: order.userDetails.emailId,
            from: 'info@unboxedkart.com',
            templateId: process.env.ORDER_DELIVERED_TEMPLATE_ID,
            dynamic_template_data: {
                name: order.userDetails.userName,
                order: order.productDetails.title,
                orderid: order.orderNumber,
            },
        };
        const transport = await SendGrid.send(msg)
            .then(() => console.log('email send'))
            .catch((e) => console.log('email error', e));
        return transport;
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
    __param(6, (0, mongoose_1.InjectModel)('ReferralOrder')),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model])
], OrdersService);
exports.OrdersService = OrdersService;
//# sourceMappingURL=orders.service.js.map