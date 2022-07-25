"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductSchema = void 0;
const mongoose_1 = require("mongoose");
const agent_model_1 = require("./agent.model");
const buyer_model_1 = require("./buyer.model");
const vendor_model_1 = require("./vendor.model");
exports.ProductSchema = new mongoose_1.default.Schema({
    productDetails: {
        description: { type: String, required: true },
        anyProblems: { type: String },
        warrantyStatus: { type: Boolean, required: false, default: false },
        warrantyEndDate: { type: String },
        warrantyEndDateInString: { type: String },
        serialNumber: { type: String, required: true },
        imei1Number: { type: String },
        imei2Number: { type: String },
        category: { type: String, required: true },
        brand: { type: String, required: true },
        grade: { type: String, required: true },
        categoryCode: { type: String, required: true },
        brandCode: { type: String, required: true },
        gradeCode: { type: String, required: true },
        productCode: { type: String, required: true },
        title: { type: String, required: true },
        boxContains: { type: String },
    },
    moreDetails: {
        ram: { type: String },
        color: { type: String },
        storage: { type: String },
        storageCode: { type: String },
        processor: { type: String },
        ramCode: { type: String },
        colorCode: { type: String },
        processorCode: { type: String },
    },
    pricingDetails: {
        buyingPrice: { type: Number, required: true },
        expectedSellingPrice: { type: Number, required: true },
        minimumSellingPrice: { type: Number, required: true },
        sellingPrice: { type: Number },
    },
    isAvailable: { type: Boolean, default: true },
    purchaseDateInString: { type: String, required: true },
    purchaseDate: { type: String, default: Date.now().toString() },
    saleDate: { type: String },
    saleDateInString: { type: String },
    originalInvoiceUrl: { type: String },
    purchaseInvoiceUrl: { type: String },
    agentDetails: { type: agent_model_1.AgentSchema },
    buyerDetails: { type: buyer_model_1.BuyerSchema },
    sellerDetails: { type: vendor_model_1.VendorSchema },
});
//# sourceMappingURL=product.model.js.map