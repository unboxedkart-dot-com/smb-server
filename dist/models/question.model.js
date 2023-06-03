"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuestionSchema = void 0;
const mongoose_1 = require("mongoose");
exports.QuestionSchema = new mongoose_1.default.Schema({
    userId: { type: String, required: true, select: false },
    userName: { type: String, required: true },
    userRole: { type: String, required: true },
    productId: { type: String, required: true },
    productCode: { type: String, required: true },
    productCategory: { type: String, required: true },
    productBrand: { type: String, required: true },
    productCondition: { type: String, required: true },
    isApproved: { type: Boolean, required: true, default: false },
    question: { type: String, required: true },
    productDetails: {
        id: { type: String, required: true },
        imageUrl: { type: String, required: true },
        title: { type: String, required: true },
        color: { type: String, required: true },
        condition: { type: String, required: true },
        brand: { type: String, required: true },
        category: { type: String, required: true },
    },
    timestamp: { type: String, required: true, default: Date.now().toString() },
});
//# sourceMappingURL=question.model.js.map