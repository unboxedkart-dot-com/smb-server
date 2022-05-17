"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderSummaryModule = void 0;
const common_1 = require("@nestjs/common");
const order_summary_controller_1 = require("./order-summary.controller");
const mongoose_1 = require("@nestjs/mongoose");
const user_model_1 = require("../models/user.model");
const product_model_1 = require("../models/product.model");
const coupon_model_1 = require("../models/coupon.model");
const order_summary_model_1 = require("../models/order_summary.model");
const jwt_auth_guard_1 = require("../auth/jwt-strategies/jwt-auth.guard");
const order_summary_service_1 = require("./order-summary.service");
const orders_module_1 = require("../orders/orders.module");
const payment_model_1 = require("../models/payment.model");
const coupons_module_1 = require("../coupons/coupons.module");
let OrderSummaryModule = class OrderSummaryModule {
};
OrderSummaryModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: 'User', schema: user_model_1.UserSchema },
                { name: 'OrderSummary', schema: order_summary_model_1.OrderSummarySchema },
                { name: 'Product', schema: product_model_1.ProductSchema },
                { name: 'Coupon', schema: coupon_model_1.CouponSchema },
                { name: 'Payment', schema: payment_model_1.PaymentSchema },
            ]),
            orders_module_1.OrdersModule,
            coupons_module_1.CouponsModule
        ],
        controllers: [order_summary_controller_1.OrderSummaryController],
        providers: [order_summary_service_1.OrderSummaryService, jwt_auth_guard_1.JwtAuthGuard],
    })
], OrderSummaryModule);
exports.OrderSummaryModule = OrderSummaryModule;
//# sourceMappingURL=order-summary.module.js.map