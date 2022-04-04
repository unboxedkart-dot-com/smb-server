/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/error" />
import { Model } from 'mongoose';
import { Product } from '../models/product.model';
export declare class ProductsService {
    private readonly productModel;
    constructor(productModel: Model<Product>);
    insertProduct(product: Product): Promise<any>;
    getProducts(): Promise<Product[]>;
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
