"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserSchema = exports.userRoles = void 0;
const mongoose_1 = require("mongoose");
var userRoles;
(function (userRoles) {
    userRoles["USER"] = "USER";
    userRoles["SELLER"] = "SELLER";
    userRoles["ADMIN"] = "ADMIN";
})(userRoles = exports.userRoles || (exports.userRoles = {}));
exports.UserSchema = new mongoose_1.default.Schema({
    createdTime: { type: String, required: true, default: Date.now().toString() },
    phoneNumber: { type: Number, required: true },
    userRole: {
        type: String,
        required: false,
        select: false,
        default: 'user',
    },
    representativeName: { type: String, required: true },
    designation: { type: String, required: true },
    emailId: { type: String, required: true },
    companyName: { type: String, required: true },
    category: { type: String, required: true },
    profilePicUrl: { type: String, required: false },
    officeAddress: { type: String, required: false },
    officeMobileNumber: { type: Number, required: true },
    isDeactivated: { type: Boolean, default: false },
    isDeleted: { type: Boolean, default: false },
});
//# sourceMappingURL=user.model.js.map