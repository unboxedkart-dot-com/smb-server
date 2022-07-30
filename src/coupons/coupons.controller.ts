import {
  Body,
  Controller,
  forwardRef,
  Get,
  Inject,
  Param,
  Post,
  Query,
  Req,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { JwtAuthGuard } from 'src/auth/jwt-strategies/jwt-auth.guard';
import { CouponsService } from './coupons.service';

// @UseGuards(JwtAuthGuard)
@Controller('coupons')
export class CouponsController {
  constructor(
    private readonly couponsService: CouponsService,
    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService,
  ) {}

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
    );
    return response;
  }


}
