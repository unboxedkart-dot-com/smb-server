"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderSchema = exports.PaymentMethods = exports.DeliveryTypes = exports.PaymentTypes = exports.OrderStatuses = void 0;
const mongoose_1 = require("mongoose");
var OrderStatuses;
(function (OrderStatuses) {
    OrderStatuses["ORDERED"] = "ORDERED";
    OrderStatuses["ACCEPTED"] = "ACCEPTED";
    OrderStatuses["SHIPPED"] = "SHIPPED";
    OrderStatuses["READY_FOR_PICKUP"] = "READY FOR PICKUP";
    OrderStatuses["OUT_FOR_DELIVERY"] = "OUT FOR DELIVERY";
    OrderStatuses["DELIVERED"] = "DELIVERED";
    OrderStatuses["CANCELLED"] = "CANCELLED";
})(OrderStatuses = exports.OrderStatuses || (exports.OrderStatuses = {}));
var PaymentTypes;
(function (PaymentTypes) {
    PaymentTypes["FULL"] = "FULL";
    PaymentTypes["PARTIAL"] = "PARTIAL";
    PaymentTypes["NULL"] = "NULL";
})(PaymentTypes = exports.PaymentTypes || (exports.PaymentTypes = {}));
var DeliveryTypes;
(function (DeliveryTypes) {
    DeliveryTypes["STORE_PICKUP"] = "STORE PICKUP";
    DeliveryTypes["HOME_DELIVERY"] = "HOME DELIVERY";
})(DeliveryTypes = exports.DeliveryTypes || (exports.DeliveryTypes = {}));
var PaymentMethods;
(function (PaymentMethods) {
    PaymentMethods["PAY_AT_STORE"] = "PAY AT STORE";
    PaymentMethods["PAY_AT_STORE_DUE"] = "PAY AT STORE - DUE";
    PaymentMethods["CASH_ON_DELIVERY"] = "CASH ON DELIVERY";
    PaymentMethods["CASH_ON_DELIVERY_DUE"] = "CASH ON DELIVERY - DUE";
    PaymentMethods["PREPAID"] = "PREPAID";
})(PaymentMethods = exports.PaymentMethods || (exports.PaymentMethods = {}));
exports.OrderSchema = new mongoose_1.default.Schema({
    paymentDetails: {
        paymentType: { type: String, required: true },
        paymentMethod: { type: String, required: true },
        paymentIds: { type: Array, required: false },
        partialPaymentId: { type: String, required: false },
        isPaid: { type: Boolean, required: true, default: false },
        amountPaid: { type: Number, required: true, default: 0 },
        amountDue: { type: Number, required: true },
    },
    pricingDetails: {
        billTotal: { type: Number, required: true },
        couponCode: { type: String, required: false },
        couponDiscount: { type: Number, required: false },
        payableTotal: { type: Number, required: true },
    },
    deliveryType: { type: String, required: true },
    shippingDetails: {},
    pickUpDetails: {},
    orderNumber: { type: String, required: true },
    orderDate: { type: String, required: true, default: Date.now() },
    updatedDate: { type: String, required: false },
    userId: { type: String, required: true },
    userDetails: {
        phoneNumber: { type: Number, required: true },
        name: { type: String, required: true },
        emailId: { type: String, required: true },
    },
    orderStatus: {
        type: String,
        required: true,
        default: OrderStatuses.ORDERED,
    },
    itemsCount: { type: Number, required: true },
    orderItems: [
        {
            productId: { type: String, required: true },
            pricePerItem: { type: Number, required: true },
            productCount: { type: Number, required: true },
            total: { type: Number, required: true },
            productDetails: {
                imageUrl: { type: String, required: true },
                title: { type: String, required: true },
                color: { type: String, required: false },
                condition: { type: String, required: true },
                brand: { type: String, required: true },
                category: { type: String, required: true },
            },
        },
    ],
});
//# sourceMappingURL=order.model.js.map