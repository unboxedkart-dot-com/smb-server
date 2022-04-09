import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class SignUpDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsNotEmpty()
  phoneNumber: number;

  @IsNumber()
  @IsNotEmpty()
  otp: number;

  @IsString()
  @IsOptional()
  deviceId: string;

  @IsString()
  @IsNotEmpty()
  emailId: string;

  @IsString()
  @IsOptional()
  gender: string;
}
