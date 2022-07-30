"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationSchema = void 0;
const mongoose_1 = require("mongoose");
exports.NotificationSchema = new mongoose_1.default.Schema({
    title: { type: String, required: true },
    subtitle: { type: String, required: true },
    content: { type: String, required: true },
    notificationType: { type: String, default: null },
    timestamp: { type: Date, default: Date.now() },
    notificationDetail: { type: String },
});
//# sourceMappingURL=notification.model.js.map