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
exports.SearchService = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let SearchService = class SearchService {
    constructor(productModel, userModel, searchTermModel) {
        this.productModel = productModel;
        this.userModel = userModel;
        this.searchTermModel = searchTermModel;
    }
    async getSearchedProducts(title, category, brand, condition, pageNumber) {
        if (!title) {
            if (category && brand) {
                const products = await this._getProductsByCategoryAndBrand(category, brand);
                return products;
            }
            else if (category && condition) {
                const products = await this._getProductsByConditionAndCategory(condition, category);
                return products;
            }
            else if (brand && condition) {
                const products = await this._getProductsByBrandAndCondition(brand, condition);
                return products;
            }
        }
        else {
            const products = await this._getProductsByTitle(title, pageNumber);
            return products;
        }
    }
    async _getProductsByTitle(title, pageNumber) {
        var itemsToSkip = 0;
        if (pageNumber && parseInt(pageNumber) > 0) {
            itemsToSkip = 10 * parseInt(pageNumber) - 10;
        }
        const searchTerm = title.replace(/\s/g, '');
        const products = await this.productModel
            .find({
            searchCases: searchTerm,
        })
            .limit(10)
            .skip(itemsToSkip)
            .exec();
        return products;
    }
    async getRecentSearches(userId) {
        const recentSearches = await this.userModel
            .findById(userId, {
            recentSearches: 1,
            _id: 0,
            length: 3,
        })
            .limit(3);
        return recentSearches.recentSearches;
    }
    async addRecentSearchTerm(userId, searchTerm) {
        const recentSearches = await this.userModel.findByIdAndUpdate(userId, {
            $push: {
                recentSearches: {
                    searchTerm: searchTerm,
                },
            },
        });
        console.log('rs', searchTerm);
    }
    async addPopularSearchTerm(userId, searchTerm) {
        const newSearchTerm = new this.searchTermModel({
            searchTerm: searchTerm,
            isPopular: true,
            userId: userId,
        });
        newSearchTerm.save();
    }
    async getPopularSearches() {
        const popularSearches = await this.searchTermModel
            .find({ isPopular: true })
            .limit(3);
        return popularSearches;
    }
    async _getProductsByCategoryAndBrand(category, brand) {
        const products = await this.productModel
            .find({
            categoryCode: { $eq: category },
            brandCode: { $eq: brand },
        })
            .exec();
        return products;
    }
    async _getProductsByBrandAndCondition(brand, condition) {
        const products = await this.productModel
            .find({
            brandCode: { $eq: brand },
            conditionCode: { $eq: condition },
        })
            .exec();
        return products;
    }
    async _getProductsByConditionAndCategory(condition, category) {
        const products = await this.productModel
            .find({
            categoryCode: { $eq: category },
            conditionCode: { $eq: condition },
        })
            .exec();
        return products;
    }
};
SearchService = __decorate([
    __param(0, (0, mongoose_1.InjectModel)('Product')),
    __param(1, (0, mongoose_1.InjectModel)('User')),
    __param(2, (0, mongoose_1.InjectModel)('SearchTerm')),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model])
], SearchService);
exports.SearchService = SearchService;
//# sourceMappingURL=search.service.js.map