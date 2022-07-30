/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose" />
import { AuthService } from 'src/auth/auth.service';
import { ReviewsService } from './reviews.service';
export declare class ReviewsController {
    private readonly reviewsService;
    private readonly authService;
    constructor(reviewsService: ReviewsService, authService: AuthService);
    handleGetAllReviews(request: any): Promise<(import("mongoose").Document<unknown, any, import("../../models/review.model").Review> & import("../../models/review.model").Review & {
        _id: import("mongoose").Types.ObjectId;
    })[]>;
    handleApproveReview(request: any, reviewId: string): Promise<void>;
}
