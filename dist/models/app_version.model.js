"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppVersionSchema = void 0;
const mongoose_1 = require("mongoose");
exports.AppVersionSchema = new mongoose_1.default.Schema({
    version: { type: String, required: true },
    minAppVersion: { type: String, required: true },
    publishDate: { type: String, required: true },
    description: { type: String, required: true },
    timestamp: { type: Date, default: Date.now() },
});
//# sourceMappingURL=app_version.model.js.map