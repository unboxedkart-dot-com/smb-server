import mongoose from 'mongoose';
import { AuthService } from 'src/auth/auth.service';
import { Product } from '../models/product.model';
import { ProductsService } from './products.service';
export declare class ProductsController {
    private readonly productsService;
    private readonly authService;
    constructor(productsService: ProductsService, authService: AuthService);
    getProduct(q: string): Promise<any>;
    getSelectedVariant(product: string, condition: string, storage: string, color: string, processor: string, combination: string, ram: string, screenSize: string): Promise<mongoose.Types.ObjectId>;
    handleGetSimilarProducts(productId: string): Promise<Product[]>;
    handleGetRelatedProducts(productId: string): Promise<Product[]>;
    handleGetBestSellers(brand: string, condition: string, category: string): Promise<any[]>;
    handleGetFeaturedProducts(brand: string, condition: string, category: string): Promise<any[]>;
}
