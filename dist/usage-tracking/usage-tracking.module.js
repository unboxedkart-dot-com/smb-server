"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsageTrackingModule = void 0;
const common_1 = require("@nestjs/common");
const usage_tracking_service_1 = require("./usage-tracking.service");
const usage_tracking_controller_1 = require("./usage-tracking.controller");
const mongoose_1 = require("@nestjs/mongoose");
const user_model_1 = require("../models/user.model");
const jwt_auth_guard_1 = require("../auth/jwt-strategies/jwt-auth.guard");
const auth_module_1 = require("../auth/auth.module");
const product_model_1 = require("../models/product.model");
const tracking_notification_model_1 = require("../models/tracking-notification.model");
const carousel_item_model_1 = require("../models/carousel_item.model");
let UsageTrackingModule = class UsageTrackingModule {
};
UsageTrackingModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: 'User', schema: user_model_1.UserSchema },
                { name: 'Product', schema: product_model_1.ProductSchema },
                { name: 'TrackingNotification', schema: tracking_notification_model_1.TrackingNotificationSchema },
                { name: 'CarouselItem', schema: carousel_item_model_1.CarouselItemSchema },
            ]),
            auth_module_1.AuthModule,
        ],
        controllers: [usage_tracking_controller_1.UsageTrackingController],
        providers: [usage_tracking_service_1.UsageTrackingControllerService, jwt_auth_guard_1.JwtAuthGuard],
        exports: [usage_tracking_service_1.UsageTrackingControllerService],
    })
], UsageTrackingModule);
exports.UsageTrackingModule = UsageTrackingModule;
//# sourceMappingURL=usage-tracking.module.js.map