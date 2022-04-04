"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CartItemSchema = void 0;
const mongoose_1 = require("mongoose");
exports.CartItemSchema = new mongoose_1.default.Schema({
    userId: { type: String, required: true, select: false },
    productId: { type: String, required: true },
    timestamp: { type: Date, required: true, default: Date.now() },
    productCount: { type: Number, required: true, default: 1 },
});
//# sourceMappingURL=cart-item.model.js.map