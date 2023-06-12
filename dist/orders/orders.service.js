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
    constructor(orderModel, paymentModel, orderSummaryModel, productModel, couponModel, orderItemModel, userModel, reviewModel, itemPurchasedUsersModel, referralModel, notificationModel) {
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
        this.notificationModel = notificationModel;
        SendGrid.setApiKey(process.env.MAIL_API_KEY);
    }
    async getAllOrders(status) {
        console.log('status', status);
        const orderItems = await this.orderItemModel
            .find({ orderStatus: status })
            .sort({ orderDate: -1 });
        console.log('pro', orderItems);
        return orderItems;
    }
    async getReferrals(userId) {
        const referrals = await this.referralModel.find({
            'referrerDetails.userId': userId,
        });
        return referrals;
    }
    async createOrder(userId) {
        var _a;
        var payableAmount;
        var couponDiscount = 0;
        let amountPaid = 0;
        let amountDue;
        const currentTime = Date.now();
        const userDoc = await this.userModel.findById(userId);
        const orderSummary = userDoc.orderSummary;
        const deliveryType = orderSummary.deliveryType;
        const paymentType = orderSummary.paymentType;
        const paymentMethod = orderSummary.paymentMethod;
        const orderItemDetails = await this._generateOrderItemDetails(orderSummary.orderItems);
        const productId = orderSummary.orderItems[0].productId;
        const productData = await this.productModel.findById(productId);
        payableAmount = orderItemDetails.orderTotal;
        console.log('payable amount 1', payableAmount);
        if (orderSummary.couponCode != null) {
            couponDiscount = await this._getCouponDiscount(userDoc._id.toString(), userDoc.name, orderSummary.orderNumber, orderSummary.couponCode, orderItemDetails.orderTotal);
            payableAmount = payableAmount - couponDiscount;
            console.log('payable amount 2', payableAmount);
        }
        amountDue = payableAmount;
        console.log('amount due', amountDue);
        console.log('coupon validated', payableAmount);
        if (paymentType == order_model_1.PaymentTypes.PARTIAL) {
            console.log('partial payment executing');
            let transactionData;
            if (paymentMethod == order_model_1.PaymentMethods.PAY_AT_STORE_DUE) {
                transactionData = await this.paymentModel.findOne({
                    paymentId: orderSummary.partialPaymentId,
                });
            }
            else if (paymentMethod == order_model_1.PaymentMethods.CASH_ON_DELIVERY_DUE) {
                transactionData = await this.paymentModel.findOne({
                    paymentId: orderSummary.partialPaymentId,
                });
            }
            const amount = transactionData.amount;
            amountPaid = amount;
            amountDue = payableAmount - amountPaid;
        }
        else if (paymentType == order_model_1.PaymentTypes.FULL) {
            console.log('full payment executing');
            let transactionData;
            if (paymentMethod == order_model_1.PaymentMethods.PREPAID) {
                transactionData = await this.paymentModel.findOne({
                    paymentId: orderSummary.paymentId,
                });
                const amount = transactionData.amount;
                amountPaid = amount;
                amountDue = payableAmount - amountPaid;
            }
            else if (paymentMethod == order_model_1.PaymentMethods.CASH_ON_DELIVERY ||
                paymentMethod == order_model_1.PaymentMethods.PAY_AT_STORE) {
                amountPaid = 0;
                amountDue = payableAmount;
            }
        }
        console.log('adding a new order sss', orderSummary);
        console.log('adding a new payment sss', orderSummary.paymentId);
        const newOrder = new this.orderModel({
            orderStatus: productData.quantity == 0
                ? order_model_1.OrderStatuses.PREORDERD
                : order_model_1.OrderStatuses.ORDERED,
            timestamp: currentTime,
            orderDate: currentTime,
            userId: userId,
            userDetails: {
                name: userDoc.name,
                emailId: userDoc.emailId,
                phoneNumber: userDoc.phoneNumber,
            },
            orderNumber: orderSummary.orderNumber,
            deliveryType: userDoc.orderSummary.deliveryType,
            shippingDetails: deliveryType == 'HOME DELIVERY' ? orderSummary.shippingDetails : null,
            pickUpDetails: deliveryType == 'STORE PICKUP' ? orderSummary.pickUpDetails : null,
            pricingDetails: {
                billTotal: orderItemDetails.orderTotal,
                payableTotal: payableAmount,
                couponCode: orderSummary.couponCode,
                couponDiscount: couponDiscount,
            },
            paymentDetails: {
                paymentType: paymentType,
                paymentMethod: paymentMethod,
                partialPaymentId: paymentType == 'PARTIAL' ? orderSummary.partialPaymentId : null,
                isPaid: (_a = amountDue == 0) !== null && _a !== void 0 ? _a : false,
                paymentIds: [orderSummary.paymentId],
                amountPaid: amountPaid,
                amountDue: amountDue,
            },
            itemsCount: orderItemDetails.orderItemsCount,
            orderItems: orderItemDetails.orderItems,
        });
        newOrder.save();
        await this._handleSaveIndividualOrders(userId, userDoc, newOrder);
        return orderSummary.orderNumber;
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
    async getOrderItems(userId) {
        console.log('order user id in reverse order', userId);
        const orderItems = await this.orderItemModel
            .find({
            userId: userId,
        })
            .sort({ timestamp: -1 });
        console.log('orderrrrr', orderItems);
        return orderItems;
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
    async _getCouponDiscount(userId, userName, orderNumber, couponCode, orderTotal) {
        const coupon = await this.couponModel
            .findOne({ couponCode: couponCode })
            .select('+couponDetails.userId');
        console.log('coupon', coupon);
        console.log('coupon redemption', coupon.redemptionType);
        if (coupon && orderTotal >= coupon.minimumOrderTotal) {
            if (coupon.isPersonalCoupon) {
                const newReferral = new this.referralModel({
                    orderNumber: orderNumber,
                    couponCode: coupon.couponCode,
                    referrerDetails: {
                        userId: coupon.couponDetails.userId,
                        phoneNumber: coupon.couponDetails.phoneNumber,
                        userName: coupon.couponDetails.userName,
                        userEmail: coupon.couponDetails.userEmail,
                    },
                    refereeDetails: {
                        userId: userId,
                        userName: userName,
                    },
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
                await this.referralOrderNotification(coupon.couponDetails.userName, coupon.couponDetails.userId, userName);
                console.log('coupon', coupon);
                return coupon.discountAmount;
            }
            else if (coupon.redemptionType == 'LIMITED' &&
                coupon.redemptionLimit > 0) {
                console.log('decremnting coupon');
                const updatedCoupon = await this.couponModel.findByIdAndUpdate(coupon._id, {
                    $inc: { redemptionLimit: -1 },
                });
                console.log('coupon udated', updatedCoupon);
                return coupon.discountAmount;
            }
            else {
                return coupon.discountAmount;
            }
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
    async _handleSaveIndividualOrders(userId, userDoc, order) {
        var _a, _b;
        console.log('executing new individual order');
        const currentTime = Date.now();
        const paymentId = order.paymentDetails.paymentIds[0];
        const itemsCount = order.orderItems.length;
        console.log('items count', itemsCount);
        const deliveryType = order.deliveryType;
        let amountPaid = order.paymentDetails.amountPaid / itemsCount;
        let amountDue = order.paymentDetails.amountDue;
        const couponDiscount = order.pricingDetails.couponDiscount / itemsCount;
        for (const orderItem of order.orderItems) {
            let productData = await this.productModel.findById(orderItem.productId);
            let payableAmount = orderItem.total - couponDiscount;
            amountDue = orderItem.total - couponDiscount - amountPaid;
            const newOrderItem = new this.orderItemModel({
                orderStatus: productData.quantity == 0
                    ? order_model_1.OrderStatuses.PREORDERD
                    : order_model_1.OrderStatuses.ORDERED,
                timestamp: currentTime,
                userId: order.userId,
                orderNumber: order.orderNumber,
                orderDate: order.orderDate,
                shippingDetails: deliveryType != 'STORE PICKUP' ? order.shippingDetails : null,
                userDetails: {
                    emailId: order.userDetails.emailId,
                    phoneNumber: order.userDetails.phoneNumber,
                    userName: order.userDetails.name,
                },
                pickUpDetails: deliveryType == 'STORE PICKUP' ? order.pickUpDetails : null,
                paymentDetails: {
                    paymentType: order.paymentDetails.paymentType,
                    paymentMethod: order.paymentDetails.paymentMethod,
                    paymentId: paymentId,
                    partialPaymentId: order.paymentDetails.partialPaymentId,
                    amountPaid: amountPaid,
                    amountDue: amountDue,
                    isPaid: (_a = amountDue == 0) !== null && _a !== void 0 ? _a : false,
                },
                deliveryType: order.deliveryType,
                pricingDetails: {
                    billTotal: orderItem.total,
                    payableTotal: payableAmount,
                    couponCode: (_b = order.pricingDetails.couponCode) !== null && _b !== void 0 ? _b : 'NA',
                    couponDiscount: order.pricingDetails.couponDiscount,
                },
                productDetails: orderItem.productDetails,
                orderDetails: {
                    productId: orderItem.productId,
                    pricePerItem: orderItem.pricePerItem,
                    productCount: orderItem.productCount,
                },
            });
            newOrderItem.save();
            const content = `Payable Amount is ₹${orderItem.pricePerItem - newOrderItem.pricingDetails.couponDiscount}` +
                (couponDiscount != 0 ? ' - ' : '') +
                (couponDiscount != 0 ? newOrderItem.pricingDetails.couponCode : '') +
                (couponDiscount != 0
                    ? `(₹${newOrderItem.pricingDetails.couponDiscount})`
                    : '');
            const newNotification = new this.notificationModel({
                userId: userId,
                title: `New Item Ordered by ${userDoc.name} - ${userDoc.phoneNumber}`,
                subtitle: `${orderItem.productDetails.title}`,
                content: content,
                type: 'new-order',
                userPhoneNumber: userDoc.phoneNumber,
                orderId: newOrderItem.orderNumber,
                orderItemId: newOrderItem.orderNumber,
                orderStatus: newOrderItem.orderStatus,
                productTitle: orderItem.productDetails.title,
            });
            newNotification.save();
        }
    }
    async createPaymentOrder() {
    }
    async validatePaymentSignature() {
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
        const adminPostBody1 = {
            flow_id: process.env.ORDER_PLACED_FLOW_ID,
            sender: process.env.ORDER_SMS_SENDER_ID,
            mobiles: '919494111131',
            order: order,
            authkey: process.env.SMS_AUTH_KEY,
        };
        await axios_1.default.post(url, adminPostBody1);
        const adminPostBody2 = {
            flow_id: process.env.ORDER_PLACED_FLOW_ID,
            sender: process.env.ORDER_SMS_SENDER_ID,
            mobiles: '917097070707',
            order: order,
            authkey: process.env.SMS_AUTH_KEY,
        };
        await axios_1.default.post(url, adminPostBody2);
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
    async referralOrderNotification(referrerName, referrerId, referreName) {
        const title = `Hey ${referrerName}, Congratulations !`;
        const content = `Congratulations. Your friend (${referreName}) has ordered a product from unboxedkart using your referral coupon code. Referral bonus will be credited to your bank account after the product is successfully delivered. Please, add your bank details, if not added.T&Cs Apply.`;
        var message = {
            app_id: '12fb7561-03e6-409e-bc03-a558aee286de',
            channel_for_external_user_ids: 'push',
            contents: {
                en: content,
            },
            headings: {
                en: title,
            },
            include_external_user_ids: [referrerId.substring(0, 20)],
        };
        const response = this.sendNotification(message);
    }
    async sendInvoiceCopy(userId, orderId) {
        const user = await this.userModel.findById(userId);
        const emailId = user.emailId;
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
    __param(10, (0, mongoose_1.InjectModel)('Notification')),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
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