"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuestionSchema = void 0;
const mongoose_1 = require("mongoose");
exports.QuestionSchema = new mongoose_1.default.Schema({
    userId: { type: String, required: true, select: false },
    userName: { type: String, required: true },
    userRole: { type: String, required: true },
    productId: { type: String, required: true },
    isApproved: { type: Boolean, required: true, default: false },
    question: { type: String, required: true },
    timestamp: { type: Date, required: true, default: Date.now() },
});
//# sourceMappingURL=question.model.js.map