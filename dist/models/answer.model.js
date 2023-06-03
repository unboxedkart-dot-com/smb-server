"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnswerSchema = exports.UserRoles = void 0;
const mongoose_1 = require("mongoose");
var UserRoles;
(function (UserRoles) {
    UserRoles["USER"] = "user";
    UserRoles["SELLER"] = "registered seller";
    UserRoles["ADMIN"] = "administrator";
})(UserRoles = exports.UserRoles || (exports.UserRoles = {}));
exports.AnswerSchema = new mongoose_1.default.Schema({
    userId: { type: String, required: true, select: false },
    userName: { type: String, required: true },
    userRole: { type: String, required: true },
    questionId: { type: String, required: true },
    isApproved: { type: Boolean, required: true, default: false },
    productId: { type: String, required: true },
    answer: { type: String, required: true },
    questionDetails: {
        questionTitle: { type: String, required: true },
        productTitle: { type: String, required: true },
        timestamp: { type: Date, required: true, default: Date.now() },
    },
    timestamp: { type: String, required: true, default: Date.now().toString() },
});
//# sourceMappingURL=answer.model.js.map