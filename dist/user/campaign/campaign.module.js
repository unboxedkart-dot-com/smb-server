"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CampaignModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const s3_module_1 = require("../../s3/s3.module");
const s3_service_1 = require("../../s3/s3.service");
const user_model_1 = require("../models/user.model");
const jwt_auth_guard_1 = require("../auth/jwt-strategies/jwt-auth.guard");
const campaign_model_1 = require("../models/campaign.model");
const campaign_controller_1 = require("./campaign.controller");
const campaign_service_1 = require("./campaign.service");
let CampaignModule = class CampaignModule {
};
CampaignModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: 'User', schema: user_model_1.UserSchema },
                { name: 'Campaign', schema: campaign_model_1.CampaignSchema },
            ], 'userDb'),
            s3_module_1.S3Module,
        ],
        controllers: [campaign_controller_1.CampaignController],
        providers: [campaign_service_1.CampaignService, jwt_auth_guard_1.JwtAuthGuard, s3_service_1.S3Service],
    })
], CampaignModule);
exports.CampaignModule = CampaignModule;
//# sourceMappingURL=campaign.module.js.map