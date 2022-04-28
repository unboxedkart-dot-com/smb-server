"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrdersModule = void 0;
const common_1 = require("@nestjs/common");
const orders_service_1 = require("./orders.service");
const orders_controller_1 = require("./orders.controller");
const mongoose_1 = require("@nestjs/mongoose");
const order_model_1 = require("../models/order.model");
const jwt_strategy_1 = require("../auth/jwt.strategy");
const product_model_1 = require("../models/product.model");
const coupon_model_1 = require("../models/coupon.model");
const orderItem_model_1 = require("../models/orderItem.model");
const user_model_1 = require("../models/user.model");
const review_model_1 = require("../models/review.model");
const referral_order_1 = require("../models/referral_order");
const item_purchased_user_model_1 = require("../models/item-purchased-user.model");
const auth_module_1 = require("../auth/auth.module");
let OrdersModule = class OrdersModule {
};
OrdersModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: 'Order', schema: order_model_1.OrderSchema },
                { name: 'Product', schema: product_model_1.ProductSchema },
                { name: 'Coupon', schema: coupon_model_1.CouponSchema },
                { name: 'OrderItem', schema: orderItem_model_1.OrderItemSchema },
                { name: 'User', schema: user_model_1.UserSchema },
                { name: 'Review', schema: review_model_1.ReviewSchema },
                { name: 'ReferralOrder', schema: referral_order_1.ReferralOrderSchema },
                { name: 'ItemPurchasedUsers', schema: item_purchased_user_model_1.ItemPurchasedUsersSchema },
            ]),
            auth_module_1.AuthModule,
        ],
        controllers: [orders_controller_1.OrdersController],
        providers: [orders_service_1.OrdersService, jwt_strategy_1.JwtStrategy],
    })
], OrdersModule);
exports.OrdersModule = OrdersModule;
//# sourceMappingURL=orders.module.js.map