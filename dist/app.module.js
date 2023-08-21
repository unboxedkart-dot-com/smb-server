"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const mongoose_1 = require("@nestjs/mongoose");
const auth_module_1 = require("./influencer/auth/auth.module");
const user_module_1 = require("./influencer/user/user.module");
const mail_module_1 = require("./mail/mail.module");
const s3_module_1 = require("./s3/s3.module");
const auth_module_2 = require("./user/auth/auth.module");
const campaign_module_1 = require("./user/campaign/campaign.module");
const user_module_2 = require("./user/user/user.module");
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({ isGlobal: true }),
            auth_module_2.AuthModule,
            mongoose_1.MongooseModule.forRoot('mongodb+srv://socialmediabook:6gWvSw5O6gvS6tc0@smb-user.wmidzts.mongodb.net/userDb?retryWrites=true&w=majority', {
                connectionName: 'userDb',
            }),
            mongoose_1.MongooseModule.forRoot('mongodb+srv://socialmediabook:6gWvSw5O6gvS6tc0@smb-user.wmidzts.mongodb.net/userDb?retryWrites=true&w=majority', {
                connectionName: 'influencerDb',
            }),
            mail_module_1.MailModule,
            user_module_2.UserModule,
            s3_module_1.S3Module,
            campaign_module_1.CampaignModule,
            auth_module_1.InfluencerAuthModule,
            user_module_1.InfluencerModule
        ],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map