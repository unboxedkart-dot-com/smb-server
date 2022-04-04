import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class UpdateAddressDto {
  @IsString()
  @IsNotEmpty()
  addressId: string;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsNumber()
  phoneNumber: number;

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
