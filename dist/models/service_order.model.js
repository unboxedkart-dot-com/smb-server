"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceOrderSchema = void 0;
const mongoose_1 = require("mongoose");
const ordered_service_model_1 = require("./ordered_service.model");
exports.ServiceOrderSchema = new mongoose_1.default.Schema({
    orderNumber: { type: String, required: true },
    userId: { type: String, required: true },
    productTitle: { type: String, required: true },
    orderStatus: { type: String, required: true, default: 'REQUESTED' },
    productCode: { type: String, required: true },
    color: { type: String, required: true },
    colorCode: { type: String, required: true },
    serialNumber: { type: String, required: true },
    dateInString: { type: String, required: true },
    visitDate: { type: String, required: true },
    services: { type: [ordered_service_model_1.OrderedServiceSchema], required: true },
    timestamp: { type: Date, default: Date() },
    diagnosisFee: { type: Number, required: true },
});
//# sourceMappingURL=service_order.model.js.map