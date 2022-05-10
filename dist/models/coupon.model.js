"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CouponSchema = exports.ExpiryTypes = exports.RedemptionTypes = exports.CouponTypes = void 0;
const mongoose_1 = require("mongoose");
var CouponTypes;
(function (CouponTypes) {
    CouponTypes["FLAT"] = "FLAT";
    CouponTypes["PERCENTAGE"] = "PERCENTAGE";
    CouponTypes["UPTO"] = "UPTO";
})(CouponTypes = exports.CouponTypes || (exports.CouponTypes = {}));
var RedemptionTypes;
(function (RedemptionTypes) {
    RedemptionTypes["LIMITED"] = "LIMITED";
    RedemptionTypes["UNLIMITED"] = "UNLIMITED";
})(RedemptionTypes = exports.RedemptionTypes || (exports.RedemptionTypes = {}));
var ExpiryTypes;
(function (ExpiryTypes) {
    ExpiryTypes["LIMITED_TIME"] = "LIMITED TIME";
    ExpiryTypes["NON_EXPIRABLE"] = "NON EXPIRABLE";
})(ExpiryTypes = exports.ExpiryTypes || (exports.ExpiryTypes = {}));
exports.CouponSchema = new mongoose_1.default.Schema({
    couponCode: { type: String, required: true, select: true },
    description: { type: String, required: true },
    discountAmount: { type: Number, required: true },
    minimumOrderTotal: { type: Number, required: true },
    discountType: { type: String, required: true },
    redemptionType: { type: String, required: true },
    expiryType: { type: String, required: true },
    expiryTime: { type: Date, required: true, default: Date.now() },
    redemptionLimit: { type: Number, required: false },
    isPersonalCoupon: { type: Boolean, required: true, default: false },
    isActive: { type: Boolean, required: true, default: true },
    couponDetails: {
        userId: { type: String, select: false },
        phoneNumber: { type: Number },
        userName: { type: String },
        userEmail: { type: String },
    },
});
//# sourceMappingURL=coupon.model.js.map