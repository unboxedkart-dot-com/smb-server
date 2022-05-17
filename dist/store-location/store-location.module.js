"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StoreLocationModule = void 0;
const common_1 = require("@nestjs/common");
const store_location_service_1 = require("./store-location.service");
const store_location_controller_1 = require("./store-location.controller");
const jwt_auth_guard_1 = require("../auth/jwt-strategies/jwt-auth.guard");
const mongoose_1 = require("@nestjs/mongoose");
const store_location_model_1 = require("../models/store_location.model");
let StoreLocationModule = class StoreLocationModule {
};
StoreLocationModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: 'StoreLocation', schema: store_location_model_1.StoreLocationSchema },
            ]),
        ],
        controllers: [store_location_controller_1.StoreLocationController],
        providers: [store_location_service_1.StoreLocationService, jwt_auth_guard_1.JwtAuthGuard],
    })
], StoreLocationModule);
exports.StoreLocationModule = StoreLocationModule;
//# sourceMappingURL=store-location.module.js.map