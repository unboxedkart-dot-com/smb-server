"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SearchTermSchema = void 0;
const mongoose_1 = require("mongoose");
exports.SearchTermSchema = new mongoose_1.default.Schema({
    searchTerm: { type: String, required: true },
    timestamp: { type: Date, required: true, default: Date.now(), select: false },
    isPopular: { type: Boolean, required: false, select: false },
    userId: { type: String, required: false, select: false },
});
//# sourceMappingURL=search_term.js.map