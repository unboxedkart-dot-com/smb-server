"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductDataSchema = void 0;
const mongoose_1 = require("mongoose");
exports.ProductDataSchema = new mongoose_1.default.Schema({
    productCode: { type: String, required: true },
    highlights: { type: [String], required: false },
    title: { type: String, required: true },
    modelNumber: { type: String, required: true },
});
//# sourceMappingURL=product_data.mode.js.map