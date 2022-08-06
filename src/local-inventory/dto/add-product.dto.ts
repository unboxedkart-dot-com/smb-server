import {
  IsBoolean,
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class AddProductDto {
  //   @IsString()
  //   @IsNotEmpty()
  //   description: string;

  //   @IsString()
  //   @IsNotEmpty()
  //   anyProblems: string;

  //   @IsBoolean()
  //   warrantyStatus: boolean;

  //   @IsDate()
  //   warrantyEndDate: Date;

  //   @IsString()
  //   warrantyEndDateInString: string;

  //   @IsString()
  //   @IsNotEmpty()
  //   serialNumber: string;

  //   @IsString()
  //   @IsNotEmpty()
  //   imei1Number: string;

  //   @IsString()
  //   imei2Number: string;

  //   @IsString()
  //   @IsNotEmpty()
  //   category: string;

  //   @IsString()
  //   @IsNotEmpty()
  //   brand: string;

  //   @IsString()
  //   @IsNotEmpty()
  //   grade: string;

  //   @IsString()
  //   @IsNotEmpty()
  //   categoryCode: string;

  //   @IsString()
  //   @IsNotEmpty()
  //   brandCode: string;

  //   @IsString()
  //   @IsNotEmpty()
  //   gradeCode: string;

  //   @IsString()
  //   @IsNotEmpty()
  //   title: string;

  //   @IsString()
  //   boxContains: string;

  //   @IsString()
  //   @IsNotEmpty()
  //   ram: string;

  //   @IsString()
  //   @IsNotEmpty()
  //   color: string;

  //   @IsString()
  //   @IsNotEmpty()
  //   processor: string;

  //   @IsString()
  //   @IsNotEmpty()
  //   ramCode: string;

  //   @IsString()
  //   @IsNotEmpty()
  //   colorCode: string;

  //   @IsString()
  //   @IsNotEmpty()
  //   processorCode: string;

  //   @IsNumber()
  //   @IsNotEmpty()
  //   buyingPrice: number;

  //   @IsNumber()
  //   @IsNotEmpty()
  //   expectedSellingPrice: number;

  //   @IsNumber()
  //   @IsNotEmpty()
  //   minimumSellingPrice: number;

  //   @IsNumber()
  //   @IsNotEmpty()
  //   sellingPrice: number;

  @IsString()
  @IsNotEmpty()
  purchaseDateInString: string;

  @IsString()
  @IsNotEmpty()
  purchaseDate: String;

  //   @IsDate()
  //   saleDate: Date;

  //   @IsString()
  //   @IsNotEmpty()
  //   saleDateInString: string;

  @IsString()
  @IsOptional()
  originalInvoiceUrl: string;

  @IsString()
  @IsOptional()
  purchaseInvoiceUrl: string;

  @IsNotEmpty()
  buyingAgentDetails: any;

  @IsNotEmpty()
  sellerDetails: any;

  @IsNotEmpty()
  productDetails: any;

  @IsNotEmpty()
  pricingDetails: any;

  @IsNotEmpty()
  moreDetails: any;

  @IsNotEmpty()
  @IsOptional()
  imageUrls: any;
}
