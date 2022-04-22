import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CouponsService } from './coupons.service';

// @UseGuards(JwtAuthGuard)
@Controller('coupons')
export class CouponsController {
  constructor(private readonly couponsService: CouponsService) {}

  @UseGuards(JwtAuthGuard)
  @Get('/referral-coupon')
  async handleGetPersonalCoupon(@Req() request: any) {
    const userId = request.user.userId;
    const response = await this.couponsService.getPersonalCoupon(userId);
    return response;
  }

  @Get()
  async handleGetCoupons() {
    const response = await this.couponsService.getCoupons();
    return response;
  }

  @UseGuards(JwtAuthGuard)
  @Post('personal-coupon')
  async handleCreateCoupon(@Req() request: any) {
    const userId = request.user.userId;
    const response = await this.couponsService.createPersonalCoupon(userId);
    return response;
  }

  @UseGuards(JwtAuthGuard)
  @Get('validate')
  async handleValidateCoupon(
    @Query('couponCode') couponCode: string,
    @Query('cartTotal') cartTotal: number,
    @Req() request: any,
  ) {
    const userId = request.user.userId;
    const response = await this.couponsService.validateCoupon(
      userId,
      couponCode,
      cartTotal,
    );
    return response;
  }
}
