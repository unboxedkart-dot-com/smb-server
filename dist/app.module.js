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
const addresses_module_1 = require("./addresses/addresses.module");
const auth_module_1 = require("./auth/auth.module");
const cart_module_1 = require("./cart/cart.module");
const coupons_module_1 = require("./coupons/coupons.module");
const faqs_module_1 = require("./faqs/faqs.module");
const favorites_module_1 = require("./favorites/favorites.module");
const mail_module_1 = require("./mail/mail.module");
const order_summary_module_1 = require("./order-summary/order-summary.module");
const orders_module_1 = require("./orders/orders.module");
const product_module_1 = require("./products/product.module");
const q_and_a_module_1 = require("./q-and-a/q-and-a.module");
const reviews_module_1 = require("./reviews/reviews.module");
const search_module_1 = require("./search/search.module");
const store_location_module_1 = require("./store-location/store-location.module");
const user_module_1 = require("./user/user.module");
const product_details_module_1 = require("./product-details/product-details.module");
const variants_module_1 = require("./variants/variants.module");
const s3_module_1 = require("./s3/s3.module");
const carousel_items_module_1 = require("./carousel-items/carousel-items.module");
const app_version_module_1 = require("./app-version/app-version.module");
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
            mail_module_1.MailModule,
            user_module_1.UserModule,
            faqs_module_1.FaqsModule,
            product_details_module_1.ProductDetailsModule,
            variants_module_1.VariantsModule,
            s3_module_1.S3Module,
            carousel_items_module_1.CarouselItemsModule,
            app_version_module_1.AppVersionModule,
        ],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map