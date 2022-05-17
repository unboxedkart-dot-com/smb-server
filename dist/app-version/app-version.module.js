"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppVersionModule = void 0;
const common_1 = require("@nestjs/common");
const app_version_service_1 = require("./app-version.service");
const app_version_controller_1 = require("./app-version.controller");
const mongoose_1 = require("@nestjs/mongoose");
const app_version_model_1 = require("../models/app_version.model");
let AppVersionModule = class AppVersionModule {
};
AppVersionModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: 'AppVersion', schema: app_version_model_1.AppVersionSchema },
            ]),
        ],
        controllers: [app_version_controller_1.AppVersionController],
        providers: [app_version_service_1.AppVersionService],
    })
], AppVersionModule);
exports.AppVersionModule = AppVersionModule;
//# sourceMappingURL=app-version.module.js.map