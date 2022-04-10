import { IsNotEmpty, IsString } from 'class-validator';

export class VerifyPaymentDto {
  @IsString()
  @IsNotEmpty()
  paymentId: string;

  @IsString()
  @IsNotEmpty()
  paymentSignature: string;

  @IsString()
  @IsNotEmpty()
  orderId: string;
}
