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
  @IsNotEmpty()
  emailId: string;

  @IsString()
  @IsOptional()
  state: string;

  @IsString()
  @IsOptional()
  district: string;

  @IsString()
  @IsOptional()
  city: string;

  @IsString()
  @IsOptional()
  profilePicUrl: string;

  @IsNumber()
  @IsOptional()
  pinCode: string;

  @IsNumber()
  @IsOptional()
  contactsCount: string;


}
