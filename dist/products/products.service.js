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
    constructor(productModel, productDataModel, productImagesModel, reviewModel) {
        this.productModel = productModel;
        this.productDataModel = productDataModel;
        this.productImagesModel = productImagesModel;
        this.reviewModel = reviewModel;
    }
    async insertAllProdcts() {
        await this.productModel.insertMany([
            {
                imageUrls: {
                    coverImage: 'https://unboxedkart-india.s3.ap-south-1.amazonaws.com/product/mobile-phone/apple/iphone-x/spacegrey/apple-iphone-x-space-grey-unboxedkart-01.webp',
                    images: [
                        'https://unboxedkart-india.s3.ap-south-1.amazonaws.com/product/mobile-phone/apple/iphone-x/spacegrey/apple-iphone-x-space-grey-unboxedkart-01.webp',
                        'https://unboxedkart-india.s3.ap-south-1.amazonaws.com/product/mobile-phone/apple/iphone-x/spacegrey/apple-iphone-x-space-grey-unboxedkart-02.webp',
                        'https://unboxedkart-india.s3.ap-south-1.amazonaws.com/product/mobile-phone/apple/iphone-x/spacegrey/apple-iphone-x-space-grey-unboxedkart-03.webp',
                        'https://unboxedkart-india.s3.ap-south-1.amazonaws.com/product/mobile-phone/apple/iphone-x/spacegrey/apple-iphone-x-space-grey-unboxedkart-04.webp',
                    ],
                },
                productCode: 'apple-iphone-x',
                pricing: {
                    price: 58000,
                    sellingPrice: 22000,
                },
                moreDetails: {
                    color: 'Space grey',
                    colorCode: 'space-grey',
                    storage: '64 GB',
                    storageCode: '64-gb',
                },
                SKU: '1234567',
                title: 'Apple iPhone X (64 GB, Space grey, Grade A)',
                modelNumber: 'AMPXSM',
                brand: 'Apple',
                brandCode: 'apple',
                category: 'Mobile Phone',
                categoryCode: 'mobile-phone',
                condition: 'Grade - A',
                conditionCode: 'grade-a',
                quantity: 3,
                highlights: [
                    '256 GB ROM',
                    '14.73 cm (5.8 inch) Super Retina HD Display',
                    '12MP + 12MP | 7MP Front Camera',
                    'A11 Bionic Chip with 64-bit Architecture, Neural Engine, Embedded M11 Motion Coprocessor Processor',
                ],
                searchCases: [
                    'ap',
                    'app',
                    'appl',
                    'appe',
                    'apple',
                    'appleiphonex',
                    'i',
                    'ip',
                    'iph',
                    'ipho',
                    'iphon',
                    'iphone',
                    'iphonex',
                    'iphonexsmax',
                    'iphonegold',
                    'iphonexs',
                    'iphonexsmaxgold256',
                    'iphonemax',
                ],
            },
            {
                imageUrls: {
                    coverImage: 'https://unboxedkart-india.s3.ap-south-1.amazonaws.com/product/mobile-phone/apple/iphone-x/spacegrey/apple-iphone-x-space-grey-unboxedkart-01.webp',
                    images: [
                        'https://unboxedkart-india.s3.ap-south-1.amazonaws.com/product/mobile-phone/apple/iphone-x/spacegrey/apple-iphone-x-space-grey-unboxedkart-01.webp',
                        'https://unboxedkart-india.s3.ap-south-1.amazonaws.com/product/mobile-phone/apple/iphone-x/spacegrey/apple-iphone-x-space-grey-unboxedkart-02.webp',
                        'https://unboxedkart-india.s3.ap-south-1.amazonaws.com/product/mobile-phone/apple/iphone-x/spacegrey/apple-iphone-x-space-grey-unboxedkart-03.webp',
                        'https://unboxedkart-india.s3.ap-south-1.amazonaws.com/product/mobile-phone/apple/iphone-x/spacegrey/apple-iphone-x-space-grey-unboxedkart-04.webp',
                    ],
                },
                productCode: 'apple-iphone-x',
                pricing: {
                    price: 65000,
                    sellingPrice: 25000,
                },
                moreDetails: {
                    color: 'Space grey',
                    colorCode: 'space-grey',
                    storage: '256 GB',
                    storageCode: '256-gb',
                },
                SKU: '1234567',
                title: 'Apple iPhone X (256 GB, Space grey, Grade A)',
                modelNumber: 'AMPXSM',
                brand: 'Apple',
                brandCode: 'apple',
                category: 'Mobile Phone',
                categoryCode: 'mobile-phone',
                condition: 'Grade - A',
                conditionCode: 'grade-a',
                quantity: 3,
                highlights: [
                    '256 GB ROM',
                    '14.73 cm (5.8 inch) Super Retina HD Display',
                    '12MP + 12MP | 7MP Front Camera',
                    'A11 Bionic Chip with 64-bit Architecture, Neural Engine, Embedded M11 Motion Coprocessor Processor',
                ],
                searchCases: [
                    'ap',
                    'app',
                    'appl',
                    'appe',
                    'apple',
                    'appleiphonex',
                    'i',
                    'ip',
                    'iph',
                    'ipho',
                    'iphon',
                    'iphone',
                    'iphonex',
                    'iphonexsmax',
                    'iphonegold',
                    'iphonexs',
                    'iphonexsmaxgold256',
                    'iphonemax',
                ],
            },
            {
                imageUrls: {
                    coverImage: 'https://unboxedkart-india.s3.ap-south-1.amazonaws.com/product/mobile-phone/apple/iphone-x/spacegrey/apple-iphone-x-space-grey-unboxedkart-01.webp',
                    images: [
                        'https://unboxedkart-india.s3.ap-south-1.amazonaws.com/product/mobile-phone/apple/iphone-x/spacegrey/apple-iphone-x-space-grey-unboxedkart-01.webp',
                        'https://unboxedkart-india.s3.ap-south-1.amazonaws.com/product/mobile-phone/apple/iphone-x/spacegrey/apple-iphone-x-space-grey-unboxedkart-02.webp',
                        'https://unboxedkart-india.s3.ap-south-1.amazonaws.com/product/mobile-phone/apple/iphone-x/spacegrey/apple-iphone-x-space-grey-unboxedkart-03.webp',
                        'https://unboxedkart-india.s3.ap-south-1.amazonaws.com/product/mobile-phone/apple/iphone-x/spacegrey/apple-iphone-x-space-grey-unboxedkart-04.webp',
                    ],
                },
                productCode: 'apple-iphone-x',
                pricing: {
                    price: 58000,
                    sellingPrice: 20000,
                },
                moreDetails: {
                    color: 'Space grey',
                    colorCode: 'space-grey',
                    storage: '64 GB',
                    storageCode: '64-gb',
                },
                SKU: '1234567',
                title: 'Apple iPhone X (64 GB, Space grey, Grade C)',
                modelNumber: 'AMPXSM',
                brand: 'Apple',
                brandCode: 'apple',
                category: 'Mobile Phone',
                categoryCode: 'mobile-phone',
                condition: 'Grade - C',
                conditionCode: 'grade-c',
                quantity: 3,
                highlights: [
                    '256 GB ROM',
                    '14.73 cm (5.8 inch) Super Retina HD Display',
                    '12MP + 12MP | 7MP Front Camera',
                    'A11 Bionic Chip with 64-bit Architecture, Neural Engine, Embedded M11 Motion Coprocessor Processor',
                ],
                searchCases: [
                    'ap',
                    'app',
                    'appl',
                    'appe',
                    'apple',
                    'appleiphonex',
                    'i',
                    'ip',
                    'iph',
                    'ipho',
                    'iphon',
                    'iphone',
                    'iphonex',
                    'iphonexsmax',
                    'iphonegold',
                    'iphonexs',
                    'iphonexsmaxgold256',
                    'iphonemax',
                ],
            },
            {
                imageUrls: {
                    coverImage: 'https://unboxedkart-india.s3.ap-south-1.amazonaws.com/product/mobile-phone/apple/iphone-x/spacegrey/apple-iphone-x-space-grey-unboxedkart-01.webp',
                    images: [
                        'https://unboxedkart-india.s3.ap-south-1.amazonaws.com/product/mobile-phone/apple/iphone-x/spacegrey/apple-iphone-x-space-grey-unboxedkart-01.webp',
                        'https://unboxedkart-india.s3.ap-south-1.amazonaws.com/product/mobile-phone/apple/iphone-x/spacegrey/apple-iphone-x-space-grey-unboxedkart-02.webp',
                        'https://unboxedkart-india.s3.ap-south-1.amazonaws.com/product/mobile-phone/apple/iphone-x/spacegrey/apple-iphone-x-space-grey-unboxedkart-03.webp',
                        'https://unboxedkart-india.s3.ap-south-1.amazonaws.com/product/mobile-phone/apple/iphone-x/spacegrey/apple-iphone-x-space-grey-unboxedkart-04.webp',
                    ],
                },
                productCode: 'apple-iphone-x',
                pricing: {
                    price: 58000,
                    sellingPrice: 22000,
                },
                moreDetails: {
                    color: 'Silver',
                    colorCode: 'silver',
                    storage: '64 GB',
                    storageCode: '64-gb',
                },
                SKU: '1234567',
                title: 'Apple iPhone X (64 GB, Silver, Grade A)',
                modelNumber: 'AMPXSM',
                brand: 'Apple',
                brandCode: 'apple',
                category: 'Mobile Phone',
                categoryCode: 'mobile-phone',
                condition: 'Grade - A',
                conditionCode: 'grade-a',
                quantity: 3,
                highlights: [
                    '256 GB ROM',
                    '14.73 cm (5.8 inch) Super Retina HD Display',
                    '12MP + 12MP | 7MP Front Camera',
                    'A11 Bionic Chip with 64-bit Architecture, Neural Engine, Embedded M11 Motion Coprocessor Processor',
                ],
                searchCases: [
                    'ap',
                    'app',
                    'appl',
                    'appe',
                    'apple',
                    'appleiphonex',
                    'i',
                    'ip',
                    'iph',
                    'ipho',
                    'iphon',
                    'iphone',
                    'iphonex',
                    'iphonexsmax',
                    'iphonegold',
                    'iphonexs',
                    'iphonexsmaxgold256',
                    'iphonemax',
                ],
            },
        ]);
    }
    async insertProduct(entireBody) {
        const productData = await this.productDataModel.findOne({
            productCode: entireBody.productCode,
        });
        const imageUrl = `https://unboxedkart-india.s3.ap-south-1.amazonaws.com/product/${productData.categoryCode}/${productData.brandCode}/${productData.modelCode}/${entireBody.colorCode}/${entireBody.productCode}-unboxedkart`;
        const thumbailUrl = `https://unboxedkart-india.s3.ap-south-1.amazonaws.com/product/${productData.categoryCode}/${productData.brandCode}/${productData.modelCode}/${entireBody.colorCode}/thumbnails/${entireBody.productCode}-unboxedkart`;
        const productImages = await this.productImagesModel.findOne({
            productCode: entireBody.productCode,
            colorCode: entireBody.colorCode,
        });
        const imageUrls = this._handleGetProductImageUrls(imageUrl, thumbailUrl, productImages.count);
        const searchCases = this._handleCreateProductSearchCases(productData.category, productData.brand, productData.title, entireBody);
        const newTitle = this._handleGenerateNewTitle(productData.title, entireBody.condition, entireBody.color, entireBody.storage, entireBody.ram, entireBody.processor);
        const aboutProduct = entireBody.aboutProduct.split('...');
        console.log('new title', newTitle);
        const newProduct = new this.productModel({
            productCode: entireBody.productCode,
            SKU: 'ABCD',
            title: newTitle,
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
                coverImage: imageUrls.coverImage,
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
            moreDetails: {
                color: entireBody.color,
                colorCode: entireBody.colorCode,
                storage: entireBody.storage,
                storageCode: entireBody.storageCode,
            },
        });
        console.log('new product', newProduct);
        await newProduct.save();
    }
    _handleGetAboutProduct(aboutProduct) {
        console.log(aboutProduct);
        const aboutList = aboutProduct.split('...');
        console.log('aboutList', aboutList);
    }
    _handleGenerateNewTitle(title, condition, color, storage, ram, processor) {
        let newTitle = title +
            ' (' +
            condition +
            ', ' +
            color +
            (storage != null ? `, ${storage}` : ``) +
            (ram != null ? `, ${ram}` : ``) +
            (processor != null ? `, ${processor}` : ``) +
            ')';
        return newTitle;
    }
    _handleGetProductImageUrls(imageUrl, thumbnailUrl, count) {
        const thumbnails = [];
        const images = [];
        for (let n = 1; n <= count; n++) {
            thumbnails.push(`${thumbnailUrl}-1`);
            images.push(`${imageUrl}-1.webp`);
        }
        return {
            coverImage: `${imageUrl}-1.webp`,
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
    async getSelectedVariant(productCode, conditionCode, storageCode, colorCode, processorCode, ramCode) {
        console.log('selected storage code', storageCode);
        const product = await this.productModel.find({
            productCode: productCode,
            'moreDetails.colorCode': colorCode,
            conditionCode: conditionCode,
            'moreDetails.storageCode': storageCode === undefined || 'null' ? { $ne: null } : storageCode,
            'moreDetails.processorCode': processorCode === undefined || 'null' ? { $ne: null } : processorCode,
            'moreDetails.ramCode': ramCode === undefined || 'null' ? { $ne: null } : { $eq: ramCode },
        });
        return product.length;
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
        console.log('grtting single product');
        {
            const product = await this.productModel.findById(id);
            if (!product) {
                console.log('not exis');
                throw new common_1.NotFoundException('could not find product');
            }
            else {
                console.log('exos');
                const product = await this.productModel.findById(id);
                return product;
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
};
ProductsService = __decorate([
    __param(0, (0, mongoose_1.InjectModel)('Product')),
    __param(1, (0, mongoose_1.InjectModel)('ProductData')),
    __param(2, (0, mongoose_1.InjectModel)('ProductImages')),
    __param(3, (0, mongoose_1.InjectModel)('Review')),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model])
], ProductsService);
exports.ProductsService = ProductsService;
//# sourceMappingURL=products.service.js.map