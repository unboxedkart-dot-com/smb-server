"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserPaymentDetailsSchema = void 0;
const mongoose_1 = require("mongoose");
exports.UserPaymentDetailsSchema = new mongoose_1.default.Schema({
    userId: { type: String, required: true },
    upiId: { type: String, required: true },
    upiName: { type: String, required: true },
});
//# sourceMappingURL=user_payment_details.model.js.map