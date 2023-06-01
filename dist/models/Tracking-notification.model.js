"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TrackingNotificationSchema = void 0;
const mongoose_1 = require("mongoose");
exports.TrackingNotificationSchema = new mongoose_1.default.Schema({
    title: { type: String, required: true },
    subtitle: { type: String, required: false },
    content: { type: String, required: false },
    dateInString: { type: String, required: false },
    timestamp: { type: String, required: true, default: Date.now().toString() },
    userId: { type: String, required: false },
    productId: { type: String, required: false },
    type: { type: String, required: false },
    seen: { type: Boolean, default: false },
    seenId: { type: String },
    userPhoneNumber: { type: String },
});
//# sourceMappingURL=Tracking-notification.model.js.map