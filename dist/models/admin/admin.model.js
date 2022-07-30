"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminSchema = void 0;
const mongoose_1 = require("mongoose");
exports.AdminSchema = new mongoose_1.default.Schema({
    phoneNumber: { type: Number, required: true },
    name: { type: String, required: true },
    createdTime: { type: Date, required: true, default: Date.now() },
    emailId: { type: String, required: false },
    gender: { type: String, required: false },
    lastLoggedIn: { type: Date, required: true, default: Date.now() },
});
//# sourceMappingURL=admin.model.js.map