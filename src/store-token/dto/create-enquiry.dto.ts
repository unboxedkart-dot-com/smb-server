import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateEnquiryDto {
  @IsString()
  @IsOptional()
  name: string;

  @IsNumber()
  @IsNotEmpty()
  phoneNumber: number;

  @IsString()
  @IsOptional()
  advisor: string;

  @IsString()
  @IsOptional()
  advisorCode: string;

  @IsString()
  @IsOptional()
  enquirySourceCode: string;

  @IsString()
  @IsOptional()
  enquirySource: string;

  @IsString()
  @IsOptional()
  enquiryStatusCode: string;

  @IsString()
  @IsOptional()
  enquiryStatus: string;

  @IsString()
  @IsOptional()
  productAvailabilityCode: string;

  @IsString()
  @IsOptional()
  productAvailability: string;

  @IsString()
  @IsOptional()
  quotedPrice: string;

  @IsString()
  @IsOptional()
  askPrice: string;

  @IsString()
  @IsOptional()
  categoryCode: string;

  @IsString()
  @IsOptional()
  category: string;

  @IsString()
  @IsOptional()
  brandCode: string;

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
