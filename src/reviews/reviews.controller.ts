import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ApproveReviewDto } from './dto/approve-review.dto';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { ReviewsService } from './reviews.service';

@UseGuards(JwtAuthGuard)
@Controller('reviews')
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @Get()
  async handleGetUserReviews(@Req() request: any) {
    const userId = request.user.userId;
    const reviews = await this.reviewsService.getUserReviews(userId);
    return reviews;
  }

  @Post('/create')
  async handleCreateReview(
    @Req() request: any,
    @Body() entireBody: CreateReviewDto,
  ) {
    const userId = request.user.userId;
    await this.reviewsService.createReview(userId, entireBody);
  }

  @Patch('/update')
  async handleUpdateReview(
    @Req() request: any,
    @Body() entireBody: UpdateReviewDto,
  ) {
    console.log('updating review');
    const userId = request.user.userId;
    const review = await this.reviewsService.updateReview(userId, entireBody);
    return review;
  }

  @Patch('/approve')
  async handleApproveReview(
    @Req() request: any,
    @Body() entireBody: ApproveReviewDto,
  ) {
    const userId = request.user.userId;
    await this.reviewsService.approveReview(userId, entireBody);
  }

  @Delete('/delete/:id')
  async handleDeleteReview(@Param('id') reviewId: string, @Req() request: any) {
    const userId = request.user.userId;
    await this.reviewsService.deleteReview(userId, reviewId);
  }

  @Get('/:id')
  async handleGetProductReviews(@Param('id') productId: string) {
    const reviews = await this.reviewsService.getProductReviews(productId);
    return reviews;
  }
}
