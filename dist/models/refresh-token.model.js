"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RefreshTokenSchema = void 0;
const mongoose_1 = require("mongoose");
exports.RefreshTokenSchema = new mongoose_1.default.Schema({
    token: { type: String, required: true },
    isActive: { type: Boolean, required: true, default: true },
    userId: { type: String, required: true },
});
//# sourceMappingURL=refresh-token.model.js.map