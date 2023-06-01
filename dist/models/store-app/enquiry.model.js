"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EnquirySchema = exports.MoreDetails = void 0;
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
exports.EnquirySchema = new mongoose_1.default.Schema({
    name: { type: String, required: true },
    phoneNumber: { type: Number, required: true },
    advisor: { type: String, required: true },
    advisorCode: { type: String, required: true },
    enquirySourceCode: { type: String, required: false },
    enquirySource: { type: String, required: false },
    enquiryStatusCode: { type: String, required: false },
    enquiryStatus: { type: String, required: false },
    productAvailabilityCode: { type: String, required: false },
    productAvailability: { type: String, required: false },
    quotedPrice: { type: String, required: false },
    askPrice: { type: String, required: false },
    categoryCode: { type: String, required: false },
    category: { type: String, required: true },
    brandCode: { type: String, required: true },
    brand: { type: String, required: true },
    productCode: { type: String, required: true },
    productTitle: { type: String, required: true },
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
//# sourceMappingURL=enquiry.model.js.map