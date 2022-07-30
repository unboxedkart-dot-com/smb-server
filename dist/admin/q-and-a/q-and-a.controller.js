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
exports.QAndAController = void 0;
const common_1 = require("@nestjs/common");
const auth_service_1 = require("../../auth/auth.service");
const jwt_auth_guard_1 = require("../../auth/jwt-strategies/jwt-auth.guard");
const q_and_a_service_1 = require("./q-and-a.service");
let QAndAController = class QAndAController {
    constructor(qAndAService, authService) {
        this.qAndAService = qAndAService;
        this.authService = authService;
    }
    async handleGetApprovedAnswers(request) {
        const userId = request.user.userId;
        const isAdmin = await this.authService.CheckIfAdmin(userId);
        if (isAdmin) {
            const response = await this.qAndAService.getApprovedAnswers();
            return response;
        }
        else {
            throw new common_1.ForbiddenException('you are not allowed to perform this action');
        }
    }
    async handleGetNewAnswers(request) {
        const userId = request.user.userId;
        const isAdmin = await this.authService.CheckIfAdmin(userId);
        if (isAdmin) {
            const response = await this.qAndAService.getNewAnswers();
            return response;
        }
        else {
            throw new common_1.ForbiddenException('you are not allowed to perform this action');
        }
    }
    async handleGetNewQuestions(request) {
        const userId = request.user.userId;
        const isAdmin = await this.authService.CheckIfAdmin(userId);
        if (isAdmin) {
            const response = await this.qAndAService.getNewQuestions();
            return response;
        }
        else {
            throw new common_1.ForbiddenException('you are not allowed to perform this action');
        }
    }
    async handleApproveAnswer(answerId, request) {
        const userId = request.user.userId;
        const isAdmin = await this.authService.CheckIfAdmin(userId);
        if (isAdmin) {
            await this.qAndAService.approveAnswer(answerId);
        }
        else {
            throw new common_1.UnauthorizedException();
        }
    }
    async handleApproveQuestion(questionId, request) {
        const userId = request.user.userId;
        await this.qAndAService.approveQuestion(userId, questionId);
    }
    async handleGetApprovedQAndA(request) {
        const userId = request.user.userId;
        const isAdmin = await this.authService.CheckIfAdmin(userId);
        if (isAdmin) {
            const response = await this.qAndAService.getApprovedQAndA();
            return response;
        }
        else {
            throw new common_1.ForbiddenException('you are not allowed to perform this action');
        }
    }
};
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)('/approved-answers'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], QAndAController.prototype, "handleGetApprovedAnswers", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)('/new-answers'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], QAndAController.prototype, "handleGetNewAnswers", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)('/new-questions'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], QAndAController.prototype, "handleGetNewQuestions", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)('approve-answer/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], QAndAController.prototype, "handleApproveAnswer", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Patch)('approve-question/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], QAndAController.prototype, "handleApproveQuestion", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)('/approved-questions'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], QAndAController.prototype, "handleGetApprovedQAndA", null);
QAndAController = __decorate([
    (0, common_1.Controller)('q-and-a'),
    __param(1, (0, common_1.Inject)((0, common_1.forwardRef)(() => auth_service_1.AuthService))),
    __metadata("design:paramtypes", [q_and_a_service_1.QAndAService,
        auth_service_1.AuthService])
], QAndAController);
exports.QAndAController = QAndAController;
//# sourceMappingURL=q-and-a.controller.js.map