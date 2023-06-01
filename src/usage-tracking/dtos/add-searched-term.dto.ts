import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class AddSearchedTermDto {
  @IsString()
  @IsNotEmpty()
  searchTerm: string;
}
