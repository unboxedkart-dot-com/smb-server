import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateUserDetailsDto {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  name: string;

  //   @IsString()
  //   @IsNotEmpty()
  //   emailId: string;

  @IsString()
  @IsNotEmpty()
  gender: string;
}
