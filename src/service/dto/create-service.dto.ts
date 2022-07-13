import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateServiceDto {
  @IsString()
  @IsNotEmpty()
  productTitle: String;

  @IsString()
  @IsNotEmpty()
  productCode: String;

  @IsString()
  @IsNotEmpty()
  color: String;

  @IsString()
  @IsNotEmpty()
  colorCode: String;

  @IsString()
  @IsNotEmpty()
  categoryCode: string;

  @IsString()
  @IsNotEmpty()
  serialNumber: String;

  @IsString()
  @IsNotEmpty()
  dateInString: String;

  @IsString()
  visitDate: any;

  @IsNotEmpty()
  services: any;

  @IsNumber()
  @IsNotEmpty()
  serviceMode: Number;

  selectedAddress: any;

  selectedStore: any;
}
