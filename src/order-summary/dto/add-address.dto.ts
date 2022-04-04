import { IsNotEmpty, IsOptional, isString, IsString } from 'class-validator';

export class AddDeliveryDetailsDto {
  @IsNotEmpty()
  orderItems: [{ productId: string; productCount: string }];

  @IsString()
  @IsOptional()
  @IsNotEmpty()
  couponCode: string;
}
