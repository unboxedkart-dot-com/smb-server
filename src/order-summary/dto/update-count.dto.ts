import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class UpdateProductCountDto {
  @IsString()
  @IsNotEmpty()
  productId: string;

  @IsNumber()
  @IsNotEmpty()
  updatedCount: number;

  @IsNumber()
  @IsNotEmpty()
  productIndex : number;
}
