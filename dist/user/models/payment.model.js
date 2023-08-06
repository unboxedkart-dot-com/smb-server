"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentSchema = void 0;
const mongoose_1 = require("mongoose");
exports.PaymentSchema = new mongoose_1.default.Schema({
    userId: { type: String, required: true },
    orderNumber: { type: String, required: true },
    gateway: { type: String, required: true },
    status: { type: String, required: true },
    orderDate: { type: String, required: true, default: Date.now() },
    paymentOrderId: { type: String, required: true },
    paymentId: { type: String, required: true },
    paymentMethod: { type: String, required: true },
    paymentType: { type: String, required: true },
    amount: { type: Number, required: true },
    paymentTimeStamp: { type: Date, required: true, default: Date.now() },
});
//# sourceMappingURL=payment.model.js.map