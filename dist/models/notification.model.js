"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationSchema = void 0;
const mongoose_1 = require("mongoose");
exports.NotificationSchema = new mongoose_1.default.Schema({
    title: { type: String, required: true },
    subtitle: { type: String, required: true },
    orderStatus: { type: String, required: true },
    dateInString: { type: String, required: true },
    deviceTitle: { type: String, required: true },
    orderId: { type: String, required: true },
    userId: { type: String, required: true },
});
//# sourceMappingURL=notification.model.js.map