"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReviewsDataSchema = void 0;
const mongoose_1 = require("mongoose");
exports.ReviewsDataSchema = new mongoose_1.default.Schema({
    productId: { type: String, required: false },
    productCode: { type: String, required: true },
    oneStarCount: { type: Number, required: false },
    twoStarCount: { type: Number, required: false },
    threeStarCount: { type: Number, required: false },
    fourStarCount: { type: Number, required: false },
    fiveStarCount: { type: Number, required: false },
    averageRating: { type: Number, required: false },
    totalReviewsCount: { type: Number, required: false },
});
//# sourceMappingURL=reviews_data.model.js.map