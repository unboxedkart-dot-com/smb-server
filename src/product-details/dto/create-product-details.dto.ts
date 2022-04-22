import { IsArray, IsNotEmpty, IsString } from 'class-validator';

export class CreateProductDetailsDto {
  @IsString()
  @IsNotEmpty()
  productId: string;

  @IsString()
  @IsNotEmpty()
  productCode: string;

  @IsArray()
  @IsNotEmpty()
  productSpecs: any[];
}
