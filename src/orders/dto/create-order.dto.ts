import { IsNotEmpty, IsOptional, isString, IsString } from 'class-validator';

export class CreateOrderDto {
  // @IsNotEmpty()
  // orderItems: [{ productId: string; productCount: string }];

  // @IsOptional()
  // @IsNotEmpty()
  // deliveryAddress: any;

  @IsString()
  @IsNotEmpty()
  paymentType: string;

  // @IsString()
  // @IsOptional()
  // @IsNotEmpty()
  // couponCode: string;

  // @IsString()
  // @IsOptional()
  // @IsNotEmpty()
  // paymentId: string;
}
