"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductImagesSchema = void 0;
const mongoose_1 = require("mongoose");
exports.ProductImagesSchema = new mongoose_1.default.Schema({
    productCode: { type: String, required: true },
    colorCode: { type: String, required: true },
    coverImage: { type: String },
    images: { type: [String], required: false },
    thumbnails: { type: [String], required: false },
    count: { type: Number, required: true },
});
//# sourceMappingURL=product_images.model.js.map