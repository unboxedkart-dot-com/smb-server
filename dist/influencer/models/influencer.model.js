"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InfluencerSchema = void 0;
const mongoose_1 = require("mongoose");
exports.InfluencerSchema = new mongoose_1.default.Schema({
    createdTime: { type: String, required: true, default: Date.now().toString() },
    phoneNumber: { type: Number, required: true },
    userRole: {
        type: String,
        required: false,
        select: false,
        default: 'influencer',
    },
    name: { type: String, required: true },
    emailId: { type: String, required: true },
    contactsCount: { type: Number, required: false },
    profilePicUrl: { type: String, required: false },
    state: { type: String, required: false },
    district: { type: String, required: false },
    city: { type: String, required: false },
    pinCode: { type: Number, required: false },
    isDeactivated: { type: Boolean, default: false },
    isDeleted: { type: Boolean, default: false },
});
//# sourceMappingURL=influencer.model.js.map