import mongoose from 'mongoose';
export declare const ProductSchema: mongoose.Schema<any, mongoose.Model<any, any, any, any>, any, any>;
export interface Product {
    id: string;
    SKU: string;
    title: string;
    modelNumber: string;
    brand: string;
    brandCode: string;
    category: string;
    categoryCode: string;
    condition: string;
    conditionCode: string;
    imageUrls: {
        coverImage: string;
        images: [string];
    };
    pricing: {
        price: number;
        sellingPrice: number;
    };
    quantity: number;
    highlights: [string];
    searchCases: [string];
    isBestSeller: boolean;
    isFeatured: boolean;
    moreDetails: {
        color: string;
        colorCode: string;
        storage: string;
        storageCode: string;
    };
    productDetails: any;
    qAndA: any;
    ratingsAndReviews: any;
}