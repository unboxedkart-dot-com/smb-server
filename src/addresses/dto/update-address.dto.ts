import { IsNotEmpty, IsString, IsNumber, IsOptional } from 'class-validator';

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
  @IsOptional()
  @IsNumber()
  alternatePhoneNumber: number;

  @IsNotEmpty()
  @IsString()
  doorNo: string;

  @IsOptional()
  @IsString()
  lane: string;

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
  @IsOptional()
  landmark: string;

  @IsNotEmpty()
  @IsNumber()
  pinCode: number;

  @IsNotEmpty()
  @IsString()
  addressType: string;
}
