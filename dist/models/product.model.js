"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductSchema = void 0;
const mongoose_1 = require("mongoose");
exports.ProductSchema = new mongoose_1.default.Schema({
    SKU: { type: String, required: true },
    productCode: { type: String, required: true },
    aboutProduct: { type: [String], required: true },
    title: { type: String, required: true },
    modelNumber: { type: String, required: true },
    brand: { type: String, required: true },
    brandCode: { type: String, required: true },
    category: { type: String, required: true },
    categoryCode: { type: String, required: true },
    condition: { type: String, required: true },
    conditionCode: { type: String, required: true },
    imageUrls: {
        coverImage: { type: String, required: true },
        images: { type: [String], required: true },
    },
    pricing: {
        price: { type: Number, required: true },
        sellingPrice: { type: Number, required: true },
    },
    quantity: { type: Number, required: true },
    highlights: { type: [String], required: false },
    searchCases: { type: [String], required: true },
    isBestSeller: { type: Boolean, required: false, default: false },
    isFeatured: { type: Boolean, required: false, default: false },
    moreDetails: {
        color: { type: String, required: true },
        colorCode: { type: String, required: true },
        storage: { type: String, required: true },
        storageCode: { type: String, required: true },
        ram: { type: String, required: true },
        ramCode: { type: String, required: true },
        processor: { type: String, required: true },
        processorCode: { type: String, required: true },
    },
    warrantyDetails: {
        isUnderWarranty: { type: Boolean, required: false, default: false },
        expiryDate: { type: String, required: false },
        warrantyLeft: { type: Number, required: false },
        description: { type: String, required: false },
    },
    boxContains: { type: String, required: false },
    rating: { type: Number, required: false, default: 0 },
});
//# sourceMappingURL=product.model.js.map