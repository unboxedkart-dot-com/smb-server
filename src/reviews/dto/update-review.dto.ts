import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class UpdateReviewDto {
  @IsString()
  @IsNotEmpty()
  reviewId: string;

  @IsString()
  @IsOptional()
  userName: string;

  @IsNumber()
  @IsNotEmpty()
  rating: number;

  @IsString()
  @IsOptional()
  reviewTitle: string;

  @IsString()
  @IsOptional()
  reviewContent: string;

  @IsString()
  @IsOptional()
  productId: string;

  @IsString()
  @IsOptional()
  productTitle: string;

  @IsString()
  @IsOptional()
  imageUrl: string;
}
