import {
  IsArray,
  isBoolean,
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { isMap } from 'util/types';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  productCode: string;

  // @IsString()
  // @IsNotEmpty()
  // SKU: string;

  // @IsString()
  // @IsNotEmpty()
  // title: string;

  // @IsString()
  // @IsNotEmpty()
  // modelNumber: string;

  // @IsString()
  // @IsNotEmpty()
  // modelCode: string;

  // @IsString()
  // @IsNotEmpty()
  // brand: string;

  // @IsString()
  // @IsNotEmpty()
  // brandCode: string;

  // @IsString()
  // @IsNotEmpty()
  // category: string;

  // @IsString()
  // @IsNotEmpty()
  // categoryCode: string;

  @IsString()
  @IsNotEmpty()
  condition: string;

  @IsString()
  @IsNotEmpty()
  conditionCode: string;

  @IsString()
  @IsNotEmpty()
  aboutProduct: string;

  // @IsString()
  // @IsNotEmpty()
  // coverImage: string;

  @IsArray()
  @IsOptional()
  images: string[];

  @IsNumber()
  @IsNotEmpty()
  price: number;

  @IsNumber()
  @IsNotEmpty()
  sellingPrice: number;

  @IsNumber()
  @IsNotEmpty()
  inventoryCount: number;

  @IsString()
  @IsNotEmpty()
  color: string;

  @IsString()
  @IsNotEmpty()
  colorCode: string;

  @IsString()
  @IsOptional()
  storage: string;

  @IsString()
  @IsOptional()
  storageCode: string;

  @IsString()
  @IsOptional()
  processor: string;

  @IsString()
  @IsOptional()
  processorCode: string;

  @IsString()
  @IsOptional()
  ram: string;

  @IsString()
  @IsOptional()
  ramCode: string;

  @IsBoolean()
  @IsOptional()
  isFeatured: boolean;

  @IsBoolean()
  @IsOptional()
  isBestSeller: boolean;

  @IsBoolean()
  @IsOptional()
  isCertified: boolean;

  @IsString()
  @IsOptional()
  warrantyDescription: string;

  @IsString()
  @IsNotEmpty()
  boxContains: string;

  @IsString()
  @IsOptional()
  warrantyExpiryDate: string;

  @IsBoolean()
  @IsOptional()
  isUnderWarranty: boolean;

  @IsNumber()
  @IsOptional()
  warrantyLeftInMonths: number;
}
