/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose" />
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { ReviewsService } from './reviews.service';
export declare class ReviewsController {
    private readonly reviewsService;
    constructor(reviewsService: ReviewsService);
    handleGetUserReviews(request: any): Promise<(import("mongoose").Document<unknown, any, import("../models/review.model").Review> & import("../models/review.model").Review & {
        _id: import("mongoose").Types.ObjectId;
    })[]>;
    handleCreateReview(request: any, entireBody: CreateReviewDto): Promise<void>;
    handleUpdateReview(request: any, entireBody: UpdateReviewDto): Promise<void>;
    handleApproveReview(request: any, reviewId: string): Promise<void>;
    handleDeleteReview(reviewId: string, request: any): Promise<void>;
    handleGetProductReviews(productId: string): Promise<{
        reviews: (import("mongoose").Document<unknown, any, import("../models/review.model").Review> & import("../models/review.model").Review & {
            _id: import("mongoose").Types.ObjectId;
        })[];
        reviewsData: (import("mongoose").Document<unknown, any, import("../models/reviews_data.model").ReviewsData> & import("../models/reviews_data.model").ReviewsData & {
            _id: import("mongoose").Types.ObjectId;
        })[];
    }>;
}
