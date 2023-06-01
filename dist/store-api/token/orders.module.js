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
const auth_module_1 = require("../../auth/auth.module");
const s3_module_1 = require("../../s3/s3.module");
const s3_service_1 = require("../../s3/s3.service");
const store_token_service_1 = require("./store-token.service");
const orders_controller_1 = require("./orders.controller");
let StoreTokenModule = class StoreTokenModule {
};
StoreTokenModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([]),
            s3_module_1.S3Module,
            auth_module_1.AuthModule,
        ],
        controllers: [orders_controller_1.StoreTokenController],
        providers: [store_token_service_1.StoreTokenService, jwt_strategy_1.JwtStrategy, s3_service_1.S3Service],
        exports: [store_token_service_1.StoreTokenService],
    })
], StoreTokenModule);
exports.StoreTokenModule = StoreTokenModule;
//# sourceMappingURL=orders.module.js.map