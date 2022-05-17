"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CarouselItemSchema = exports.UserRoles = void 0;
const mongoose_1 = require("mongoose");
var UserRoles;
(function (UserRoles) {
    UserRoles["USER"] = "user";
    UserRoles["SELLER"] = "registered seller";
    UserRoles["ADMIN"] = "administrator";
})(UserRoles = exports.UserRoles || (exports.UserRoles = {}));
exports.CarouselItemSchema = new mongoose_1.default.Schema({
    imageUrl: { type: String, required: true },
    placement: { type: String, required: true },
    brandCode: { type: String },
    categoryCode: { type: String },
    conditionCode: { type: String },
    title: { type: String },
    productCode: { type: String },
    isExact: { type: Boolean, default: false },
    productId: { type: String },
    isActive: { type: Boolean, default: true },
});
//# sourceMappingURL=carousel_item.model.js.map