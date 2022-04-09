import mongoose from 'mongoose';
import { Product } from '../models/product.model';
import { ProductsService } from './products.service';
export declare class ProductsController {
    private readonly productsService;
    constructor(productsService: ProductsService);
    addProduct(entireBody: Product): Promise<{
        id: any;
    }>;
    getProduct(q: string): Promise<{
        product: mongoose.Document<unknown, any, Product> & Product & {
            _id: mongoose.Types.ObjectId;
        };
        productReviews: (mongoose.Document<unknown, any, import("../models/review.model").Review> & import("../models/review.model").Review & {
            _id: mongoose.Types.ObjectId;
        })[];
        reviewsData: (mongoose.Document<unknown, any, import("../models/review.model").Review> & import("../models/review.model").Review & {
            _id: mongoose.Types.ObjectId;
        })[];
        productQAndA: (mongoose.Document<unknown, any, import("../models/q_and_a.model").QuestionAndAnswer> & import("../models/q_and_a.model").QuestionAndAnswer & {
            _id: mongoose.Types.ObjectId;
        })[];
    }>;
    handleDeleteProducts(): Promise<string>;
    handleDeleteProduct(id: string): Promise<string>;
    handleGetBestSellers(brand: string, condition: string, category: string): Promise<Product[]>;
    handleGetBestSellersByBrand(): Promise<void>;
    handleGetBestSellersByCategory(): Promise<void>;
    handleGetBestSellersByCondition(): Promise<void>;
    handleGetFeaturedProducts(brand: string, condition: string, category: string): Promise<Product[]>;
    handleGetFeaturedProductsByBrand(): Promise<void>;
    handleGetFeaturedProductsByCategory(): Promise<void>;
    handleGetFeaturedProductsByCondition(): Promise<void>;
}
