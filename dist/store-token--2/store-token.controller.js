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
const auth_service_1 = require("../auth/auth.service");
const jwt_auth_guard_1 = require("../auth/jwt-strategies/jwt-auth.guard");
const s3_service_1 = require("../s3/s3.service");
const create_token_dto_1 = require("./dto/create-token.dto");
const store_token_service_1 = require("./store-token.service");
let StoreTokenController = class StoreTokenController {
    constructor(storeTokenService, authService, s3Service) {
        this.storeTokenService = storeTokenService;
        this.authService = authService;
        this.s3Service = s3Service;
    }
    async handleGetAllOrders(request, status) {
    }
    async handleCreateToken(request, entireBody) {
        const userId = request.user.userId;
        return await this.storeTokenService.handleCreateToken(userId, entireBody);
    }
};
__decorate([
    (0, common_1.Get)('/tokens'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Query)('status')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], StoreTokenController.prototype, "handleGetAllOrders", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)('/create'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_token_dto_1.CreateTokenDto]),
    __metadata("design:returntype", Promise)
], StoreTokenController.prototype, "handleCreateToken", null);
StoreTokenController = __decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Controller)('store-token'),
    __param(1, (0, common_1.Inject)((0, common_1.forwardRef)(() => auth_service_1.AuthService))),
    __param(2, (0, common_1.Inject)((0, common_1.forwardRef)(() => s3_service_1.S3Service))),
    __metadata("design:paramtypes", [store_token_service_1.StoreTokenService,
        auth_service_1.AuthService,
        s3_service_1.S3Service])
], StoreTokenController);
exports.StoreTokenController = StoreTokenController;
//# sourceMappingURL=store-token.controller.js.map