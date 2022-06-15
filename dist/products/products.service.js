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
    async insertProduct(entireBody) {
        const productData = await this.productDataModel.findOne({
            productCode: entireBody.productCode,
        });
        const imagePath = `https://unboxedkart-india.s3.ap-south-1.amazonaws.com/products/${productData.categoryCode}/${productData.brandCode}/${productData.modelCode}/${entireBody.colorCode}`;
        const imageUrl = `https://unboxedkart-india.s3.ap-south-1.amazonaws.com/products/${productData.categoryCode}/${productData.brandCode}/${productData.modelCode}/${entireBody.colorCode}/${entireBody.productCode}-unboxedkart`;
        const thumbailUrl = `https://unboxedkart-india.s3.ap-south-1.amazonaws.com/products/${productData.categoryCode}/${productData.brandCode}/${productData.modelCode}/${entireBody.colorCode}/thumbnails/${entireBody.productCode}-unboxedkart`;
        const productImages = await this.productImagesModel.findOne({
            productCode: entireBody.productCode,
            colorCode: entireBody.colorCode,
        });
        const imageUrls = this._handleGetProductImageUrls(imageUrl, thumbailUrl, productImages.count);
        const searchCases = this._handleCreateProductSearchCases(productData.category, productData.brand, productData.title, entireBody);
        const newTitle = this._handleGenerateNewTitle(productData.categoryCode, productData.title, entireBody.condition, entireBody.color, entireBody.storage, entireBody.ram, entireBody.processor, entireBody.connectivity);
        const aboutProduct = entireBody.aboutProduct.split('///');
        console.log('about splitting', aboutProduct);
        console.log('new title', newTitle);
        const newProduct = new this.productModel({
            productCode: entireBody.productCode,
            SKU: 'ABCD',
            title: newTitle,
            seriesCode: productData.seriesCode,
            highlights: productData.highlights,
            aboutProduct: aboutProduct,
            modelNumber: productData.modelNumber,
            brand: productData.brandCode,
            brandCode: productData.brandCode,
            category: productData.category,
            categoryCode: productData.categoryCode,
            condition: entireBody.condition,
            conditionCode: entireBody.conditionCode,
            imageUrls: {
                desktopCoverImage: `${imagePath}/desktop-cover.webp`,
                coverImage: `${imagePath}/mobile-cover.webp`,
                images: imageUrls.images,
                thumbnails: imageUrls.thumbnails,
            },
            pricing: {
                price: entireBody.price,
                sellingPrice: entireBody.sellingPrice,
            },
            quantity: entireBody.inventoryCount,
            searchCases: searchCases,
            isBestSeller: entireBody.isBestSeller,
            isFeatured: entireBody.isFeatured,
            isCertified: entireBody.isCertified,
            moreDetails: {
                color: entireBody.color,
                colorCode: entireBody.colorCode,
                storage: entireBody.storage,
                storageCode: entireBody.storageCode,
            },
            warrantyDetails: {
                isUnderWarranty: entireBody.isUnderWarranty,
                warrantyLeft: entireBody.warrantyLeftInMonths,
                description: entireBody.warrantyDescription,
            },
            sellerDetails: {
                sellerId: entireBody.sellerId,
                sellerName: entireBody.sellerName,
            },
            boxContains: entireBody.boxContains,
        });
        console.log('new product', newProduct);
        await newProduct.save();
    }
    _handleGetAboutProduct(aboutProduct) {
        console.log(aboutProduct);
        const aboutList = aboutProduct.split('...');
        console.log('aboutList', aboutList);
    }
    _handleGenerateNewTitle(category, title, condition, color, storage, ram, processor, connectivity) {
        let newTitle = '';
        if (category == 'mobile-phone') {
            newTitle =
                title +
                    ' (' +
                    condition +
                    ', ' +
                    color +
                    (storage != null ? `, ${storage}` : ``) +
                    (ram != null ? `, ${ram}` : ``) +
                    ')';
        }
        else if (category == 'laptop') {
            newTitle =
                title +
                    ' (' +
                    condition +
                    ', ' +
                    color +
                    (storage != null ? `, ${storage}` : ``) +
                    (ram != null ? `, ${ram}` : ``) +
                    (processor != null ? `, ${processor}` : ``) +
                    ')';
        }
        else if (category == 'watch') {
            newTitle = title + ' (' + condition + ', ' + connectivity + color + ')';
        }
        else if (category == 'watch') {
            newTitle = title + ' (' + condition + ', ' + connectivity + color + ')';
        }
        else {
            newTitle = title + ' (' + condition + ', ' + color + ')';
        }
        return newTitle;
    }
    _handleGetProductImageUrls(imageUrl, thumbnailUrl, count) {
        const thumbnails = [];
        const images = [];
        for (let n = 1; n <= count; n++) {
            thumbnails.push(`${thumbnailUrl}-${n}.webp`);
            images.push(`${imageUrl}-${n}.webp`);
        }
        return {
            coverImage: `${imageUrl}-.webp`,
            thumbnails: thumbnails,
            images: images,
        };
    }
    _handleCreateProductSearchCases(category, brand, title, entireBody) {
        var _a, _b, _c;
        const searchCases = [];
        function addTerm(term) {
            searchCases.push(term.toLowerCase().replace(/\s/g, ''));
        }
        addTerm(brand);
        addTerm(category);
        addTerm(entireBody.color);
        (_a = entireBody.storage != null) !== null && _a !== void 0 ? _a : addTerm(entireBody.storage);
        (_b = entireBody.processor != null) !== null && _b !== void 0 ? _b : addTerm(entireBody.processor);
        (_c = entireBody.ram != null) !== null && _c !== void 0 ? _c : addTerm(entireBody.ram);
        for (let i = 1; i <= title.length; i++) {
            addTerm(title.substring(0, i));
        }
        console.log('generated search terms', searchCases);
        return searchCases;
    }
    async updateInventoryCount({ productId, count, }) {
        try {
            await this.productModel.findByIdAndUpdate(productId, {
                quantity: count,
            });
        }
        catch (e) {
            throw new common_1.ForbiddenException('cannot update product pricing', "the product id doesn't exists");
        }
    }
    async getProducts() {
        const products = await this.productModel.find().exec();
        return products;
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
                const similarProducts = await this.productModel
                    .find({
                    brandCode: product.brandCode,
                    categoryCode: product.categoryCode,
                })
                    .limit(5);
                return similarProducts;
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
                const relatedProducts = await this.productModel
                    .find({
                    brandCode: product.brandCode,
                })
                    .limit(5);
                return relatedProducts;
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
    async handleRemoveRating() {
        await this.productModel.updateMany({ $unset: { 'rating': '' } });
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