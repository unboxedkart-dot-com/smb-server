"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductDetailsModule = void 0;
const common_1 = require("@nestjs/common");
const product_details_service_1 = require("./product-details.service");
const product_details_controller_1 = require("./product-details.controller");
const mongoose_1 = require("@nestjs/mongoose");
const product_specs_1 = require("../../models/product-specs");
const product_description_1 = require("../../models/product-description");
const product_model_1 = require("../../models/product.model");
const product_data_model_1 = require("../../models/product_data.model");
const product_images_model_1 = require("../../models/product_images.model");
let ProductDetailsModule = class ProductDetailsModule {
};
ProductDetailsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: 'ProductSpecs', schema: product_specs_1.ProductSpecsSchema },
                { name: 'ProductDescription', schema: product_description_1.ProductDescriptionSchema },
                { name: 'ProductData', schema: product_data_model_1.ProductDataSchema },
                { name: 'ProductImages', schema: product_images_model_1.ProductImagesSchema },
                { name: 'Product', schema: product_model_1.ProductSchema },
            ]),
        ],
        controllers: [product_details_controller_1.ProductDetailsController],
        providers: [product_details_service_1.ProductDetailsService],
    })
], ProductDetailsModule);
exports.ProductDetailsModule = ProductDetailsModule;
//# sourceMappingURL=product-details.module.js.map