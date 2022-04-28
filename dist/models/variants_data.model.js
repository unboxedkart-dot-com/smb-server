"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VariantsDataSchema = void 0;
const mongoose_1 = require("mongoose");
exports.VariantsDataSchema = new mongoose_1.default.Schema({
    productCode: { type: String, required: true },
    colors: { type: Array, required: true },
    conditions: { type: Array, required: true },
    storages: { type: Array, required: false },
    processors: { type: Array, required: false },
    rams: { type: Array, required: false },
});
//# sourceMappingURL=variants_data.model.js.map