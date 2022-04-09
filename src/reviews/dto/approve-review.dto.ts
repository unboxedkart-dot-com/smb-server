import { IsNotEmpty, IsString } from 'class-validator';

export class ApproveReviewDto {
  @IsString()
  @IsNotEmpty()
  reviewId: string;
}
