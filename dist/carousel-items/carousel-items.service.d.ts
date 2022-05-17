/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/error" />
import { Model } from 'mongoose';
import { CarouselItem } from 'src/models/carousel_item.model';
import { CreateCarouselItemDto } from './dto/create-carousel-item.dto';
import { UpdateCarouselItemDto } from './dto/update-carousel-item.dto';
export declare class CarouselItemsService {
    private readonly carouselItemModel;
    constructor(carouselItemModel: Model<CarouselItem>);
    create(createCarouselItemDto: CreateCarouselItemDto): void;
    findAll(): string;
    findOne(category: string, brand: string, condition: string, q: string): Promise<(import("mongoose").Document<unknown, any, CarouselItem> & CarouselItem & {
        _id: import("mongoose").Types.ObjectId;
    })[]>;
    update(id: number, updateCarouselItemDto: UpdateCarouselItemDto): string;
    remove(id: number): string;
    carouselItems(q: string): Promise<(import("mongoose").Document<unknown, any, CarouselItem> & CarouselItem & {
        _id: import("mongoose").Types.ObjectId;
    })[]>;
    carouselItemsByBrand(brand: string): Promise<(import("mongoose").Document<unknown, any, CarouselItem> & CarouselItem & {
        _id: import("mongoose").Types.ObjectId;
    })[]>;
    carouselItemsByCondition(condition: string): Promise<(import("mongoose").Document<unknown, any, CarouselItem> & CarouselItem & {
        _id: import("mongoose").Types.ObjectId;
    })[]>;
    carouselItemsByCategory(category: string): Promise<(import("mongoose").Document<unknown, any, CarouselItem> & CarouselItem & {
        _id: import("mongoose").Types.ObjectId;
    })[]>;
    carouselItemsBySeller(Seller: string): Promise<(import("mongoose").Document<unknown, any, CarouselItem> & CarouselItem & {
        _id: import("mongoose").Types.ObjectId;
    })[]>;
}
