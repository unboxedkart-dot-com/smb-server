import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class NewCampaignDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsBoolean()
  @IsNotEmpty()
  hasImage: Boolean;

  @IsBoolean()
  @IsNotEmpty()
  hasVideo: Boolean;

  @IsBoolean()
  @IsNotEmpty()
  hasLink: Boolean;

  @IsString()
  @IsOptional()
  imageUrl: string;

  @IsString()
  @IsOptional()
  videoUrl: string;

  @IsString()
  @IsOptional()
  linkUrl: string;

  @IsNumber()
  @IsNotEmpty()
  requiredViewsCount: Number;

  @IsString()
  @IsNotEmpty()
  campaignDateInString: string;

  @IsString()
  @IsOptional()
  preferredGender: string;

  @IsString()
  @IsOptional()
  preferredState: string;

  @IsString()
  @IsOptional()
  preferredDistrict: string;

  @IsString()
  @IsOptional()
  preferredCity: string;

  @IsNumber()
  @IsOptional()
  preferredPincode: Number;

  @IsNotEmpty()
  campaignDate: any;
}
