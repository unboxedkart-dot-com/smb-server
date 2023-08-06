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
exports.CampaignController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const s3_service_1 = require("../../s3/s3.service");
const campaign_service_1 = require("./campaign.service");
const new_campaign_dto_1 = require("./dto/new-campaign.dto");
let CampaignController = class CampaignController {
    constructor(campaignService, s3Service) {
        this.campaignService = campaignService;
        this.s3Service = s3Service;
    }
    async handleUploadInvoice(file, request, Body) {
        console.log('uploading photo', file, typeof file);
        const response = this.s3Service.uploadImage(file);
        return response;
    }
    async handleUploadVideo(file, request, Body) {
        console.log('uploading video', file, typeof file);
        const response = this.s3Service.uploadVideo(file);
        return response;
    }
    async handleGetPayableAmount(request) {
        console.log('getting payable amount');
        const userId = request.user.userId;
        const response = await this.campaignService.getPayableAmount(userId);
        console.log(response);
        return response;
    }
    async handleGetUserData(request, entireBody) {
        const userId = request.user.userId;
        const response = await this.campaignService.addNewCampaign(userId, entireBody);
        return response;
    }
};
__decorate([
    (0, common_1.Post)('/upload-image'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file')),
    __param(0, (0, common_1.UploadedFile)()),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], CampaignController.prototype, "handleUploadInvoice", null);
__decorate([
    (0, common_1.Post)('/upload-video'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file')),
    __param(0, (0, common_1.UploadedFile)()),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], CampaignController.prototype, "handleUploadVideo", null);
__decorate([
    (0, common_1.Get)('payable-amount'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CampaignController.prototype, "handleGetPayableAmount", null);
__decorate([
    (0, common_1.Post)('/create-campaign'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, new_campaign_dto_1.NewCampaignDto]),
    __metadata("design:returntype", Promise)
], CampaignController.prototype, "handleGetUserData", null);
CampaignController = __decorate([
    (0, common_1.Controller)('user/campaigns'),
    __param(1, (0, common_1.Inject)((0, common_1.forwardRef)(() => s3_service_1.S3Service))),
    __metadata("design:paramtypes", [campaign_service_1.CampaignService,
        s3_service_1.S3Service])
], CampaignController);
exports.CampaignController = CampaignController;
//# sourceMappingURL=campaign.controller.js.map