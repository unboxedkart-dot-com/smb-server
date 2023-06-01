import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class ClickedOnBuyNowDto {
  @IsString()
  @IsNotEmpty()
  productId: string;
}
