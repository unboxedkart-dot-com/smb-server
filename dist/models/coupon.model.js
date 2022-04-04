"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CouponSchema = exports.CouponTypes = void 0;
const mongoose_1 = require("mongoose");
var CouponTypes;
(function (CouponTypes) {
    CouponTypes["FLAT"] = "FLAT";
    CouponTypes["PERCENTAGE"] = "PERCENTAGE";
    CouponTypes["UPTO"] = "UPTO";
})(CouponTypes = exports.CouponTypes || (exports.CouponTypes = {}));
exports.CouponSchema = new mongoose_1.default.Schema({
    couponCode: { type: String, required: true, select: true },
    discountAmount: { type: String, required: true },
    minimumOrderTotal: { type: Number, required: true },
    discountType: { type: String, required: true },
    expiryTime: { type: Date, required: true, default: Date.now() },
    isPersonalCoupon: { type: Boolean, required: true, default: false },
    couponDetails: {
        userId: { type: String, required: true },
        phoneNumber: { type: Number, required: true },
        userName: { type: String, required: true },
        userEmail: { type: String, required: false },
    },
});
//# sourceMappingURL=coupon.model.js.map