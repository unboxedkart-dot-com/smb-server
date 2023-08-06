import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class LoginDto {
  @IsNumber()
  @IsNotEmpty()
  phoneNumber: number;

  @IsNumber()
  @IsNotEmpty()
  otp: number;

  @IsString()
  @IsOptional()
  deviceId : string;
}
