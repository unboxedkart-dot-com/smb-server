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
exports.StoreTokenController = void 0;
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("../auth/jwt-strategies/jwt-auth.guard");
const create_enquiry_dto_1 = require("./dto/create-enquiry.dto");
const create_token_dto_1 = require("./dto/create-token.dto");
const store_token_service_1 = require("./store-token.service");
let StoreTokenController = class StoreTokenController {
    constructor(storeTokenService) {
        this.storeTokenService = storeTokenService;
    }
    async handleCreateToken(request, entireBody) {
        const userId = request.user.userId;
        return await this.storeTokenService.handleCreateToken(userId, entireBody);
    }
    async handleGetTokens(startDate, endDate) {
        return await this.storeTokenService.handleGetTokens(startDate, endDate);
    }
    async handleCreateEnquiry(request, entireBody) {
        const userId = request.user.userId;
        return await this.storeTokenService.handleCreateEnquiry(userId, entireBody);
    }
    async handleGetEnquiries(startDate, endDate) {
        return await this.storeTokenService.handleGetTokens(startDate, endDate);
    }
};
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)('/create'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_token_dto_1.CreateTokenDto]),
    __metadata("design:returntype", Promise)
], StoreTokenController.prototype, "handleCreateToken", null);
__decorate([
    (0, common_1.Get)('/get-tokens'),
    __param(0, (0, common_1.Query)('startDate')),
    __param(1, (0, common_1.Query)('endDate')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], StoreTokenController.prototype, "handleGetTokens", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)('/create-enquiry'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_enquiry_dto_1.CreateEnquiryDto]),
    __metadata("design:returntype", Promise)
], StoreTokenController.prototype, "handleCreateEnquiry", null);
__decorate([
    (0, common_1.Get)('/get-enquiries'),
    __param(0, (0, common_1.Query)('startDate')),
    __param(1, (0, common_1.Query)('endDate')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], StoreTokenController.prototype, "handleGetEnquiries", null);
StoreTokenController = __decorate([
    (0, common_1.Controller)('store-app'),
    __metadata("design:paramtypes", [store_token_service_1.StoreTokenService])
], StoreTokenController);
exports.StoreTokenController = StoreTokenController;
//# sourceMappingURL=store-token.controller.js.map