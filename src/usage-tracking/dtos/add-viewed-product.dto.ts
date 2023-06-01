import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class AddViewedProductDto {
  @IsString()
  @IsNotEmpty()
  productId: string;
}
