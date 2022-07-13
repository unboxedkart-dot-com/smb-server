"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderedServiceSchema = void 0;
const mongoose_1 = require("mongoose");
exports.OrderedServiceSchema = new mongoose_1.default.Schema({
    title: { type: String, required: true },
    price: { type: Number },
    sellingPrice: { type: Number },
});
//# sourceMappingURL=ordered_service.model.js.map