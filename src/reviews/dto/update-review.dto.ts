import { IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateReviewDto {

  @IsString()
  @IsNotEmpty()
  reviewId : string;
    
  @IsString()
  @IsNotEmpty()
  userName: string;

  @IsNumber()
  @IsNotEmpty()
  rating: number;

  @IsString()
  @IsOptional()
  reviewTitle: string;

  @IsString()
  @IsOptional()
  reviewSubTitle: string;
  
  @IsString()
  @IsNotEmpty()
  productId: string;

  @IsString()
  productTitle: string;

  @IsString()
  @IsNotEmpty()
  imageUrl: string;
}
