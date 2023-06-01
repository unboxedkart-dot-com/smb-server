import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class AddCartItemDto {
  @IsString()
  @IsNotEmpty()
  productId: string;
}
