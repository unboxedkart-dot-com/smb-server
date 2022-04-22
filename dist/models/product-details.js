"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductSpecificationsSchema = void 0;
const mongoose_1 = require("mongoose");
exports.ProductSpecificationsSchema = new mongoose_1.default.Schema({
    productId: { type: String, required: true },
    productCode: { type: String, required: true },
    specs: [
        {
            title: { type: String, required: true },
            values: [{ type: String, required: true }],
        },
    ],
});
//# sourceMappingURL=product-details.js.map