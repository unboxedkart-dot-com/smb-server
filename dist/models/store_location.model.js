"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StoreLocationSchema = void 0;
const mongoose_1 = require("mongoose");
exports.StoreLocationSchema = new mongoose_1.default.Schema({
    storeName: { type: String, required: true },
    streetName: { type: String, required: true },
    cityName: { type: String, required: true },
    pinCode: { type: Number, required: true },
    directionsUrl: { type: String, required: true },
    storeTimings: { type: String, required: true },
    storeOpenDays: { type: String, required: true },
    contactNumber: { type: Number, required: true },
    alternateContactNumber: { type: Number, required: false },
});
//# sourceMappingURL=store_location.model.js.map