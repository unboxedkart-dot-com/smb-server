import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class AddVendorDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  //   @IsNotEmpty()
  //   @IsString()
  idProofDoc: string;

  //   @IsNotEmpty()
  //   @IsString()
  idProofNumber: string;

  @IsNotEmpty()
  @IsNumber()
  phoneNumber: number;

  //   @IsString()
  alternatePhoneNumber: number;

  @IsNotEmpty()
  @IsString()
  city: string;
}
