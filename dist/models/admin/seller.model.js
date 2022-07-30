"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SellerSchema = void 0;
const mongoose_1 = require("mongoose");
exports.SellerSchema = new mongoose_1.default.Schema({
    name: { type: String, required: true },
    businessName: { type: String, required: true },
    businessDoc: { type: String, required: true },
    businessDocNumber: { type: String, required: true },
    businessDocUrl: { type: String },
    phoneNumber: { type: Number, required: true },
    alternatePhoneNumber: { type: Number },
    dateJoined: { type: String, default: Date.now().toString() },
    emailId: { type: String },
    city: { type: String, required: true },
});
//# sourceMappingURL=seller.model.js.map