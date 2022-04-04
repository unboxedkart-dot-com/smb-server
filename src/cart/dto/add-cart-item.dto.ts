import { IsMongoId, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class AddCartItemDto {
  @IsNotEmpty()
  @IsString()
  @IsMongoId({ each: true })
  productId: string;

  @IsNumber()
  productCount: number;
}
