import { IsNotEmpty, IsOptional, isString, IsString } from 'class-validator';

export class CreateOrderSummaryDto {
  @IsNotEmpty()
  orderItems: [{ productId: string; productCount: string }];

  @IsString()
  @IsOptional()
  @IsNotEmpty()
  couponCode: string;
}
