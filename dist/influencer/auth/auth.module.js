"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InfluencerAuthModule = void 0;
const axios_1 = require("@nestjs/axios");
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const jwt_1 = require("@nestjs/jwt");
const mongoose_1 = require("@nestjs/mongoose");
const passport_1 = require("@nestjs/passport");
const refresh_token_model_1 = require("../../user/models/refresh-token.model");
const user_model_1 = require("../../user/models/user.model");
const jwt_strategy_1 = require("./jwt-strategies/jwt.strategy");
const auth_controller_1 = require("./auth.controller");
const auth_service_1 = require("./auth.service");
const jwt_auth_guard_1 = require("./jwt-strategies/jwt-auth.guard");
const jwt_refresh_strategy_1 = require("./jwt-strategies/jwt-refresh.strategy");
const influencer_model_1 = require("../models/influencer.model");
let InfluencerAuthModule = class InfluencerAuthModule {
};
InfluencerAuthModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: 'Influencer', schema: influencer_model_1.InfluencerSchema },
                { name: 'User', schema: user_model_1.UserSchema },
                { name: 'RefreshToken', schema: refresh_token_model_1.RefreshTokenSchema },
            ], 'influencerDb'),
            passport_1.PassportModule,
            axios_1.HttpModule,
            jwt_1.JwtModule.registerAsync({
                imports: [config_1.ConfigModule],
                useFactory: async () => ({
                    secret: 'raina',
                }),
            }),
        ],
        controllers: [auth_controller_1.AuthController],
        providers: [auth_service_1.AuthService, jwt_strategy_1.JwtStrategy, jwt_refresh_strategy_1.JwtRefreshStrategy, jwt_auth_guard_1.JwtAuthGuard],
        exports: [auth_service_1.AuthService],
    })
], InfluencerAuthModule);
exports.InfluencerAuthModule = InfluencerAuthModule;
//# sourceMappingURL=auth.module.js.map