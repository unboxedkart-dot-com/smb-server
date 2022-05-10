"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductDetailsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_decorators_1 = require("@nestjs/mongoose/dist/common/mongoose.decorators");
const mongoose_1 = require("mongoose");
let ProductDetailsService = class ProductDetailsService {
    constructor(productModel, productSpecsModel, productDataModel, productImagesModel, productDescriptionModel) {
        this.productModel = productModel;
        this.productSpecsModel = productSpecsModel;
        this.productDataModel = productDataModel;
        this.productImagesModel = productImagesModel;
        this.productDescriptionModel = productDescriptionModel;
    }
    async getProductSpecs(productId) {
        if (productId.match(/^[0-9a-fA-F]{24}$/)) {
            const product = await this.productModel.findById(productId);
            if (!product) {
                throw new common_1.NotFoundException('could not find the product');
            }
            else {
                const productSpecs = await this.productSpecsModel.findOne({
                    productCode: product.productCode,
                }, { _id: 0, productSpecs: 1 });
                return productSpecs.productSpecs;
            }
        }
        else {
            throw new common_1.NotFoundException('product id is not valid');
        }
    }
    async getProductDescription(productId) {
        if (productId.match(/^[0-9a-fA-F]{24}$/)) {
            const product = await this.productDescriptionModel.findById(productId);
            const productDetails = await this.productDescriptionModel.findOne({
                productCode: product.productCode,
            }, { _id: 0, productSpecs: 1 });
            return productDetails.productDescription;
        }
        else {
            throw new common_1.NotFoundException('product id is not valid');
        }
    }
    async addProductSpecs(entireBody) {
        const newProductSpecs = new this.productSpecsModel({
            productCode: entireBody.productCode,
            productSpecs: entireBody.productSpecs,
        });
        newProductSpecs.save();
    }
    async addProductDescription(entireBody) {
        const newProductSpecs = new this.productSpecsModel({
            productCode: entireBody.productCode,
            productSpecs: entireBody.productDescription,
        });
    }
    async addSomething() { }
    async addProductData(entireBody) {
        console.log('new entire body', entireBody);
        const newProductData = new this.productDataModel({
            productCode: entireBody.productCode,
            categoryCode: entireBody.categoryCode,
            brand: entireBody.brand,
            category: entireBody.category,
            brandCode: entireBody.brandCode,
            highlights: entireBody.highlights,
            title: entireBody.title,
            modelNumber: entireBody.modelNumber,
            modelCode: entireBody.modelCode,
            processors: entireBody.processors,
            rams: entireBody.rams,
            colors: entireBody.colors,
            storages: entireBody.storages,
        });
        newProductData.save();
    }
    async getAvailableProducts(brandCode, categoryCode) {
        console.log('given data', brandCode, categoryCode);
        const products = await this.productDataModel.find({
            brandCode: brandCode,
            categoryCode: categoryCode,
        });
        return products;
    }
    async addProductImages(entireBody) {
        const productImages = new this.productImagesModel({
            productCode: entireBody.productCode,
            colorCode: entireBody.colorCode,
            count: entireBody.count,
        });
        productImages.save();
    }
};
ProductDetailsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_decorators_1.InjectModel)('Product')),
    __param(1, (0, mongoose_decorators_1.InjectModel)('ProductSpecs')),
    __param(2, (0, mongoose_decorators_1.InjectModel)('ProductData')),
    __param(3, (0, mongoose_decorators_1.InjectModel)('ProductImages')),
    __param(4, (0, mongoose_decorators_1.InjectModel)('ProductDescription')),
    __metadata("design:paramtypes", [mongoose_1.Model,
        mongoose_1.Model,
        mongoose_1.Model,
        mongoose_1.Model,
        mongoose_1.Model])
], ProductDetailsService);
exports.ProductDetailsService = ProductDetailsService;
//# sourceMappingURL=product-details.service.js.map