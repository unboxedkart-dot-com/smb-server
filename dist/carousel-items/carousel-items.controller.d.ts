/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose" />
import { CarouselItemsService } from './carousel-items.service';
import { CreateCarouselItemDto } from './dto/create-carousel-item.dto';
export declare class CarouselItemsController {
    private readonly carouselItemsService;
    constructor(carouselItemsService: CarouselItemsService);
    create(createCarouselItemDto: CreateCarouselItemDto): void;
    deleteAll(): Promise<void>;
    addMany(): Promise<void>;
    findOne(q: string): Promise<(import("mongoose").Document<unknown, any, import("../models/carousel_item.model").CarouselItem> & import("../models/carousel_item.model").CarouselItem & {
        _id: import("mongoose").Types.ObjectId;
    })[]>;
    getBrandCarouselItems(brandName: string): Promise<(import("mongoose").Document<unknown, any, import("../models/carousel_item.model").CarouselItem> & import("../models/carousel_item.model").CarouselItem & {
        _id: import("mongoose").Types.ObjectId;
    })[]>;
    getConditionCarouselItems(conditionName: string): Promise<(import("mongoose").Document<unknown, any, import("../models/carousel_item.model").CarouselItem> & import("../models/carousel_item.model").CarouselItem & {
        _id: import("mongoose").Types.ObjectId;
    })[]>;
    getCategoryCarouselItems(categoryName: string): Promise<(import("mongoose").Document<unknown, any, import("../models/carousel_item.model").CarouselItem> & import("../models/carousel_item.model").CarouselItem & {
        _id: import("mongoose").Types.ObjectId;
    })[]>;
    getSellerCarouselItems(sellerName: string): Promise<(import("mongoose").Document<unknown, any, import("../models/carousel_item.model").CarouselItem> & import("../models/carousel_item.model").CarouselItem & {
        _id: import("mongoose").Types.ObjectId;
    })[]>;
}
