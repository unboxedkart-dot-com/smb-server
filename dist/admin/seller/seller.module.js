"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SellerModule = void 0;
const common_1 = require("@nestjs/common");
const seller_service_1 = require("./seller.service");
const seller_controller_1 = require("./seller.controller");
const mongoose_1 = require("@nestjs/mongoose");
const seller_model_1 = require("../../models/admin/seller.model");
const s3_module_1 = require("../../s3/s3.module");
const s3_service_1 = require("../../s3/s3.service");
const notifications_service_1 = require("../notifications/notifications.service");
const notifications_module_1 = require("../notifications/notifications.module");
const notification_model_1 = require("../../models/notification.model");
const auth_module_1 = require("../../auth/auth.module");
const auth_service_1 = require("../../auth/auth.service");
let SellerModule = class SellerModule {
};
SellerModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: 'Seller', schema: seller_model_1.SellerSchema },
                { name: 'Notification', schema: notification_model_1.NotificationSchema },
            ], 'adminDb'),
            s3_module_1.S3Module,
            notifications_module_1.NotificationsModule,
            auth_module_1.AuthModule,
        ],
        controllers: [seller_controller_1.SellerController],
        providers: [seller_service_1.SellerService, s3_service_1.S3Service, notifications_service_1.NotificationsService, auth_service_1.AuthService],
    })
], SellerModule);
exports.SellerModule = SellerModule;
//# sourceMappingURL=seller.module.js.map