"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderSchema = exports.DeliveryTypes = exports.paymentTypes = exports.OrderStatuses = void 0;
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
var paymentTypes;
(function (paymentTypes) {
    paymentTypes["PAY_AT_STORE"] = "PAY AT STORE";
    paymentTypes["CASH_ON_DELIVERY"] = "CASH ON DELIVERY";
    paymentTypes["PREPAID"] = "PREPAID";
})(paymentTypes = exports.paymentTypes || (exports.paymentTypes = {}));
var DeliveryTypes;
(function (DeliveryTypes) {
    DeliveryTypes["STORE_PICKUP"] = "STORE PICKUP";
    DeliveryTypes["HOME_DELIVERY"] = "HOME DELIVERY";
})(DeliveryTypes = exports.DeliveryTypes || (exports.DeliveryTypes = {}));
exports.OrderSchema = new mongoose_1.default.Schema({
    paymentDetails: {
        paymentType: { type: String, required: true },
        paymentDate: { type: String, required: false },
        paymentId: { type: String, required: false },
        isPaid: { type: Boolean, required: true, default: false },
        billTotal: { type: Number, required: true },
        couponCode: { type: String, required: false },
        couponDiscount: { type: Number, required: false },
        payableTotal: { type: Number, required: true },
    },
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