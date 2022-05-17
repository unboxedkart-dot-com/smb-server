import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateCarouselItemDto {
  @IsString()
  @IsNotEmpty()
  imageUrl: string;

  @IsString()
  @IsNotEmpty()
  placement: string;

  @IsString()
  @IsOptional()
  brandCode: string;

  @IsString()
  @IsOptional()
  categoryCode: string;

  @IsString()
  @IsOptional()
  conditionCode: string;

  @IsString()
  @IsOptional()
  title: string;

  @IsString()
  @IsOptional()
  productCode: string;

  @IsBoolean()
  @IsOptional()
  isExact: boolean;

  @IsString()
  @IsOptional()
  productId: string;
}
