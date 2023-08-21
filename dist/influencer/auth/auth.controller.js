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
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const auth_service_1 = require("./auth.service");
const login_dto_1 = require("./dto/login.dto");
const sign_up_dto_1 = require("./dto/sign-up.dto");
const jwt_auth_guard_1 = require("./jwt-strategies/jwt-auth.guard");
const jwt_refresh_auth_guard_1 = require("./jwt-strategies/jwt-refresh-auth.guard");
let AuthController = class AuthController {
    constructor(authService) {
        this.authService = authService;
    }
    async handleHello() {
        await this.authService.setStatus();
    }
    async handleDeactivateAccount(request) {
        console.log('trying to deactibated account');
        const userId = request.user.userId;
        return this.authService.deactivateAccount(userId);
    }
    async handleDeleteAccount(request) {
        const userId = request.user.userId;
        return this.authService.deleteAccount(userId);
    }
    async handleSendOtp(phoneNumber) {
        const result = this.authService.sendOtp(parseInt(phoneNumber));
        return result;
    }
    async handleResendOtp(phoneNumber, type) {
        const result = this.authService.resendOtp(parseInt(phoneNumber), parseInt(type));
        return result;
    }
    async handleValidate(phoneNumber, otp) {
        const result = this.authService.validateOtp(parseInt(phoneNumber), parseInt(otp));
        return result;
    }
    handleLoginUser(entireBody) {
        const result = this.authService.loginUser(entireBody);
        return result;
    }
    handleSignupUser(entireBody) {
        const result = this.authService.createUser(entireBody);
        return result;
    }
    handleGetNewAccessToken(refreshToken, request) {
        const userId = request.user.userId;
        return this.authService.newAccessToken(userId, refreshToken);
    }
};
__decorate([
    (0, common_1.Post)('/hello'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "handleHello", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Patch)('/deactivate'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "handleDeactivateAccount", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Patch)('/delete'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "handleDeleteAccount", null);
__decorate([
    (0, common_1.Get)('send-otp'),
    __param(0, (0, common_1.Query)('phoneNumber')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "handleSendOtp", null);
__decorate([
    (0, common_1.Get)('resend-otp'),
    __param(0, (0, common_1.Query)('phoneNumber')),
    __param(1, (0, common_1.Query)('type')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "handleResendOtp", null);
__decorate([
    (0, common_1.Get)('validate-otp'),
    __param(0, (0, common_1.Query)('phoneNumber')),
    __param(1, (0, common_1.Query)('otp')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "handleValidate", null);
__decorate([
    (0, common_1.Post)('login'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [login_dto_1.LoginDto]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "handleLoginUser", null);
__decorate([
    (0, common_1.Post)('signup'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [sign_up_dto_1.SignUpDto]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "handleSignupUser", null);
__decorate([
    (0, common_1.UseGuards)(jwt_refresh_auth_guard_1.JwtRefreshAuthGuard),
    (0, common_1.Patch)('new-access-token'),
    __param(0, (0, common_1.Query)('refreshToken')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "handleGetNewAccessToken", null);
AuthController = __decorate([
    (0, common_1.Controller)('influencer/auth'),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], AuthController);
exports.AuthController = AuthController;
//# sourceMappingURL=auth.controller.js.map