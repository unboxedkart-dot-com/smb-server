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
const auth_service_1 = require("../../auth/auth.service");
const auth_service_2 = require("./auth.service");
const jwt_auth_guard_1 = require("./jwt-strategies/jwt-auth.guard");
let AuthController = class AuthController {
    constructor(authService, adminAuthService) {
        this.authService = authService;
        this.adminAuthService = adminAuthService;
    }
    async handlePrintHello(request) {
        console.log('request', request.user.userId);
        return request.user.userId;
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
    async hanldeLoginAdmin(phoneNumber, otp) {
        const result = this.authService.validateOtp(parseInt(phoneNumber), parseInt(otp));
        if (result['status'] == 'sucess') {
            return await this.adminAuthService.loginAdmin(phoneNumber);
        }
    }
};
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)(),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "handlePrintHello", null);
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
    __param(0, (0, common_1.Query)('phoneNumber')),
    __param(1, (0, common_1.Query)('otp')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "hanldeLoginAdmin", null);
AuthController = __decorate([
    (0, common_1.Controller)('auth'),
    __param(0, (0, common_1.Inject)((0, common_1.forwardRef)(() => auth_service_1.AuthService))),
    __metadata("design:paramtypes", [auth_service_1.AuthService,
        auth_service_2.AuthService])
], AuthController);
exports.AuthController = AuthController;
//# sourceMappingURL=auth.controller.js.map