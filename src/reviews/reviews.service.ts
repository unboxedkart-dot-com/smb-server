import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product } from 'src/models/product.model';
import { Review } from 'src/models/review.model';
import { ReviewsData } from 'src/models/reviews_data.model';
import { User } from 'src/models/user.model';
import { ApproveReviewDto } from './dto/approve-review.dto';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';

@Injectable()
export class ReviewsService {
  constructor(
    @InjectModel('Review') private readonly reviewModel: Model<Review>,
    @InjectModel('User') private readonly userModel: Model<User>,
    @InjectModel('ReviewsData') private reviewsDataModel: Model<ReviewsData>,
    @InjectModel('Product') private productModel: Model<Product>,
  ) {}

  async getAllReviews() {
    const reviews = await this.reviewModel.find().select('+isApproved');
    return reviews;
  }

  async getUserReviews(userId: string) {
    const reviews = await this.reviewModel.find({ userId: userId });
    return reviews;
  }

  async getProductReviews(productId: string) {
    if (productId.match(/^[0-9a-fA-F]{24}$/)) {
      const product = await this.productModel.findById(productId);
      const reviews = await this.reviewModel
        .find({
          productCode: product.productCode,
          isApproved: true,
        })
        .limit(5);
      const reviewsData = await this.reviewsDataModel.findOne({
        productCode: product.productCode,
      });
      return { reviews: reviews as Review[], reviewsData: reviewsData };
    } else {
      throw new NotFoundException('product id is not valid');
    }
  }

  async getAllProdutReviews(productId: string) {
    if (productId.match(/^[0-9a-fA-F]{24}$/)) {
      const product = await this.productModel.findById(productId);
      const reviews = await this.reviewModel.find({
        productCode: product.productCode,
        isApproved: true,
      });
      const reviewsData = await this.reviewsDataModel.find({
        productCode: product.productCode,
      });
      return { reviews: reviews as Review[], reviewsData: reviewsData };
    } else {
      throw new NotFoundException('product id is not valid');
    }
  }

  async createReview(userId: string, entireBody: CreateReviewDto) {
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
        productCode: product.productCode,
        productTitle: product.title,
        imageUrl: product.imageUrls.coverImage,
      });
      console.log('new review', newReview);
      await newReview.save();
      console.log('apprive');
      // await this.approveReview('123', newReview._id.toString());
    }
  }

  async updateReview(userId: string, entireBody: UpdateReviewDto) {
    console.log('updating review', entireBody);
    const review = await this.reviewModel.findByIdAndUpdate(
      entireBody.reviewId,
      {
        // userName: entireBody.userName,
        rating: entireBody.rating,
        reviewTitle: entireBody.reviewTitle,
        reviewContent: entireBody.reviewContent,
        isApproved: false,
        // productId: entireBody.productId,
        // productTitle: entireBody.productTitle,
        // imageUrl: entireBody.imageUrl,
      },
    );
    // await this.approveReview('123', entireBody.reviewId);
    // console.log('updated review', review);
  }

  async deleteReview(userId: string, reviewId: string) {
    await this.reviewModel.findOneAndDelete({ userId: userId, _id: reviewId });
  }

  async approveReview(userId: string, reviewId: string) {
    console.log('approving review', reviewId);
    const review = await this.reviewModel.findByIdAndUpdate(reviewId, {
      isApproved: true,
    });
    console.log('reviewww', review);
    const reviewsData = await this.reviewsDataModel.findOne({
      productId: review.productId,
    });
    console.log('rdata', reviewsData);
    if (reviewsData) {
      const newAverage =
        (reviewsData.averageRating * reviewsData.totalReviewsCount +
          review.rating) /
        (reviewsData.totalReviewsCount + 1);
      await this.reviewsDataModel.updateOne(
        { productId: review.productId },
        {
          $inc: {
            totalReviewsCount: 1,
            fiveStarCount: review.rating == 5 ? 1 : 0,
            fourStarCount: review.rating == 4 ? 1 : 0,
            threeStarCount: review.rating == 3 ? 1 : 0,
            twoSarCount: review.rating == 2 ? 1 : 0,
            oneStarCount: review.rating == 1 ? 1 : 0,
          },
          averageRating: newAverage,
        },
      );
    } else {
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
}

// const review = await this.reviewModel.findOne({
//   // userId: userId,
//   _id: entireBody.reviewId,
// });
// console.log('updating review', review);
// return review;
