/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/error" />
import { Model } from 'mongoose';
import { ProductData } from 'src/models/product_data.model';
import { ProductImages } from 'src/models/product_images.model';
import { Review } from 'src/models/review.model';
import { Product } from '../models/product.model';
import { CreateProductDto } from './dto/add-product.dto';
export declare class ProductsService {
    private readonly productModel;
    private readonly productDataModel;
    private readonly productImagesModel;
    private readonly reviewModel;
    constructor(productModel: Model<Product>, productDataModel: Model<ProductData>, productImagesModel: Model<ProductImages>, reviewModel: Model<Review>);
    insertProduct(entireBody: CreateProductDto): Promise<void>;
    _handleGetAboutProduct(aboutProduct: string): void;
    _handleGenerateNewTitle(category: string, title: string, condition: string, color: string, storage: string, ram: string, processor: string, connectivity: string): string;
    _handleGetProductImageUrls(imageUrl: string, thumbnailUrl: string, count: number): {
        coverImage: string;
        thumbnails: any[];
        images: any[];
    };
    _handleCreateProductSearchCases(category: string, brand: string, title: string, entireBody: CreateProductDto): any[];
    updateInventoryCount({ productId, count, }: {
        productId: string;
        count: number;
    }): Promise<void>;
    getProducts(): Promise<Product[]>;
    getSelectedVariant(product: string, condition: string, storage: string, color: string, processor: string, ram: string, combination: String, screenSize: string): Promise<import("mongoose").Types.ObjectId>;
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
