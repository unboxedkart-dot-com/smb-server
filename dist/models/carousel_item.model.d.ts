import mongoose from 'mongoose';
export declare enum UserRoles {
    USER = "user",
    SELLER = "registered seller",
    ADMIN = "administrator"
}
export declare const CarouselItemSchema: mongoose.Schema<any, mongoose.Model<any, any, any, any>, any, any>;
export interface CarouselItem {
    imageUrl: string;
    placement: true;
    brandCode: string;
    categoryCode: string;
    conditionCode: string;
    title: string;
    productCode: string;
    isExact: boolean;
    productId: string;
    isActive: boolean;
    index: number;
    startingPrice: number;
    endingPrice: number;
    seriesCode: string;
    processorCode: string;
    screenSizeCode: string;
}
