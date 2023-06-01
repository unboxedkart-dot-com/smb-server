"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StoreNotificationSchema = void 0;
const mongoose_1 = require("mongoose");
exports.StoreNotificationSchema = new mongoose_1.default.Schema({
    userId: { type: String, required: true },
    tokenNumber: { type: String, required: true },
    title: { type: String, required: true },
    subtitle: { type: String, required: true },
    visitStatus: { type: String, default: 'visited' },
    timestamp: { type: Number, required: true },
    dateInString: { type: String, required: true },
    storeName: { type: String, required: true },
    categoryCode: { type: String, required: false },
    brandCode: { type: String, required: false },
    productCode: { type: String, required: false },
    processorCode: { type: String, required: false },
    storageCode: { type: String, required: false },
    connectivityCode: { type: String, required: false },
});
//# sourceMappingURL=store-notification.model.js.map