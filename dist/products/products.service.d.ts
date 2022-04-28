/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/error" />
import { Model } from 'mongoose';
import { Review } from 'src/models/review.model';
import { Product } from '../models/product.model';
import { CreateProductDto } from './dto/add-product.dto';
export declare class ProductsService {
    private readonly productModel;
    private readonly reviewModel;
    constructor(productModel: Model<Product>, reviewModel: Model<Review>);
    insertAllProdcts(): Promise<void>;
    insertProduct(entireBody: CreateProductDto): Promise<any>;
    updateInventoryCount({ productId, count, }: {
        productId: string;
        count: number;
    }): Promise<void>;
    getProducts(): Promise<Product[]>;
    getSelectedVariant(productCode: string, conditionCode: string, storageCode: string, colorCode: string, processorCode: string, ramCode: string): Promise<string>;
    getSimilarProducts(productId: string): Promise<(import("mongoose").Document<unknown, any, Product> & Product & {
        _id: import("mongoose").Types.ObjectId;
    })[]>;
    getRelatedProducts(productId: string): Promise<(import("mongoose").Document<unknown, any, Product> & Product & {
        _id: import("mongoose").Types.ObjectId;
    })[]>;
    getProduct(id: string): Promise<import("mongoose").Document<unknown, any, Product> & Product & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    deleteProducts(): Promise<void>;
    deleteSingleProduct(id: string): Promise<void>;
    getBestSellers(brand: string, category: string, condition: string): Promise<Product[]>;
    getFeaturedProducts(brand: string, category: string, condition: string): Promise<Product[]>;
    getAllBestSellers(): Promise<Product[]>;
    getBestSellerByBrand(brand: string): Promise<Product[]>;
    getBestSellersByCategory(category: string): Promise<Product[]>;
    getBestSellersByCondition(condition: string): Promise<Product[]>;
    getFeaturedProductsByBrand(brand: string): Promise<Product[]>;
    getFeaturedProductsByCategory(category: string): Promise<Product[]>;
    getFeaturedProductsByCondition(condition: string): Promise<Product[]>;
    getAllFeaturedProducts(): Promise<Product[]>;
}
