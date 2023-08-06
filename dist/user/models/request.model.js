"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NewRequestSchema = void 0;
const mongoose_1 = require("mongoose");
exports.NewRequestSchema = new mongoose_1.default.Schema({
    timestamp: { type: String, required: true, default: Date.now().toString() },
    title: { type: String, required: true },
    description: { type: String, required: true },
    hasImage: { type: Boolean, requied: true },
    hasVideo: { type: Boolean, requied: true },
    hasLink: { type: Boolean, requied: true },
    imageUrl: { type: String, required: true },
    videoUrl: { type: String, required: true },
    linkUrl: { type: String, required: true },
    requiredViewsCount: { type: Number, required: true },
    campaignDateInString: { type: String, required: true },
    campaignDate: { type: Date },
    preferredGender: { type: String, required: false },
    preferredState: { type: String, required: false },
    preferredDistrict: { type: String, required: false },
    preferredCity: { type: String, required: false },
    preferredPincode: { type: Number, required: false },
    userId: { type: String, required: true },
    userDetails: {
        phoneNumber: { type: Number, required: true },
        name: { type: String, required: true },
        emailId: { type: String, required: true },
        companyName: { type: String, required: true },
        officePhoneNumber: { type: String, required: true },
        officeAddress: { type: String, required: true },
    },
});
//# sourceMappingURL=request.model.js.map