"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderSummarySchema = void 0;
const mongoose_1 = require("mongoose");
exports.OrderSummarySchema = new mongoose_1.default.Schema({
    orderItems: [
        {
            productId: { type: String, required: true },
            productCount: { type: Number, required: true },
        },
    ],
    timestamp: { type: String, required: true, default: Date.now() },
    userId: { type: String, required: true },
    itemsCount: { type: Number, required: true },
});
//# sourceMappingURL=order_summary.model.js.map