"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FaqSchema = void 0;
const mongoose_1 = require("mongoose");
exports.FaqSchema = new mongoose_1.default.Schema({
    question: { type: String, required: true },
    answer: { type: String, required: true },
});
//# sourceMappingURL=faq.model.js.map