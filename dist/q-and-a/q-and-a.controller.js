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
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const create_answer_dto_1 = require("./dto/create_answer.dto");
const create_question_dto_1 = require("./dto/create_question.dto");
const q_and_a_service_1 = require("./q-and-a.service");
let QAndAController = class QAndAController {
    constructor(qAndAService) {
        this.qAndAService = qAndAService;
    }
    async handleCreateQuestion(request, entireBody) {
        const userId = request.user.userId;
        const question = await this.qAndAService.createQuestion(userId, entireBody.question, entireBody.productId);
        return 'question added';
    }
    async handleCreateAnswer(request, entireBody) {
        const userId = request.user.userId;
        await this.qAndAService.createAnswer(userId, entireBody.answer, entireBody.questionId);
        return 'answer added';
    }
    async handleApproveQuestion(questionId) {
        await this.qAndAService.approveQuestion(questionId);
    }
    async handleApproveAnswer(answerId) {
        await this.qAndAService.approveAnswer(answerId);
    }
    async handleGetQuestionAndAnswers(productId) {
        const result = await this.qAndAService.getQuestionAndAnswers(productId);
        return result;
    }
};
__decorate([
    (0, common_1.Post)('create/question'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_question_dto_1.CreateQuestionDto]),
    __metadata("design:returntype", Promise)
], QAndAController.prototype, "handleCreateQuestion", null);
__decorate([
    (0, common_1.Post)('/create/answer'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_answer_dto_1.CreateAnswerDto]),
    __metadata("design:returntype", Promise)
], QAndAController.prototype, "handleCreateAnswer", null);
__decorate([
    (0, common_1.Post)('approve/question/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], QAndAController.prototype, "handleApproveQuestion", null);
__decorate([
    (0, common_1.Post)('approve/answer/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], QAndAController.prototype, "handleApproveAnswer", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], QAndAController.prototype, "handleGetQuestionAndAnswers", null);
QAndAController = __decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Controller)('q-and-a'),
    __metadata("design:paramtypes", [q_and_a_service_1.QAndAService])
], QAndAController);
exports.QAndAController = QAndAController;
//# sourceMappingURL=q-and-a.controller.js.map