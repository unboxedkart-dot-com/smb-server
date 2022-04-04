import { IsNotEmpty, IsString, IsNumber, IsOptional } from 'class-validator';

export class AddAddressDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsNumber()
  phoneNumber: number;

  @IsOptional()
  @IsNotEmpty()
  @IsNumber()
  alternatePhoneNumber: number;

  @IsNotEmpty()
  @IsString()
  doorNo: string;

  @IsNotEmpty()
  @IsString()
  street: string;

  @IsNotEmpty()
  @IsString()
  cityName: string;

  @IsNotEmpty()
  @IsString()
  stateName: string;

  @IsNotEmpty()
  @IsString()
  landmark: string;

  @IsNotEmpty()
  @IsNumber()
  pinCode: number;

  @IsNotEmpty()
  @IsString()
  addressType: string;
}
