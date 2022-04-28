"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReviewSchema = void 0;
const mongoose_1 = require("mongoose");
exports.ReviewSchema = new mongoose_1.default.Schema({
    userId: { type: String, required: true, select: false },
    userName: { type: String, required: true },
    rating: { type: Number, required: true },
    reviewTitle: { type: String, required: false },
    reviewContent: { type: String, required: false },
    productId: { type: String, required: true },
    productCode: { type: String, required: true },
    productTitle: { type: String, required: true },
    imageUrl: { type: String, required: true },
    isApproved: { type: String, required: false, select: false },
    timestamp: { type: Date, required: true, default: Date.now() },
});
//# sourceMappingURL=review.model.js.map