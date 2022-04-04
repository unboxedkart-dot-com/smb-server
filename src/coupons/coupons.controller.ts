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

@UseGuards(JwtAuthGuard)
@Controller('coupons')
export class CouponsController {
  constructor(private readonly couponsService: CouponsService) {}

  @Post('personal-coupon')
  async handleCreateCoupon(@Req() request: any) {
    const userId = request.user.userId;
    const response = await this.couponsService.createPersonalCoupon(userId);
    return response;
  }

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
