"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BuyerSchema = void 0;
const mongoose_1 = require("mongoose");
exports.BuyerSchema = new mongoose_1.default.Schema({
    name: { type: String, required: true },
    emailId: { type: String, required: true },
    phoneNumber: { type: Number, required: true },
    city: { type: String, required: true },
});
//# sourceMappingURL=buyer.model.js.map