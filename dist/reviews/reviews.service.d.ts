/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/error" />
import { Model } from 'mongoose';
import { Product } from 'src/models/product.model';
import { Review } from 'src/models/review.model';
import { ReviewsData } from 'src/models/reviews_data.model';
import { User } from 'src/models/user.model';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
export declare class ReviewsService {
    private readonly reviewModel;
    private readonly userModel;
    private reviewsDataModel;
    private productModel;
    constructor(reviewModel: Model<Review>, userModel: Model<User>, reviewsDataModel: Model<ReviewsData>, productModel: Model<Product>);
    getUserReviews(userId: string): Promise<(import("mongoose").Document<unknown, any, Review> & Review & {
        _id: import("mongoose").Types.ObjectId;
    })[]>;
    getProductReviews(productId: string): Promise<{
        reviews: Review[];
        reviewsData: import("mongoose").Document<unknown, any, ReviewsData> & ReviewsData & {
            _id: import("mongoose").Types.ObjectId;
        };
    }>;
    getAllProdutReviews(productId: string): Promise<{
        reviews: Review[];
        reviewsData: (import("mongoose").Document<unknown, any, ReviewsData> & ReviewsData & {
            _id: import("mongoose").Types.ObjectId;
        })[];
    }>;
    createReview(userId: string, entireBody: CreateReviewDto): Promise<void>;
    updateReview(userId: string, entireBody: UpdateReviewDto): Promise<void>;
    deleteReview(userId: string, reviewId: string): Promise<void>;
    approveReview(userId: string, reviewId: string): Promise<void>;
}
