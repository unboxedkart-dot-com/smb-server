"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReviewsModule = void 0;
const common_1 = require("@nestjs/common");
const reviews_service_1 = require("./reviews.service");
const reviews_controller_1 = require("./reviews.controller");
const mongoose_1 = require("@nestjs/mongoose");
const review_model_1 = require("../models/review.model");
const reviews_data_model_1 = require("../models/reviews_data.model");
const user_model_1 = require("../models/user.model");
const product_model_1 = require("../models/product.model");
let ReviewsModule = class ReviewsModule {
};
ReviewsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: 'Review', schema: review_model_1.ReviewSchema },
                { name: 'ReviewsData', schema: reviews_data_model_1.ReviewsDataSchema },
                { name: 'User', schema: user_model_1.UserSchema },
                { name: 'Product', schema: product_model_1.ProductSchema },
            ]),
        ],
        controllers: [reviews_controller_1.ReviewsController],
        providers: [reviews_service_1.ReviewsService],
    })
], ReviewsModule);
exports.ReviewsModule = ReviewsModule;
//# sourceMappingURL=reviews.module.js.map