"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuestionAndAnswerSchema = void 0;
const mongoose_1 = require("mongoose");
const answer_model_1 = require("./answer.model");
exports.QuestionAndAnswerSchema = new mongoose_1.default.Schema({
    userId: { type: String, required: true, select: false },
    userName: { type: String, required: true },
    userRole: { type: String, required: true },
    productId: { type: String, required: true },
    questionDetails: {
        questionId: { type: String, required: true },
        isApproved: { type: Boolean, required: true, default: false },
        question: { type: String, required: true },
        timestamp: { type: Date, required: true, default: Date.now() },
    },
    answers: [
        {
            type: answer_model_1.AnswerSchema,
            required: false,
        },
    ],
});
//# sourceMappingURL=q_and_a.model.js.map