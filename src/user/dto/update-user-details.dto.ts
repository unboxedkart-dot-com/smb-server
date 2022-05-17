import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateUserDetailsDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  //   @IsString()
  //   @IsNotEmpty()
  //   emailId: string;

  @IsString()
  @IsOptional()
  gender: string;
}
