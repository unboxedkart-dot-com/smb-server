"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductSchema = void 0;
const mongoose_1 = require("mongoose");
exports.ProductSchema = new mongoose_1.default.Schema({
    timestamp: { type: String, default: Date.now() },
    SKU: { type: String, required: true },
    productCode: { type: String, required: true },
    aboutProduct: { type: [String], required: true },
    title: { type: String, required: true },
    modelNumber: { type: String, required: true },
    seriesCode: { type: String, required: false },
    brand: { type: String, required: true },
    brandCode: { type: String, required: true },
    category: { type: String, required: true },
    categoryCode: { type: String, required: true },
    condition: { type: String, required: true },
    conditionCode: { type: String, required: true },
    imageUrls: {
        desktopCoverImage: { type: String, required: true },
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
    isCertified: { type: Boolean, required: false, default: false },
    moreDetails: {
        color: { type: String, required: true, default: null },
        colorCode: { type: String, required: true, default: null },
        storage: { type: String, required: false, default: null },
        storageCode: { type: String, required: false, default: null },
        ram: { type: String, required: false, default: null },
        ramCode: { type: String, required: false, default: null },
        processor: { type: String, required: false, default: null },
        processorCode: { type: String, required: false, default: null },
        combination: { type: String, required: false, default: null },
        combinationCode: { type: String, required: false, default: null },
        screenSizeCode: { type: String, required: false, default: null },
        screenSize: { type: String, required: false, default: null },
        connectivity: { type: String, required: false, default: null },
        connectivityCode: { type: String, required: false, default: null },
    },
    warrantyDetails: {
        isUnderWarranty: { type: Boolean, required: false, default: false },
        expiryDate: { type: String, required: false },
        warrantyLeft: { type: Number, required: false },
        description: { type: String, required: false },
    },
    sellerDetails: {
        sellerId: { type: String, required: true },
        sellerName: { type: String, required: true },
    },
    boxContains: { type: String, required: false },
    rating: { type: Number, required: false, default: 0 },
});
//# sourceMappingURL=product.model.js.map