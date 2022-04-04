"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FavoriteSchema = void 0;
const mongoose_1 = require("mongoose");
exports.FavoriteSchema = new mongoose_1.default.Schema({
    userId: { type: String, required: true, select: false },
    productId: { type: String, required: true },
    timestamp: { type: Date, required: true, default: Date.now() },
});
//# sourceMappingURL=favorite.model.js.map