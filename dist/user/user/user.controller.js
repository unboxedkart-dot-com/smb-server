"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("../auth/jwt-strategies/jwt-auth.guard");
const update_user_details_dto_1 = require("./dto/update-user-details.dto");
const update_user_payment_details_dto_1 = require("./dto/update-user-payment-details.dto");
const user_service_1 = require("./user.service");
let UserController = class UserController {
    constructor(userService) {
        this.userService = userService;
    }
    async handleGetUserDetails(request) {
        const userId = request.user.userId;
        const response = await this.userService.getUserDetails(userId);
        return response;
    }
    async handleUpdateUserDetails(request, entireBody) {
        const userId = request.user.userId;
        const response = await this.userService.updateUserDetails(userId, entireBody);
        return response;
    }
    async handleGetUserData(request) {
        const userId = request.user.userId;
        const response = await this.userService.getUserData(userId);
        return response;
    }
    async handleUpdatePaymentDetails(request, entireBody) {
        console.log('updating payment details');
        const userId = request.user.userId;
        const response = await this.userService.updatePaymentDetails(userId, entireBody);
        return response;
    }
    async handleGetPaymentDetails(request) {
        const userId = request.user.userId;
        const response = await this.userService.getPaymentDetails(userId);
        console.log('payment details', response);
        return response;
    }
};
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "handleGetUserDetails", null);
__decorate([
    (0, common_1.Patch)('/update'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, update_user_details_dto_1.UpdateUserDetailsDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "handleUpdateUserDetails", null);
__decorate([
    (0, common_1.Get)('/user-data'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "handleGetUserData", null);
__decorate([
    (0, common_1.Patch)('/payment-details'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, update_user_payment_details_dto_1.UpdateUserPaymentDetailsDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "handleUpdatePaymentDetails", null);
__decorate([
    (0, common_1.Get)('/payment-details'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "handleGetPaymentDetails", null);
UserController = __decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Controller)('user/user-details'),
    __metadata("design:paramtypes", [user_service_1.UserService])
], UserController);
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map