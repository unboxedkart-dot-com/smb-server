

// export class AddDeliveryDetailsDto {
//   @IsNotEmpty()
//   orderItems: [{ productId: string; productCount: string }];

//   @IsString()
//   @IsOptional()
//   @IsNotEmpty()
//   couponCode: string;
// }

import { IsNotEmpty, IsString, IsNumber, IsOptional } from 'class-validator';

export class AddDeliveryAddressDto {
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
  landmark: string;

  @IsNotEmpty()
  @IsNumber()
  pinCode: number;

  @IsNotEmpty()
  @IsString()
  addressType: string;

  // @IsNotEmpty()
  // @IsString()
  // deliveryDate: string;

  // @IsNotEmpty()
  // @IsString()
  // deliveryDateInString : string;
}

