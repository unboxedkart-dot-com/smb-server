"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceSchema = void 0;
const mongoose_1 = require("mongoose");
exports.ServiceSchema = new mongoose_1.default.Schema({
    productCode: { type: String, required: true },
    title: { type: String, required: true },
    price: { type: Number },
    sellingPrice: { type: Number },
    colors: { type: [String], required: true },
});
//# sourceMappingURL=service.model.js.map