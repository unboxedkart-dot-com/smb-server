"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddressSchema = void 0;
const mongoose_1 = require("mongoose");
exports.AddressSchema = new mongoose_1.default.Schema({
    userId: { type: String, required: true, select: false },
    name: { type: String, required: true },
    phoneNumber: { type: Number, required: true },
    alternatePhoneNumber: { type: Number, required: false },
    doorNo: { type: String, required: true },
    lane: { type: String, required: false },
    street: { type: String, required: true },
    pinCode: { type: Number, required: true },
    cityName: { type: String, required: true },
    stateName: { type: String, required: true },
    landmark: { type: String, required: true },
    addressType: { type: String, required: true },
});
//# sourceMappingURL=address.model.js.map