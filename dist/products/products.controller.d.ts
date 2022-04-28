import mongoose from 'mongoose';
import { AuthService } from 'src/auth/auth.service';
import { Product } from '../models/product.model';
import { CreateProductDto } from './dto/add-product.dto';
import { ProductsService } from './products.service';
export declare class ProductsController {
    private readonly productsService;
    private readonly authService;
    constructor(productsService: ProductsService, authService: AuthService);
    addProduct(request: any, entireBody: CreateProductDto): Promise<{
        data: {
            response: any;
        };
    }>;
    addManyProducts(): Promise<{
        data: {
            response: void;
        };
    }>;
    getProduct(q: string): Promise<mongoose.Document<unknown, any, Product> & Product & {
        _id: mongoose.Types.ObjectId;
    }>;
    getSelectedVariant(productCode: string, conditionCode: string, storageCode: string, colorCode: string, processorCode: string, ramCode: string): Promise<string>;
    handleDeleteProducts(): Promise<string>;
    handleUpdateInventoryCount(count: number, request: any, productId: string): Promise<{
        statusCode: number;
        message: string;
    }>;
    handleDeleteProduct(id: string, request: any): Promise<void>;
    handleGetSimilarProducts(productId: string): Promise<(mongoose.Document<unknown, any, Product> & Product & {
        _id: mongoose.Types.ObjectId;
    })[]>;
    handleGetRelatedProducts(productId: string): Promise<(mongoose.Document<unknown, any, Product> & Product & {
        _id: mongoose.Types.ObjectId;
    })[]>;
    handleGetBestSellers(brand: string, condition: string, category: string): Promise<Product[]>;
    handleGetFeaturedProducts(brand: string, condition: string, category: string): Promise<Product[]>;
}
