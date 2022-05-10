"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductsModule = void 0;
const common_1 = require("@nestjs/common");
const products_controller_1 = require("./products.controller");
const products_service_1 = require("./products.service");
const mongoose_1 = require("@nestjs/mongoose");
const product_model_1 = require("../models/product.model");
const review_model_1 = require("../models/review.model");
const q_and_a_model_1 = require("../models/q_and_a.model");
const product_specs_1 = require("../models/product-specs");
const auth_module_1 = require("../auth/auth.module");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const product_data_model_1 = require("../models/product_data.model");
const product_images_model_1 = require("../models/product_images.model");
let ProductsModule = class ProductsModule {
};
ProductsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: 'Product', schema: product_model_1.ProductSchema },
                { name: 'Review', schema: review_model_1.ReviewSchema },
                { name: 'QuestionAndAnswer', schema: q_and_a_model_1.QuestionAndAnswerSchema },
                { name: 'ProductSpecs', schema: product_specs_1.ProductSpecsSchema },
                { name: 'ProductData', schema: product_data_model_1.ProductDataSchema },
                { name: 'ProductImages', schema: product_images_model_1.ProductImagesSchema },
            ]),
            auth_module_1.AuthModule,
        ],
        controllers: [products_controller_1.ProductsController],
        providers: [products_service_1.ProductsService, jwt_auth_guard_1.JwtAuthGuard],
    })
], ProductsModule);
exports.ProductsModule = ProductsModule;
//# sourceMappingURL=product.module.js.map