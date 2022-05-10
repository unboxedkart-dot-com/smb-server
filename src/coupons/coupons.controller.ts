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
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CouponsService } from './coupons.service';
import { CreateCouponDto } from './dto/create-coupon.dto';

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
  @Post('personal-coupon')
  async handleCreatePersonalCoupon(@Req() request: any) {
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

  @UseGuards(JwtAuthGuard)
  @Get('all-coupons')
  async handleGetAllCoupons(@Req() request: any) {
    const userId = request.user.userId;
    const isAdmin = await this.authService.CheckIfAdmin(userId);
    if (isAdmin) {
      const response = await this.couponsService.getCoupons();
      return response;
    } else {
      throw new UnauthorizedException();
    }
  }

  @UseGuards(JwtAuthGuard)
  @Post('create')
  async handleCreateCoupon(
    @Req() request: any,
    @Body() entireBody: CreateCouponDto,
  ) {
    const userId = request.user.userId;
    const isAdmin = await this.authService.CheckIfAdmin(userId);
    if (isAdmin) {
      const response = await this.couponsService.createCoupon(entireBody);
      return response;
    } else {
      throw new UnauthorizedException();
    }
  }
}
