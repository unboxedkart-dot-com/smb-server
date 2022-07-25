"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PurchasedProductSchema = void 0;
const mongoose_1 = require("mongoose");
exports.PurchasedProductSchema = new mongoose_1.default.Schema({
    productCode: { type: String },
    title: { type: String },
    brand: { type: String },
    category: { type: String },
    color: { type: String },
    brandCode: { type: String },
    categoryCode: { type: String },
    colorCode: { type: String },
    purchaseDate: { type: String, default: Date.now().toString() },
});
//# sourceMappingURL=purchased-item.model.js.map