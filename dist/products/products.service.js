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
exports.ProductsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const mongoose_3 = require("mongoose");
let ProductsService = class ProductsService {
    constructor(productModel, productDataModel, productImagesModel, reviewModel) {
        this.productModel = productModel;
        this.productDataModel = productDataModel;
        this.productImagesModel = productImagesModel;
        this.reviewModel = reviewModel;
    }
    async getSelectedVariant(product, condition, storage, color, processor, ram, combination, screenSize) {
        console.log('selected variant details', product, condition, storage, color, processor, ram, combination, screenSize);
        const query = {
            productCode: product,
            conditionCode: condition != undefined && condition != 'null'
                ? { $eq: condition }
                : { $exists: true },
            'moreDetails.storageCode': storage != undefined && storage != 'null'
                ? { $eq: storage }
                : { $exists: true },
            'moreDetails.colorCode': color != undefined && color != 'null'
                ? { $eq: color }
                : { $exists: true },
            'moreDetails.processorCode': processor != undefined && processor != 'null'
                ? { $eq: processor }
                : { $exists: true },
            'moreDetails.ramCode': ram != undefined && ram != 'null' ? { $eq: ram } : { $exists: true },
            'moreDetails.combinationCode': combination != undefined && combination != 'null'
                ? { $eq: combination }
                : { $exists: true },
            'moreDetails.screenSizeCode': screenSize != undefined && screenSize != 'null'
                ? { $eq: screenSize }
                : { $exists: true },
        };
        console.log('variant query', query);
        const selectedProduct = await this.productModel.findOne(query);
        if (selectedProduct) {
            return selectedProduct._id;
        }
        return null;
    }
    async getSimilarProducts(productId) {
        if (productId.match(/^[0-9a-fA-F]{24}$/)) {
            const product = await this.productModel.findById(productId);
            if (product) {
                const products = await this.productModel
                    .aggregate([
                    {
                        $match: {
                            brandCode: product.brandCode,
                            categoryCode: product.categoryCode,
                        },
                    },
                    {
                        $lookup: {
                            from: 'reviewsdatas',
                            localField: 'productCode',
                            foreignField: 'productCode',
                            as: 'rating',
                        },
                    },
                ])
                    .limit(10)
                    .exec();
                return products;
            }
        }
        else {
            throw new common_1.NotFoundException('The searched Product doesnot exists');
        }
    }
    async getRelatedProducts(productId) {
        if (productId.match(/^[0-9a-fA-F]{24}$/)) {
            const product = await this.productModel.findById(productId);
            if (product) {
                const products = await this.productModel
                    .aggregate([
                    {
                        $match: {
                            brandCode: product.brandCode,
                            categoryCode: product.categoryCode,
                        },
                    },
                    {
                        $lookup: {
                            from: 'reviewsdatas',
                            localField: 'productCode',
                            foreignField: 'productCode',
                            as: 'rating',
                        },
                    },
                ])
                    .limit(10)
                    .exec();
                return products;
            }
        }
        else {
            throw new common_1.NotFoundException('The searched Product doesnot exists');
        }
    }
    async getProduct(id) {
        const ObjectId = mongoose_2.default.Types.ObjectId;
        {
            const product = await this.productModel.findById(id);
            if (!product) {
                console.log('not exis');
                throw new common_1.NotFoundException('could not find product');
            }
            else {
                console.log('exos');
                const product = await this.productModel
                    .aggregate([
                    {
                        $match: { _id: new ObjectId(id) },
                    },
                    {
                        $lookup: {
                            from: 'reviewsdatas',
                            localField: 'productCode',
                            foreignField: 'productCode',
                            as: 'rating',
                        },
                    },
                ])
                    .limit(1);
                return product[0];
            }
        }
    }
    async getBestSellers(brand, category, condition) {
        let query = {};
        if (brand) {
            query = {
                brandCode: brand != undefined && brand != 'null'
                    ? { $eq: brand }
                    : { $exists: true },
                isFeatured: true,
            };
        }
        else if (category) {
            query = {
                categoryCode: category != undefined && category != 'null'
                    ? { $eq: category }
                    : { $exists: true },
                isFeatured: true,
            };
        }
        else if (condition) {
            query = {
                conditionCode: condition != undefined && condition != 'null'
                    ? { $eq: condition }
                    : { $exists: true },
                isFeatured: true,
            };
        }
        else {
            query = {
                conditionCode: condition != undefined && condition != 'null'
                    ? { $eq: condition }
                    : { $exists: true },
                isFeatured: true,
            };
        }
        const products = await this.productModel
            .aggregate([
            {
                $match: query,
            },
            {
                $lookup: {
                    from: 'reviewsdatas',
                    localField: 'productCode',
                    foreignField: 'productCode',
                    as: 'rating',
                },
            },
        ])
            .limit(10)
            .exec();
        return products;
    }
    async getFeaturedProducts(brand, category, condition) {
        let query = {};
        if (brand) {
            query = {
                brandCode: brand != undefined && brand != 'null'
                    ? { $eq: brand }
                    : { $exists: true },
                isFeatured: true,
            };
        }
        else if (category) {
            query = {
                categoryCode: category != undefined && category != 'null'
                    ? { $eq: category }
                    : { $exists: true },
                isFeatured: true,
            };
        }
        else if (condition) {
            query = {
                conditionCode: condition != undefined && condition != 'null'
                    ? { $eq: condition }
                    : { $exists: true },
                isFeatured: true,
            };
        }
        else {
            query = {
                conditionCode: condition != undefined && condition != 'null'
                    ? { $eq: condition }
                    : { $exists: true },
                isFeatured: true,
            };
        }
        const products = await this.productModel
            .aggregate([
            {
                $match: query,
            },
            {
                $lookup: {
                    from: 'reviewsdatas',
                    localField: 'productCode',
                    foreignField: 'productCode',
                    as: 'rating',
                },
            },
        ])
            .limit(10)
            .exec();
        return products;
    }
    async getAllBestSellers() {
        const products = await this.productModel
            .find({
            isBestSeller: { $eq: true },
        })
            .limit(10)
            .exec();
        return products;
    }
    async getBestSellerByBrand(brand) {
        const products = await this.productModel
            .find({
            isBestSeller: { $eq: true },
            brandCode: { $eq: brand },
        })
            .limit(10)
            .exec();
        return products;
    }
    async getBestSellersByCategory(category) {
        const products = await this.productModel
            .find({
            isBestSeller: { $eq: true },
            categoryCode: { $eq: category },
        })
            .limit(10)
            .exec();
        return products;
    }
    async getBestSellersByCondition(condition) {
        const products = await this.productModel
            .find({
            isBestSeller: { $eq: true },
            conditionCode: { $eq: condition },
        })
            .limit(10)
            .exec();
        return products;
    }
    async getFeaturedProductsByBrand(brand) {
        const products = await this.productModel
            .aggregate([
            {
                $match: {
                    isFeatured: { $eq: true },
                    brandCode: { $eq: brand },
                },
            },
            {
                $lookup: {
                    from: 'reviewsdatas',
                    localField: 'productCode',
                    foreignField: 'productCode',
                    as: 'rating',
                },
            },
        ])
            .limit(10)
            .exec();
        return products;
    }
    async getFeaturedProductsByCategory(category) {
        const products = await this.productModel
            .find({
            isFeatured: { $eq: true },
            categoryCode: { $eq: category },
        })
            .limit(10)
            .exec();
        return products;
    }
    async getFeaturedProductsByCondition(condition) {
        const products = await this.productModel
            .find({
            isFeatured: { $eq: true },
            conditionCode: { $eq: condition },
        })
            .limit(10)
            .exec();
        return products;
    }
    async getAllFeaturedProducts() {
        const products = await this.productModel
            .find({
            isFeatured: { $eq: true },
        })
            .limit(10)
            .exec();
        return products;
    }
};
ProductsService = __decorate([
    __param(0, (0, mongoose_1.InjectModel)('Product')),
    __param(1, (0, mongoose_1.InjectModel)('ProductData')),
    __param(2, (0, mongoose_1.InjectModel)('ProductImages')),
    __param(3, (0, mongoose_1.InjectModel)('Review')),
    __metadata("design:paramtypes", [mongoose_3.Model,
        mongoose_3.Model,
        mongoose_3.Model,
        mongoose_3.Model])
], ProductsService);
exports.ProductsService = ProductsService;
//# sourceMappingURL=products.service.js.map