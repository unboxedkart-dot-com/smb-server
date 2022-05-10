import {
  IsNotEmpty,
  IsString,
  IsOptional,
  IsArray,
  IsNumber,
} from 'class-validator';

export class AddProductImagesDto {
  @IsString()
  @IsNotEmpty()
  productCode: string;

  @IsString()
  @IsNotEmpty()
  colorCode: string;

  @IsString()
  @IsOptional()
  coverImage: string;

  @IsArray()
  @IsOptional()
  images: [];

  @IsArray()
  @IsOptional()
  thumbnails: [];

  @IsNumber()
  @IsNotEmpty()
  count: number;
}
