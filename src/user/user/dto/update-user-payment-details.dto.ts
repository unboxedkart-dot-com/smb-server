
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateUserPaymentDetailsDto {
  @IsString()
  @IsNotEmpty()
  upiName: string;

  //   @IsString()
  //   @IsNotEmpty()
  //   emailId: string;

  @IsString()
  @IsOptional()
  upiId: string;
}
