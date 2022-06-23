"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderItemSchema = void 0;
const mongoose_1 = require("mongoose");
const address_model_1 = require("./address.model");
const order_model_1 = require("./order.model");
const store_location_model_1 = require("./store_location.model");
exports.OrderItemSchema = new mongoose_1.default.Schema({
    deliveryType: { type: String, required: false },
    userId: { type: String, required: true },
    userDetails: {
        phoneNumber: { type: String, required: true },
        userName: { type: String, required: true },
        emailId: { type: String, required: true },
    },
    isDelivered: { type: Boolean, required: false, default: false },
    deliveryTimeStamp: { type: Date, required: false },
    shippingDetails: {
        shipDate: { type: String, required: false },
        expectedDeliveryDate: { type: Date, required: false },
        expectedDeliveryDateInString: { type: String, required: false },
        deliveryDate: { type: String, required: false },
        deliveryDateInString: { type: String, required: false },
        deliveryAddress: { type: address_model_1.AddressSchema, required: false },
        isDelivered: { type: String, required: false, default: false },
    },
    pickUpDetails: {
        pickUpDate: { type: String, required: false },
        storeLocation: { type: store_location_model_1.StoreLocationSchema, required: false },
        isPickedUp: { type: Boolean, required: false, default: false },
        pickUpTimeStart: { type: String, required: false },
        pickUpTimeEnd: { type: String, required: false },
        pickUpTimeInString: { type: String, required: false },
        pickUpDateInString: { type: String, required: false },
    },
    paymentDetails: {
        paymentType: { type: String, required: true },
        paymentMethod: { type: String, required: true },
        partialPaymentId: { type: String, required: false },
        isPaid: { type: Boolean, required: true, default: false },
        amountPaid: { type: Number, required: true, default: 0 },
        amountDue: { type: Number, required: true },
        paymentDate: { type: String, required: false },
        paymentId: { type: String, required: false },
    },
    pricingDetails: {
        billTotal: { type: Number, required: true },
        payableTotal: { type: Number, required: true },
        couponCode: { type: String, required: false },
        couponDiscount: { type: Number, required: false },
    },
    orderNumber: { type: String, required: true },
    orderDate: { type: String, required: true, default: Date() },
    updatedDate: { type: Date, required: false },
    orderStatus: { type: String, required: true, default: order_model_1.OrderStatuses.ORDERED },
    productDetails: {
        imageUrl: { type: String, required: true },
        title: { type: String, required: true },
        color: { type: String, required: false },
        condition: { type: String, required: true },
        brand: { type: String, required: true },
        category: { type: String, required: true },
    },
    orderDetails: {
        productId: { type: String, required: true },
        pricePerItem: { type: Number, required: true },
        productCount: { type: Number, required: true },
    },
});
//# sourceMappingURL=orderItem.model.js.map