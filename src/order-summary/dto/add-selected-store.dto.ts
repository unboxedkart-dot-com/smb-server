import {
  IsDate,
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  isString,
  IsString,
} from 'class-validator';

export class AddSelectedStoreDto {
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
  // @IsDate()
  pickUpTimeStart: string;

  @IsNotEmpty()
  // @IsDate()
  pickUpTimeEnd: string;

  @IsNotEmpty()
  // @IsDate()
  pickUpDate: string;

  @IsNotEmpty()
  @IsString()
  pickUpTimeInString: string;

  @IsNotEmpty()
  @IsString()
  pickUpDateInString: string;
}
