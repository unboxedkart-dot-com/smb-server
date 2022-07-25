"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomerSchema = void 0;
const mongoose_1 = require("mongoose");
const purchased_item_model_1 = require("./purchased-item.model");
exports.CustomerSchema = new mongoose_1.default.Schema({
    name: { type: String, required: true },
    emailId: { type: String },
    phoneNumber: { type: Number, required: true },
    city: { type: String, required: true },
    dateJoined: { type: String, default: Date.now().toString() },
    leadSource: { type: String },
    leadSourceInformation: { type: String },
    itemsPurchased: { type: [purchased_item_model_1.PurchasedProductSchema] },
});
//# sourceMappingURL=customer.model.js.map