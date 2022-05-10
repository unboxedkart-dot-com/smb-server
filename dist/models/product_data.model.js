"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductDataSchema = void 0;
const mongoose_1 = require("mongoose");
exports.ProductDataSchema = new mongoose_1.default.Schema({
    productCode: { type: String, required: true },
    highlights: { type: [String], required: false },
    title: { type: String, required: true },
    modelNumber: { type: String, required: true },
    modelCode: { type: String, required: true },
    category: { type: String, required: true },
    categoryCode: { type: String, required: true },
    brand: { type: String, required: true },
    brandCode: { type: String, required: true },
    storages: [
        {
            code: { type: String },
            title: { type: String },
        },
    ],
    colors: [
        {
            code: { type: String },
            title: { type: String },
        },
    ],
    rams: [
        {
            code: { type: String },
            title: { type: String },
        },
    ],
    processors: [
        {
            code: { type: String },
            title: { type: String },
        },
    ],
});
//# sourceMappingURL=product_data.model.js.map