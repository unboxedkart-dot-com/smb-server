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
let ProductsService = class ProductsService {
    constructor(productModel, reviewModel, questionAndAnswersModel) {
        this.productModel = productModel;
        this.reviewModel = reviewModel;
        this.questionAndAnswersModel = questionAndAnswersModel;
    }
    async insertProduct(product) {
        const newProduct = new this.productModel(product);
        const result = await newProduct.save();
        return result.id;
    }
    async getProducts() {
        const products = await this.productModel.find().exec();
        return products;
    }
    async getProduct(id) {
        if (id.match(/^[0-9a-fA-F]{24}$/)) {
            const product = await this.productModel.findById(id);
            if (!product) {
                throw new common_1.NotFoundException('could not find product');
            }
            const productQuestionAndAnswers = await this.questionAndAnswersModel.find({
                productId: id,
            });
            const productReviews = await this.reviewModel.find({
                productId: id,
            }).limit(10);
            const reviewsData = await this.reviewModel.find({ productId: id });
            return {
                product: product,
                reviewsData: reviewsData,
                productQAndA: productQuestionAndAnswers,
            };
        }
        else {
            throw new common_1.NotFoundException('could not find product');
        }
    }
    async deleteProducts() {
        await this.productModel.deleteMany({});
    }
    async deleteSingleProduct(id) {
        await this.productModel.deleteOne({ id: id });
    }
    async getBestSellers(brand, category, condition) {
        if (brand) {
            return this.getBestSellerByBrand(brand);
        }
        else if (category) {
            return this.getBestSellersByCategory(category);
        }
        else if (condition) {
            return this.getBestSellersByCondition(condition);
        }
        else {
            return this.getAllBestSellers();
        }
    }
    async getFeaturedProducts(brand, category, condition) {
        if (brand) {
            return this.getFeaturedProductsByBrand(brand);
        }
        else if (category) {
            return this.getFeaturedProductsByCategory(category);
        }
        else if (condition) {
            return this.getFeaturedProductsByCondition(condition);
        }
        else {
            return this.getAllFeaturedProducts();
        }
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
            .find({
            isFeatured: { $eq: true },
            brandCode: { $eq: brand },
        })
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
    __param(1, (0, mongoose_1.InjectModel)('Review')),
    __param(2, (0, mongoose_1.InjectModel)('QuestionAndAnswer')),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model])
], ProductsService);
exports.ProductsService = ProductsService;
//# sourceMappingURL=products.service.js.map