"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductDescriptionSchema = void 0;
const mongoose_1 = require("mongoose");
exports.ProductDescriptionSchema = new mongoose_1.default.Schema({
    productCode: { type: String, required: true },
    productDescriptions: { type: Array, required: true },
});
//# sourceMappingURL=product-description.js.map