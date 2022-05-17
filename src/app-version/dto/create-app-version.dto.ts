import { IsNotEmpty, IsString } from 'class-validator';

export class CreateAppVersionDto {
  @IsString()
  @IsNotEmpty()
  version: string;

  @IsString()
  @IsNotEmpty()
  minAppVersion: string;

  @IsString()
  @IsNotEmpty()
  publishDate: string;

  @IsString()
  @IsNotEmpty()
  description: string;
}
