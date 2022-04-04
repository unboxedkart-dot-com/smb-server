import { IsNotEmpty, IsOptional, isString, IsString } from 'class-validator';

export class AddSearchTermDto {
  @IsString()
  @IsNotEmpty()
  searchTerm: string;
}
