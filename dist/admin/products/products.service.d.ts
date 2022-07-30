import { Model } from 'mongoose';
import { Product } from 'src/models/product.model';
import { ProductData } from 'src/models/product_data.model';
import { ProductImages } from 'src/models/product_images.model';
import { Review } from 'src/models/review.model';
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
    deleteProducts(): Promise<void>;
    handleRemoveRating(): Promise<void>;
    deleteSingleProduct(id: string): Promise<void>;
    getProducts(): Promise<Product[]>;
}
