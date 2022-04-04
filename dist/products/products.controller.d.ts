import mongoose from 'mongoose';
import { Product } from '../models/product.model';
import { ProductsService } from './products.service';
export declare class ProductsController {
    private readonly productsService;
    constructor(productsService: ProductsService);
    addProduct(entireBody: Product): Promise<{
        id: any;
    }>;
    getProduct(q: string): Promise<mongoose.Document<unknown, any, Product> & Product & {
        _id: mongoose.Types.ObjectId;
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
