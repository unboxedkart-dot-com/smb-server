"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const config_1 = require("@nestjs/config");
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const auth_module_1 = require("./auth/auth.module");
const product_module_1 = require("./products/product.module");
const search_module_1 = require("./search/search.module");
const orders_module_1 = require("./orders/orders.module");
const favorites_module_1 = require("./favorites/favorites.module");
const cart_module_1 = require("./cart/cart.module");
const addresses_module_1 = require("./addresses/addresses.module");
const reviews_module_1 = require("./reviews/reviews.module");
const coupons_module_1 = require("./coupons/coupons.module");
const q_and_a_module_1 = require("./q-and-a/q-and-a.module");
const order_summary_module_1 = require("./order-summary/order-summary.module");
const store_location_module_1 = require("./store-location/store-location.module");
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({ isGlobal: true }),
            product_module_1.ProductsModule,
            search_module_1.SearchModule,
            auth_module_1.AuthModule,
            mongoose_1.MongooseModule.forRoot(process.env.DB_CONNECTION_URL),
            orders_module_1.OrdersModule,
            favorites_module_1.FavoritesModule,
            cart_module_1.CartModule,
            addresses_module_1.AddressesModule,
            reviews_module_1.ReviewsModule,
            q_and_a_module_1.QAndAModule,
            coupons_module_1.CouponsModule,
            order_summary_module_1.OrderSummaryModule,
            store_location_module_1.StoreLocationModule,
        ],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map