import {
  Body,
  Controller,
  Delete,
  forwardRef,
  Get,
  Inject,
  Param,
  Patch,
  Post,
  Query,
  Req,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { JwtAuthGuard } from 'src/auth/jwt-strategies/jwt-auth.guard';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { ReviewsService } from './reviews.service';

@Controller('reviews')
export class ReviewsController {
  constructor(
    private readonly reviewsService: ReviewsService,
    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async handleGetUserReviews(@Req() request: any) {
    const userId = request.user.userId;
    const reviews = await this.reviewsService.getUserReviews(userId);
    return reviews;
  }

  // @Get('/:id')
  // async handleGetProductReviews(@Param('id')){
  //   const reviews = await this.reviewsService.getProductReviews()
  // }
  @UseGuards(JwtAuthGuard)
  @Post('/create')
  async handleCreateReview(
    @Req() request: any,
    @Body() entireBody: CreateReviewDto,
  ) {
    const userId = request.user.userId;
    await this.reviewsService.createReview(userId, entireBody);
  }

  @UseGuards(JwtAuthGuard)
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


  @UseGuards(JwtAuthGuard)
  @Delete('/delete/:id')
  async handleDeleteReview(@Param('id') reviewId: string, @Req() request: any) {
    const userId = request.user.userId;
    await this.reviewsService.deleteReview(userId, reviewId);
  }

  @Get('/product/:id')
  async handleGetProductReviews(@Param('id') productId: string) {
    const reviews = await this.reviewsService.getProductReviews(productId);
    return reviews;
    // return {
    //   data: reviews,
    // };
  }

  @Get('/product/all/:id')
  async handleGetAllProductReviews(@Param('id') productId: string) {
    const reviews = await this.reviewsService.getProductReviews(productId);
    return {
      data: reviews,
    };
  }
}
