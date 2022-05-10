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
exports.FaqsController = void 0;
const common_1 = require("@nestjs/common");
const auth_service_1 = require("../auth/auth.service");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const create_faq_dto_1 = require("./dto/create-faq.dto");
const faqs_service_1 = require("./faqs.service");
let FaqsController = class FaqsController {
    constructor(faqsService, authService) {
        this.faqsService = faqsService;
        this.authService = authService;
    }
    async handleGetFaqs() {
        console.log('get faqs started');
        const faqs = await this.faqsService.getFaqs();
        return faqs;
    }
    async handleCreateFaq(request, entireBody) {
        const userId = request.user.userId;
        const isAdmin = await this.authService.CheckIfAdmin(userId);
        console.log('faq body', entireBody);
        if (isAdmin) {
            await this.faqsService.createFaq(userId, entireBody);
        }
        else {
            throw new common_1.ForbiddenException('You are not allowed to perform this action');
        }
    }
};
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], FaqsController.prototype, "handleGetFaqs", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)('/add'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_faq_dto_1.CreateFaqDto]),
    __metadata("design:returntype", Promise)
], FaqsController.prototype, "handleCreateFaq", null);
FaqsController = __decorate([
    (0, common_1.Controller)('faqs'),
    __param(1, (0, common_1.Inject)((0, common_1.forwardRef)(() => auth_service_1.AuthService))),
    __metadata("design:paramtypes", [faqs_service_1.FaqsService,
        auth_service_1.AuthService])
], FaqsController);
exports.FaqsController = FaqsController;
//# sourceMappingURL=faqs.controller.js.map