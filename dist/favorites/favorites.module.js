"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FavoritesModule = void 0;
const common_1 = require("@nestjs/common");
const favorites_service_1 = require("./favorites.service");
const favorites_controller_1 = require("./favorites.controller");
const mongoose_1 = require("@nestjs/mongoose");
const favorite_model_1 = require("../models/favorite.model");
const user_model_1 = require("../models/user.model");
const product_model_1 = require("../models/product.model");
const jwt_auth_guard_1 = require("../auth/jwt-strategies/jwt-auth.guard");
const Tracking_notification_model_1 = require("../models/Tracking-notification.model");
let FavoritesModule = class FavoritesModule {
};
FavoritesModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: 'Favorite', schema: favorite_model_1.FavoriteSchema },
                { name: 'User', schema: user_model_1.UserSchema },
                { name: 'Product', schema: product_model_1.ProductSchema },
                { name: 'TrackingNotification', schema: Tracking_notification_model_1.TrackingNotificationSchema },
            ]),
        ],
        controllers: [favorites_controller_1.FavoritesController],
        providers: [favorites_service_1.FavoritesService, jwt_auth_guard_1.JwtAuthGuard],
    })
], FavoritesModule);
exports.FavoritesModule = FavoritesModule;
//# sourceMappingURL=favorites.module.js.map