"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReferralOrderSchema = void 0;
const mongoose_1 = require("mongoose");
exports.ReferralOrderSchema = new mongoose_1.default.Schema({
    couponCode: { type: String, required: true, select: true },
    orderNumber: { type: String, required: true, select: true },
    referrerDetails: {
        userId: { type: String, required: true, select: false },
        phoneNumber: { type: Number, required: true },
        userName: { type: String, required: true },
        userEmail: { type: String, required: false },
    },
    refereeId: { type: String, required: true, select: true },
    cashBackDetails: {
        cashBackAmount: { type: Number, required: true },
        isCredited: { type: Boolean, required: true, default: false },
    },
    discountDetails: {
        discountAmount: { type: Number, required: true },
    },
    isCompeleted: { type: Boolean, required: true, default: false },
});
//# sourceMappingURL=referral_order.js.map