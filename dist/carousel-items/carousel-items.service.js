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
exports.CarouselItemsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let CarouselItemsService = class CarouselItemsService {
    constructor(carouselItemModel) {
        this.carouselItemModel = carouselItemModel;
    }
    create(createCarouselItemDto) {
        const newItem = new this.carouselItemModel({
            imageUrl: createCarouselItemDto.imageUrl,
            brandCode: createCarouselItemDto.brandCode,
            categoryCode: createCarouselItemDto.categoryCode,
            conditionCode: createCarouselItemDto.conditionCode,
            title: createCarouselItemDto.title,
            productCode: createCarouselItemDto.productCode,
            isExact: createCarouselItemDto.isExact,
            productId: createCarouselItemDto.productId,
            placement: createCarouselItemDto.placement,
        });
        console.log('new carousel item');
        newItem.save();
    }
    findAll() {
        return `This action returns all carouselItems`;
    }
    async findOne(category, brand, condition, q) {
        const carouselItems = await this.carouselItemModel.find({
            conditionCode: condition == undefined || 'null' ? { $ne: null } : condition,
            brandCode: brand == undefined || 'null' ? { $ne: null } : brand,
            categoryCode: category == undefined || 'null' ? { $ne: null } : category,
            q: q == undefined || 'null' ? { $ne: null } : q,
        });
        console.log('got carousel items');
        return carouselItems;
    }
    update(id, updateCarouselItemDto) {
        return `This action updates a #${id} carouselItem`;
    }
    remove(id) {
        return `This action removes a #${id} carouselItem`;
    }
    async carouselItems(q) {
        const carouselItems = await this.carouselItemModel.find({
            placement: q,
            isActive: true,
        });
        console.log('got carousel items');
        return carouselItems;
    }
    async carouselItemsByBrand(brand) {
        const carouselItems = await this.carouselItemModel.find({
            brandCode: brand,
            isActive: true,
        });
        console.log('got carousel items');
        return carouselItems;
    }
    async carouselItemsByCondition(condition) {
        const carouselItems = await this.carouselItemModel.find({
            conditionCode: condition,
            isActive: true,
        });
        console.log('got carousel items');
        return carouselItems;
    }
    async carouselItemsByCategory(category) {
        const carouselItems = await this.carouselItemModel.find({
            categoryCode: category,
            isActive: true,
        });
        console.log('got carousel items');
        return carouselItems;
    }
    async carouselItemsBySeller(Seller) {
        const carouselItems = await this.carouselItemModel.find({
            SellerCode: Seller,
            isActive: true,
        });
        console.log('got carousel items');
        return carouselItems;
    }
};
CarouselItemsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)('CarouselItem')),
    __metadata("design:paramtypes", [mongoose_2.Model])
], CarouselItemsService);
exports.CarouselItemsService = CarouselItemsService;
//# sourceMappingURL=carousel-items.service.js.map