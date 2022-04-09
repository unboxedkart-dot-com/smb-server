import { IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateReviewDto {
  @IsNumber()
  @IsNotEmpty()
  rating: number;

  @IsString()
  @IsOptional()
  @IsOptional()
  reviewTitle: string;

  @IsString()
  @IsOptional()
  @IsOptional()
  reviewContent: string;
  
  @IsString()
  @IsNotEmpty()
  productId: string;

}
