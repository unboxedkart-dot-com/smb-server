import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class SignUpDto {
  @IsString()
  @IsNotEmpty()
  representativeName: string;

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
  @IsNotEmpty()
  designation: string;

  @IsString()
  @IsNotEmpty()
  companyName: string;

  @IsString()
  @IsNotEmpty()
  category: string;

  @IsNumber()
  @IsNotEmpty()
  officeMobileNumber: number;

  @IsString()
  @IsOptional()
  profilePicUrl: string;

  @IsString()
  @IsOptional()
  officeAddress: string;
}
