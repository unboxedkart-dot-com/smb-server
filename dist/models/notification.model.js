"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationSchema = void 0;
const mongoose_1 = require("mongoose");
exports.NotificationSchema = new mongoose_1.default.Schema({
    title: { type: String, required: true },
    subtitle: { type: String, required: true },
    content: { type: String, required: false },
    orderStatus: { type: String, required: true },
    dateInString: { type: String, required: false },
    productTitle: { type: String, required: true },
    orderId: { type: String, required: true },
    orderItemId: { type: String, required: true },
    userId: { type: String, required: true },
    type: { type: String, required: true },
    timestamp: { type: String, required: true, default: Date.now().toString() },
    seen: { type: Boolean, default: false },
    seenId: { type: String },
    userPhoneNumber: { type: String },
});
//# sourceMappingURL=notification.model.js.map