"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StoreTokenSchema = exports.MoreDetails = void 0;
const mongoose_1 = require("mongoose");
exports.MoreDetails = new mongoose_1.default.Schema({
    colorCode: { type: String, required: false },
    color: { type: String, required: false },
    storage: { type: String, required: false },
    storageCode: { type: String, required: false },
    connectivityCode: { type: String, required: false },
    connectivity: { type: String, required: false },
    processorCode: { type: String, required: false },
    processor: { type: String, required: false },
});
exports.StoreTokenSchema = new mongoose_1.default.Schema({
    userId: { type: String, required: true, select: false },
    productId: { type: String, required: false, select: false },
    tokenNumber: { type: String, required: true },
    tokenType: { type: String, default: 'open' },
    name: { type: String, required: true },
    phoneNumber: { type: Number, required: true },
    emailId: { type: String, required: false },
    categoryCode: { type: String, required: false },
    category: { type: String, required: true },
    brandCode: { type: String, required: true },
    brand: { type: String, required: true },
    productCode: { type: String, required: true },
    productTitle: { type: String, required: true },
    tokenStatus: { type: String, default: 'visited' },
    visitType: { type: String, default: 'walk-in' },
    timestamp: { type: Number, required: true },
    moreDetails: {
        colorCode: { type: String, required: false },
        color: { type: String, required: false },
        storage: { type: String, required: false },
        storageCode: { type: String, required: false },
        connectivityCode: { type: String, required: false },
        connectivity: { type: String, required: false },
        processorCode: { type: String, required: false },
        processor: { type: String, required: false },
    },
});
//# sourceMappingURL=token.model.js.map