import {
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  isString,
  IsString,
} from 'class-validator';

export class AddStoreLocationDto {
  @IsString()
  @IsNotEmpty()
  storeName: string;

  @IsString()
  @IsNotEmpty()
  streetName: string;

  @IsString()
  @IsNotEmpty()
  cityName: string;

  @IsNumber()
  @IsNotEmpty()
  pinCode: number;

  @IsString()
  @IsNotEmpty()
  directionsUrl: string;

  @IsString()
  @IsNotEmpty()
  storeTimings: string;

  @IsString()
  @IsNotEmpty()
  storeOpenDays: string;

  @IsNumber()
  @IsNotEmpty()
  contactNumber: number;

  @IsNumber()
  @IsOptional()
  alternateContactNumber: number;

  @IsNotEmpty()
  @IsString()
  pickUpTimeStart: string;

  @IsNotEmpty()
  @IsString()
  pickUpTimeEnd: string;
}
