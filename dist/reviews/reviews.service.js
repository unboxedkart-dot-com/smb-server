"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReviewsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let ReviewsService = class ReviewsService {
    constructor(reviewModel, userModel, reviewsDataModel, productModel) {
        this.reviewModel = reviewModel;
        this.userModel = userModel;
        this.reviewsDataModel = reviewsDataModel;
        this.productModel = productModel;
    }
    async getUserReviews(userId) {
        const reviews = await this.reviewModel.find({ userId: userId });
        return reviews;
    }
    async getProductReviews(productId) {
        const reviews = await this.reviewModel.find({
            productId: productId,
            isApproved: true,
        });
        return reviews;
    }
    async createReview(userId, entireBody) {
        const user = await this.userModel.findById(userId);
        const product = await this.productModel.findById(entireBody.productId);
        if (user && product) {
            const newReview = new this.reviewModel({
                userId: userId,
                userName: user.name,
                rating: entireBody.rating,
                reviewTitle: entireBody.reviewTitle,
                reviewContent: entireBody.reviewContent,
                productId: product._id,
                productTitle: product.title,
                imageUrl: product.imageUrls.coverImage,
            });
            console.log('new review', newReview);
            newReview.save();
        }
    }
    async updateReview(userId, entireBody) {
        await this.reviewModel.findOneAndUpdate({ userId: userId, _id: entireBody.reviewId }, {
            userName: entireBody.userName,
            rating: entireBody.rating,
            reviewTitle: entireBody.reviewTitle,
            reviewSubTitle: entireBody.reviewSubTitle,
            productId: entireBody.productId,
            productTitle: entireBody.productTitle,
            imageUrl: entireBody.imageUrl,
        });
    }
    async deleteReview(userId, reviewId) {
        await this.reviewModel.findOneAndDelete({ userId: userId, _id: reviewId });
    }
    async approveReview(userId, entireBody) {
        const review = await this.reviewModel.findByIdAndUpdate(entireBody.reviewId, {
            isApproved: true,
        });
        const reviewsData = await this.reviewsDataModel.findOne({
            productId: review.productId,
        });
        console.log('rdata', reviewsData);
        if (reviewsData) {
            const newAverage = (reviewsData.averageRating * reviewsData.totalReviewsCount +
                review.rating) /
                (reviewsData.totalReviewsCount + 1);
            await this.reviewsDataModel.updateOne({ productId: review.productId }, {
                $inc: {
                    totalReviewsCount: 1,
                    fiveStarCount: review.rating == 5 ? 1 : 0,
                    fourStarCount: review.rating == 4 ? 1 : 0,
                    threeStarCount: review.rating == 3 ? 1 : 0,
                    twoSarCount: review.rating == 2 ? 1 : 0,
                    oneStarCount: review.rating == 1 ? 1 : 0,
                },
                averageRating: newAverage,
            });
        }
        else {
            const newReviewsData = new this.reviewsDataModel({
                productId: review.productId,
                totalReviewsCount: 1,
                averageRating: review.rating,
                fiveStarCount: review.rating == 5 ? 1 : 0,
                fourStarCount: review.rating == 4 ? 1 : 0,
                threeStarCount: review.rating == 3 ? 1 : 0,
                twoStarCount: review.rating == 2 ? 1 : 0,
                oneStarCount: review.rating == 1 ? 1 : 0,
            });
            newReviewsData.save();
        }
    }
};
ReviewsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)('Review')),
    __param(1, (0, mongoose_1.InjectModel)('User')),
    __param(2, (0, mongoose_1.InjectModel)('ReviewsData')),
    __param(3, (0, mongoose_1.InjectModel)('Product')),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model])
], ReviewsService);
exports.ReviewsService = ReviewsService;
//# sourceMappingURL=reviews.service.js.map