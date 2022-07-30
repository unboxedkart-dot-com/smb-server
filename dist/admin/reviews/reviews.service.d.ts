/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/error" />
import { Model } from 'mongoose';
import { Product } from 'src/models/product.model';
import { Review } from 'src/models/review.model';
import { ReviewsData } from 'src/models/reviews_data.model';
import { User } from 'src/models/user.model';
export declare class ReviewsService {
    private readonly reviewModel;
    private readonly userModel;
    private reviewsDataModel;
    private productModel;
    constructor(reviewModel: Model<Review>, userModel: Model<User>, reviewsDataModel: Model<ReviewsData>, productModel: Model<Product>);
    getAllReviews(): Promise<(import("mongoose").Document<unknown, any, Review> & Review & {
        _id: import("mongoose").Types.ObjectId;
    })[]>;
    approveReview(userId: string, reviewId: string): Promise<void>;
}
