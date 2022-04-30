import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CancelOrderDto {
  @IsString()
  @IsNotEmpty()
  orderId: string;

  @IsString()
  @IsNotEmpty()
  orderNumber: string;

  @IsString()
  @IsNotEmpty()
  reasonTitle: string;

  @IsString()
  @IsOptional()
  reasonContent: string;
}
