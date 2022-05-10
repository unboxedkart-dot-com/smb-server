import {
  IsBoolean,
  IsDate,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateCouponDto {
  @IsString()
  @IsNotEmpty()
  couponCode: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsNumber()
  @IsNotEmpty()
  discountAmount: number;

  @IsNumber()
  @IsNotEmpty()
  minimumOrderTotal: number;

  @IsNumber()
  @IsOptional()
  redemptionLimit: number;

  @IsDate()
  @IsOptional()
  expiryTime: Date;

  @IsString()
  @IsNotEmpty()
  discountType: string;

  @IsString()
  @IsNotEmpty()
  redemptionType: string;

  @IsString()
  @IsNotEmpty()
  expiryType: string;

  @IsBoolean()
  @IsOptional()
  isPersonalCoupon: boolean;
}
