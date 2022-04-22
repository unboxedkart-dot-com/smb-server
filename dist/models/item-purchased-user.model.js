"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ItemPurchasedUsersSchema = void 0;
const mongoose_1 = require("mongoose");
exports.ItemPurchasedUsersSchema = new mongoose_1.default.Schema({
    productId: { type: String, required: true, select: false },
    users: [
        {
            userId: { type: String, required: true },
            userName: { type: String, required: true },
            timestamp: { type: Date, default: Date.now() },
            phoneNumber: { type: Number },
            emailId: { type: String },
        },
    ],
    userIds: { type: Array, default: [] },
});
//# sourceMappingURL=item-purchased-user.model.js.map