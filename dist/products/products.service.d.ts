import { Model } from 'mongoose';
import { QuestionAndAnswer } from 'src/models/q_and_a.model';
import { Review } from 'src/models/review.model';
import { Product } from '../models/product.model';
export declare class ProductsService {
    private readonly productModel;
    private readonly reviewModel;
    private readonly productSpecsModel;
    private readonly questionAndAnswersModel;
    constructor(productModel: Model<Product>, reviewModel: Model<Review>, productSpecsModel: Model<Product>, questionAndAnswersModel: Model<QuestionAndAnswer>);
    insertProduct(product: Product): Promise<any>;
    getProducts(): Promise<Product[]>;
    getProduct(id: string): Promise<{
        product: import("mongoose").Document<unknown, any, Product> & Product & {
            _id: import("mongoose").Types.ObjectId;
        };
        productSpecs: any;
        productReviews: (import("mongoose").Document<unknown, any, Review> & Review & {
            _id: import("mongoose").Types.ObjectId;
        })[];
        reviewsData: (import("mongoose").Document<unknown, any, Review> & Review & {
            _id: import("mongoose").Types.ObjectId;
        })[];
        productQAndA: (import("mongoose").Document<unknown, any, QuestionAndAnswer> & QuestionAndAnswer & {
            _id: import("mongoose").Types.ObjectId;
        })[];
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
