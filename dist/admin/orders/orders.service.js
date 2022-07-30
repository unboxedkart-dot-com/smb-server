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
const mongoose_2 = require("mongoose");
const order_model_1 = require("../../models/order.model");
const axios_1 = require("axios");
let OrdersService = class OrdersService {
    constructor(orderModel, paymentModel, orderSummaryModel, productModel, couponModel, orderItemModel, userModel, reviewModel, itemPurchasedUsersModel, referralModel) {
        this.orderModel = orderModel;
        this.paymentModel = paymentModel;
        this.orderSummaryModel = orderSummaryModel;
        this.productModel = productModel;
        this.couponModel = couponModel;
        this.orderItemModel = orderItemModel;
        this.userModel = userModel;
        this.reviewModel = reviewModel;
        this.itemPurchasedUsersModel = itemPurchasedUsersModel;
        this.referralModel = referralModel;
        SendGrid.setApiKey(process.env.MAIL_API_KEY);
    }
    async getOrder(userId, orderNumber) {
        console.log('getting order', orderNumber);
        var order = await this.orderModel.findOne({
            orderNumber: orderNumber,
            userId: userId,
        });
        console.log('pprd', order);
        return order;
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
    async getSalesOverview(startDate) {
        console.log('getting sales overview', startDate);
        const sales = await this.orderItemModel.find({
            orderStatus: 'DELIVERED',
        });
        const orders = await this.orderItemModel.find({});
        console.log('overview', sales.length, orders.length);
        return {
            sales: sales,
            orders: orders,
        };
    }
    async acceptOrder(userId, orderItemId) {
        const order = await this.orderItemModel.findByIdAndUpdate(orderItemId, {
            orderStatus: order_model_1.OrderStatuses.ACCEPTED,
        });
        await this.productModel.findByIdAndUpdate(order.orderDetails.productId, {
            $inc: { quantity: 1 },
        });
        this._handleSendOrderConfirmedMessage(order);
        this._handleSendOrderConfirmedMail(order);
        this._handleOrderConfirmationNotification(order);
    }
    async orderReadyForPickUp(userId, orderItemId) {
        const order = await this.orderItemModel.findByIdAndUpdate(orderItemId, {
            orderStatus: order_model_1.OrderStatuses.READY_FOR_PICKUP,
        });
        this._handleSendOutForPickUpMessage(order);
        this._handleSendOutForPickUpMail(order);
        this._handleSendOrderReadyForPickUpNotification(order);
    }
    async orderShipped(userId, orderItemId) {
        const order = await this.orderItemModel.findByIdAndUpdate(orderItemId, {
            orderStatus: order_model_1.OrderStatuses.SHIPPED,
        });
        this._handleSendOrderShippedMessage(order);
        this._handleSendOrderShippedMail(order);
        this._handleSendOrderShippedNotification(order);
    }
    async orderOutForDelivery(userId, orderItemId) {
        const order = await this.orderItemModel.findByIdAndUpdate(orderItemId, {
            orderStatus: order_model_1.OrderStatuses.OUT_FOR_DELIVERY,
        });
        this._handleSendOutForDeliveryMessage(order);
        this._handleSendOutForDeliveryMail(order);
        this._handleSendOutForDeliveryNotification(order);
    }
    async orderDelivered(userId, orderItemId) {
        const order = await this.orderItemModel.findByIdAndUpdate(orderItemId, {
            deliveryTimeStamp: Date(),
            orderStatus: order_model_1.OrderStatuses.DELIVERED,
        });
        console.log('delivering  order', order);
    }
    async cancelOrder(userId, entireBody) {
        console.log('cancelling order');
        const order = await this.orderItemModel.findById(entireBody.orderId);
        if (order.userId == userId) {
            await this.orderItemModel.findByIdAndUpdate(entireBody.orderId, {
                orderStatus: order_model_1.OrderStatuses.CANCELLED,
            });
            console.log('canclled order');
        }
    }
    async deleteAll() {
        await this.orderItemModel.deleteMany();
        await this.orderModel.deleteMany();
        await this.orderSummaryModel.deleteMany();
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
                    order: order.productDetails.title,
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
                    order: order.productDetails.title,
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
    async _handleOrderConfirmationNotification(order) {
        const title = `Hey ${order.userDetails.userName}, Your order is confirmed`;
        const content = `Your order for ${order.productDetails.title} is confirmed & will be ready for pick up by ${order.pickUpDetails.pickUpDateInString}. Click here to know more..`;
        var message = {
            app_id: '12fb7561-03e6-409e-bc03-a558aee286de',
            channel_for_external_user_ids: 'push',
            contents: {
                en: content,
            },
            headings: {
                en: title,
            },
            include_external_user_ids: [order.userId.substring(0, 20)],
        };
        const response = this.sendNotification(message);
        console.log('response', response);
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
    async _handleSendOrderReadyForPickUpNotification(order) {
        const title = `Hey ${order.userDetails.userName}, Your order is ready for pickup`;
        const content = `Your order for ${order.productDetails.title} is ready for pickup. Click here to get directions to our store.`;
        var message = {
            app_id: '12fb7561-03e6-409e-bc03-a558aee286de',
            channel_for_external_user_ids: 'push',
            contents: {
                en: content,
            },
            headings: {
                en: title,
            },
            include_external_user_ids: [order.userId.substring(0, 20)],
        };
        const response = this.sendNotification(message);
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
    async _handleSendOrderShippedNotification(order) {
        const title = `Hey ${order.userDetails.userName}, Your order has been shipped`;
        const content = `Your order for ${order.productDetails.title} with has been shipped & will be delivered to you by ${order.shippingDetails.deliveryDateInString}.`;
        var message = {
            app_id: '12fb7561-03e6-409e-bc03-a558aee286de',
            channel_for_external_user_ids: 'push',
            contents: {
                en: content,
            },
            headings: {
                en: title,
            },
            include_external_user_ids: [order.userId.substring(0, 20)],
        };
        const response = this.sendNotification(message);
    }
    async _handleSendOutForDeliveryMessage(order) {
        console.log('order details', order);
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
    async _handleSendOutForDeliveryNotification(order) {
        const title = `Hey ${order.userDetails.userName}, Your order will be delivered today`;
        const content = `Your order for ${order.productDetails.title} is confirmed & will be delivered today.`;
        var message = {
            app_id: '12fb7561-03e6-409e-bc03-a558aee286de',
            channel_for_external_user_ids: 'push',
            contents: {
                en: content,
            },
            headings: {
                en: title,
            },
            include_external_user_ids: [order.userId.substring(0, 20)],
        };
        const response = this.sendNotification(message);
        console.log('response', response);
    }
    async _handleSendOrderDeliveredMessage(order) {
        console.log('order details', order);
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
    async _handleSendOrderDeliveredNotification(order) {
        const title = `Hey ${order.userDetails.userName}, Your order has been delivered`;
        const content = `Your order for ${order.productDetails.title} has been delivered. Click here to rate your purchase`;
        var message = {
            app_id: '12fb7561-03e6-409e-bc03-a558aee286de',
            channel_for_external_user_ids: 'push',
            contents: {
                en: content,
            },
            headings: {
                en: title,
            },
            include_external_user_ids: [order.userId.substring(0, 20)],
        };
        const response = this.sendNotification(message);
    }
    sendNotification(data) {
        var headers = {
            'Content-Type': 'application/json; charset=utf-8',
            Authorization: `Basic ${process.env.NOTIFICATION_AUTH_KEY}`,
        };
        var options = {
            host: `${process.env.NOTIFICATION_HOST}`,
            port: 443,
            path: '/api/v1/notifications',
            method: 'POST',
            headers: headers,
        };
        var https = require('https');
        var req = https.request(options, function (res) {
            res.on('data', function (data) {
                console.log('Response:');
                console.log(JSON.parse(data));
            });
        });
        req.on('error', function (e) {
            console.log('ERROR:');
            console.log(e);
        });
        req.write(JSON.stringify(data));
        req.end();
    }
};
OrdersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)('Order')),
    __param(1, (0, mongoose_1.InjectModel)('Payment')),
    __param(2, (0, mongoose_1.InjectModel)('OrderSummary')),
    __param(3, (0, mongoose_1.InjectModel)('Product')),
    __param(4, (0, mongoose_1.InjectModel)('Coupon')),
    __param(5, (0, mongoose_1.InjectModel)('OrderItem')),
    __param(6, (0, mongoose_1.InjectModel)('User')),
    __param(7, (0, mongoose_1.InjectModel)('Review')),
    __param(8, (0, mongoose_1.InjectModel)('ItemPurchasedUsers')),
    __param(9, (0, mongoose_1.InjectModel)('ReferralOrder')),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model])
], OrdersService);
exports.OrdersService = OrdersService;
//# sourceMappingURL=orders.service.js.map