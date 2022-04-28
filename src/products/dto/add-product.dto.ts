import { IsArray, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { isMap } from 'util/types';

export class CreateProductDto {

  @IsString()
  @IsNotEmpty()
  productCode: string;

  @IsString()
  @IsNotEmpty()
  SKU: string;

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  modelNumber: string;

  @IsString()
  @IsNotEmpty()
  brand: string;

  @IsString()
  @IsNotEmpty()
  brandCode: string;

  @IsString()
  @IsNotEmpty()
  category: string;

  @IsString()
  @IsNotEmpty()
  categoryCode: string;

  @IsString()
  @IsNotEmpty()
  condition: string;

  @IsString()
  @IsNotEmpty()
  conditionCode: string;

  @IsString()
  @IsNotEmpty()
  coverImage: string;

  @IsArray()
  @IsNotEmpty()
  images: string[];

  @IsNumber()
  @IsNotEmpty()
  price: number;

  @IsNumber()
  @IsNotEmpty()
  sellingPrice: number;

  @IsNumber()
  @IsNotEmpty()
  quantity: number;

  @IsArray()
  @IsNotEmpty()
  searchCases: string[];

  @IsString()
  @IsNotEmpty()
  color: string;

  @IsString()
  @IsNotEmpty()
  colorCode: string;

  @IsString()
  @IsNotEmpty()
  storage: string;

  @IsString()
  @IsNotEmpty()
  storageCode: string;
}
