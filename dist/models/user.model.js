"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserSchema = exports.userRoles = void 0;
const mongoose_1 = require("mongoose");
const order_summary_model_1 = require("./order_summary.model");
var userRoles;
(function (userRoles) {
    userRoles["USER"] = "USER";
    userRoles["SELLER"] = "SELLER";
    userRoles["ADMIN"] = "ADMIN";
})(userRoles = exports.userRoles || (exports.userRoles = {}));
exports.UserSchema = new mongoose_1.default.Schema({
    phoneNumber: { type: Number, required: true },
    userRole: {
        type: String,
        required: false,
        select: false,
        default: userRoles.USER,
    },
    name: { type: String, required: true },
    recentSearches: [
        {
            searchTerm: { type: String, required: true },
            timestamp: { type: Date, required: true, default: Date.now() },
        },
    ],
    createdTime: { type: String, required: true, default: Date.now().toString() },
    deviceId: { type: String, required: false },
    emailId: { type: String, required: false },
    gender: { type: String, required: false },
    lastLoggedIn: { type: Date, required: true, default: Date.now() },
    favoriteItemIds: { type: Array, default: [] },
    cartItemIds: { type: Array, default: [] },
    cartItems: { type: Array, default: [] },
    savedToLaterProducts: { type: Array, default: [] },
    orderSummary: { type: order_summary_model_1.OrderSummarySchema },
    personalCouponCode: { type: String, required: false },
    purchasedItemIds: { type: Array, required: false, default: [] },
    answeredQuestionIds: { type: Array, required: false, default: [] },
    isDeactivated: { type: Boolean, default: false },
    isDeleted: { type: Boolean, default: false },
});
//# sourceMappingURL=user.model.js.map