"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductSpecsSchema = void 0;
const mongoose_1 = require("mongoose");
exports.ProductSpecsSchema = new mongoose_1.default.Schema({
    productCode: { type: String, required: true },
    productSpecs: [
        {
            title: { type: String, required: true },
            values: { type: Map, required: true },
        },
    ],
});
//# sourceMappingURL=product-specs.js.map