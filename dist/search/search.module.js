"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SearchModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const jwt_auth_guard_1 = require("../auth/jwt-strategies/jwt-auth.guard");
const product_model_1 = require("../models/product.model");
const search_term_1 = require("../models/search_term");
const user_model_1 = require("../models/user.model");
const search_controller_1 = require("./search.controller");
const search_service_1 = require("./search.service");
let SearchModule = class SearchModule {
};
SearchModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: 'Product', schema: product_model_1.ProductSchema },
                { name: 'User', schema: user_model_1.UserSchema },
                { name: 'SearchTerm', schema: search_term_1.SearchTermSchema },
            ]),
        ],
        controllers: [search_controller_1.SearchController],
        providers: [search_service_1.SearchService, jwt_auth_guard_1.JwtAuthGuard],
    })
], SearchModule);
exports.SearchModule = SearchModule;
//# sourceMappingURL=search.module.js.map