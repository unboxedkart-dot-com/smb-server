/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose" />
import { AuthService } from 'src/auth/auth.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { ReviewsService } from './reviews.service';
export declare class ReviewsController {
    private readonly reviewsService;
    private readonly authService;
    constructor(reviewsService: ReviewsService, authService: AuthService);
    handleGetUserReviews(request: any): Promise<(import("mongoose").Document<unknown, any, import("../models/review.model").Review> & import("../models/review.model").Review & {
        _id: import("mongoose").Types.ObjectId;
    })[]>;
    handleCreateReview(request: any, entireBody: CreateReviewDto): Promise<void>;
    handleUpdateReview(request: any, entireBody: UpdateReviewDto): Promise<void>;
    handleApproveReview(request: any, reviewId: string): Promise<void>;
    handleDeleteReview(reviewId: string, request: any): Promise<void>;
    handleGetProductReviews(productId: string): Promise<{
        reviews: import("../models/review.model").Review[];
        reviewsData: import("mongoose").Document<unknown, any, import("../models/reviews_data.model").ReviewsData> & import("../models/reviews_data.model").ReviewsData & {
            _id: import("mongoose").Types.ObjectId;
        };
    }>;
    handleGetAllProductReviews(productId: string): Promise<{
        data: {
            reviews: import("../models/review.model").Review[];
            reviewsData: import("mongoose").Document<unknown, any, import("../models/reviews_data.model").ReviewsData> & import("../models/reviews_data.model").ReviewsData & {
                _id: import("mongoose").Types.ObjectId;
            };
        };
    }>;
}
