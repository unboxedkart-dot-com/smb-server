"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VendorSchema = void 0;
const mongoose_1 = require("mongoose");
exports.VendorSchema = new mongoose_1.default.Schema({
    name: { type: String, required: true },
    idProofDoc: { type: String, },
    idProofNumber: { type: String },
    phoneNumber: { type: Number, required: true },
    alternatePhoneNumber: { type: Number },
    city: { type: String, required: true },
    idProofUrl: { type: String },
});
//# sourceMappingURL=vendor.model.js.map