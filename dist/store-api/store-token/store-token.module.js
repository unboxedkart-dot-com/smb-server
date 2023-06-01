"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StoreTokenModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const jwt_strategy_1 = require("../../auth/jwt-strategies/jwt.strategy");
const user_model_1 = require("../../models/user.model");
const auth_module_1 = require("../../auth/auth.module");
const store_token_service_1 = require("./store-token.service");
const store_token_controller_1 = require("./store-token.controller");
const token_model_1 = require("../../models/store-app/token.model");
const store_notification_model_1 = require("../../models/store-app/store-notification.model");
let StoreTokenModule = class StoreTokenModule {
};
StoreTokenModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: 'StoreToken', schema: token_model_1.StoreTokenSchema },
                { name: 'StoreNotication', schema: store_notification_model_1.StoreNotificationSchema },
            ], 'storeDb'),
            mongoose_1.MongooseModule.forFeature([{ name: 'User', schema: user_model_1.UserSchema }]),
            auth_module_1.AuthModule,
        ],
        controllers: [store_token_controller_1.StoreTokenController],
        providers: [store_token_service_1.StoreTokenService, jwt_strategy_1.JwtStrategy],
        exports: [store_token_service_1.StoreTokenService],
    })
], StoreTokenModule);
exports.StoreTokenModule = StoreTokenModule;
//# sourceMappingURL=store-token.module.js.map