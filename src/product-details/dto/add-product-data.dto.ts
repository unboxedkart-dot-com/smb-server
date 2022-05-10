import { IsNotEmpty, IsString, IsOptional, IsArray } from 'class-validator';

export class AddProductDataDto {
  @IsString()
  @IsNotEmpty()
  productCode: string;

  @IsString()
  @IsNotEmpty()
  categoryCode: string;

  @IsString()
  @IsNotEmpty()
  category: string;

  @IsString()
  @IsNotEmpty()
  brandCode: string;

  @IsString()
  @IsNotEmpty()
  brand: string;

  @IsArray()
  @IsNotEmpty()
  highlights: string[];

  @IsString()
  //   @IsNotEmpty()
  title: string;

  @IsString()
  //   @IsNotEmpty()
  modelNumber: string;

  @IsString()
  @IsNotEmpty()
  modelCode: string;

  @IsArray()
  @IsOptional()
  processors: [
    {
      code: string;
      title: string;
    },
  ];

  @IsArray()
  @IsOptional()
  rams: [
    {
      code: string;
      title: string;
    },
  ];

  @IsArray()
  //   @IsNotEmpty()
  colors: [
    {
      code: string;
      title: string;
    },
  ];

  @IsArray()
  @IsOptional()
  storages: [
    {
      code: string;
      title: string;
    },
  ];
}
