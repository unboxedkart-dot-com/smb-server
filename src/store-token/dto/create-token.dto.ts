import { IsEmail, IsNotEmpty, IsOptional, isString, IsString } from 'class-validator';

export class CreateTokenDto {
  @IsString()
  @IsOptional()
  productId: string;
  
  @IsString()
  @IsOptional()
  tokenNumber: string;

  @IsString()
  @IsOptional()
  storeName: string;

  @IsString()
  @IsOptional()
  categoryCode: string;

  @IsString()
  @IsOptional()
  category: string;

  @IsString()
  @IsOptional()
  brandCode: number;

  @IsString()
  @IsOptional()
  brand: string;

  @IsString()
  @IsOptional()
  productCode: string;

  @IsString()
  @IsOptional()
  productTitle: string;

  @IsString()
  @IsOptional()
  colorCode: string;

  @IsString()
  @IsOptional()
  color: string;

  @IsString()
  @IsOptional()
  storage: string;

  @IsString()
  // @IsEmail()
  @IsOptional()
  storageCode: string;

  @IsString()
  @IsOptional()
  connectivityCode: string;

  @IsString()
  @IsOptional()
  connectivity: string;

  @IsString()
  @IsOptional()
  processorCode: string;

  @IsString()
  @IsOptional()
  processor: string;
}
