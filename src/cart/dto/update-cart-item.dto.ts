import { IsMongoId, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class UpdateCartItemDto {
  @IsNotEmpty()
  @IsString()
  @IsMongoId({ each: true })
  productId: string;

  @IsNumber()
  @IsNotEmpty()
  productCount: number;
}
