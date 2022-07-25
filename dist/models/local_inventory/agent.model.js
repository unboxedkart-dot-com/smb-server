"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AgentSchema = void 0;
const mongoose_1 = require("mongoose");
exports.AgentSchema = new mongoose_1.default.Schema({
    name: { type: String, required: true },
    idProofDoc: { type: String },
    idProofNumber: { type: String },
    phoneNumber: { type: Number, required: true },
    alternatePhoneNumber: { type: Number },
    city: { type: String },
});
//# sourceMappingURL=agent.model.js.map