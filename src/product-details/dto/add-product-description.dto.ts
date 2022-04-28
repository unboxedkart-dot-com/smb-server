import { IsArray, IsNotEmpty, IsString } from 'class-validator';

export class AddProductDescriptionDto {
  @IsArray()
  @IsNotEmpty()
  productDescription: string[];

  @IsString()
  @IsNotEmpty()
  productCode: string;
}
