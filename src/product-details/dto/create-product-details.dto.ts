import { IsArray, IsNotEmpty, IsString } from 'class-validator';

export class CreateProductDetailsDto {
  @IsString()
  @IsNotEmpty()
  productCode: string;

  @IsArray()
  @IsNotEmpty()
  productSpecs: any[];
}
