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
import { AddCartItemDto } from './dtos/add-cart-item.dto';
import { AddSearchedTermDto } from './dtos/add-searched-term.dto';
import { AddViewedProductDto } from './dtos/add-viewed-product.dto';
import { AddWishlistItemDto } from './dtos/add-wishlist-item.dto';
import { ClickedOnBuyNowDto } from './dtos/clicked-on-buy-now.dto';
import { clickedOnNeedMoreDiscountDto } from './dtos/clicked-on-need-more-discount.dto';
import { RemoveCartItemDto } from './dtos/remove-cart-item.dto';
import { RemoveWishlistItemDto } from './dtos/remove-wishlist-item.dto';
import { UsageTrackingControllerService } from './usage-tracking.service';

// @UseGuards(JwtAuthGuard)
@Controller('usage-tracking')
export class UsageTrackingController {
  constructor(
    private readonly usageTrackingService: UsageTrackingControllerService,
    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService,
  ) {}

  @Get()
  async handleGetNotifications(
    @Req() request: any,
    @Query('type') type: string,
  ) {
    // const userId = request.user.userId;
    // const isAdmin = await this.authService.CheckIfAdmin(userId);
    // if (isAdmin) {
    return this.usageTrackingService.getNotifications(type);
    // } else {
    //   console.log('throwing a new error');
    //   throw new UnauthorizedException();
    // }
  }

  @Post('/searched-item')
  async handleAddSearchedItem(
    @Req() request: any,
    @Body() entireBody: AddSearchedTermDto,
  ) {
    const userId: string = request.user.userId;
    return this.usageTrackingService.addSearchedItem(userId, entireBody);
  }

  @UseGuards(JwtAuthGuard)
  @Post('/viewed-product')
  async handleAddViewedProduct(
    @Req() request: any,
    @Body() entireBody: AddViewedProductDto,
  ) {
    console.log('adding viewed product');
    console.log(entireBody);
    const userId: string = request.user.userId;
    return this.usageTrackingService.addViewedProduct(userId, entireBody);
  }

  @UseGuards(JwtAuthGuard)
  @Post('/clicked-on-buy-now')
  async handleAddClickedOnBuyNow(
    @Req() request: any,
    @Body() entireBody: ClickedOnBuyNowDto,
  ) {
    console.log('trying to do something');
    const userId: string = request.user.userId;
    return this.usageTrackingService.addClickedOnBuyNow(userId, entireBody);
  }

  // @UseGuards(JwtAuthGuard)
  @Post('/add-wishlist-item')
  async handleAddWishlistItem(
    @Req() request: any,
    @Body() entireBody: AddWishlistItemDto,
  ) {
    const userId: string = request.user.userId;
    return this.usageTrackingService.addWishlistItem(userId, entireBody);
  }

  // @UseGuards(JwtAuthGuard)
  @Post('/add-cart-item')
  async handleAddCartItem(
    @Req() request: any,
    @Body() entireBody: AddCartItemDto,
  ) {
    const userId: string = request.user.userId;
    return this.usageTrackingService.addCartItem(userId, entireBody);
  }

  // @UseGuards(JwtAuthGuard)
  @Post('/remove-cart-item')
  async handleRemoveCartItem(
    @Req() request: any,
    @Body() entireBody: RemoveCartItemDto,
  ) {
    const userId: string = request.user.userId;
    return this.usageTrackingService.removeCartItem(userId, entireBody);
  }

  // @UseGuards(JwtAuthGuard)
  @Post('/remove-wishlist-item')
  async handleWishlistCartItem(
    @Req() request: any,
    @Body() entireBody: RemoveWishlistItemDto,
  ) {
    const userId: string = request.user.userId;
    return this.usageTrackingService.removeWishlistItem(userId, entireBody);
  }

  @UseGuards(JwtAuthGuard)
  @Post('/clicked-to-call')
  async handleAddClickedToCall(@Req() request: any) {
    const userId: string = request.user.userId;
    return this.usageTrackingService.addClickedOnCall(userId);
    ('');
  }

  @UseGuards(JwtAuthGuard)
  @Post('/clicked-on-need-more-discount')
  async handleClickedOnNeedMoreDiscount(
    @Req() request: any,
    @Body() entireBody: clickedOnNeedMoreDiscountDto,
  ) {
    const userId: string = request.user.userId;
    return this.usageTrackingService.clickedOnNeedMoreDiscount(
      userId,
      entireBody,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Post('/know-more-about-unboxedkart')
  async handleKnowMoreAboutUnboxedkart(@Req() request: any) {
    const userId: string = request.user.userId;
    return this.usageTrackingService.KnowMoreAboutUnboxedkart(userId);
  }

  @UseGuards(JwtAuthGuard)
  @Post('/know-more-about-store-pickup')
  async handleKnowMoreAboutStorePickup(@Req() request: any) {
    const userId: string = request.user.userId;
    return this.usageTrackingService.KnowMoreAboutStorePickup(userId);
  }

  @UseGuards(JwtAuthGuard)
  @Post('/find-stores')
  async KnowMoreAboutStores(@Req() request: any) {
    const userId: string = request.user.userId;
    return this.usageTrackingService.findStores(userId);
  }

  @UseGuards(JwtAuthGuard)
  @Post('/view-carousel')
  async viewCarouselItem(
    @Body('carouselId') carouselId: string,
    @Req() request: any,
  ) {
    const userId: string = request.user.userId;
    console.log('trying to add carousel', carouselId);
    return this.usageTrackingService.handleViewedCarouselItem(
      userId,
      carouselId,
    );
  }

  // @UseGuards(JwtAuthGuard)
  // @Post('/view-carousel-item')
  // async ViewedCarouselItem(@Req() request: any, ) {
  //   const userId: string = request.user.userId;
  //   return this.usageTrackingService.handleViewedCarouselItem(
  //     userId,
  //     carouselId,
  //   );
  // }
}

// localhost:3000/usage-tracking/searched-item
// localhost:3000/usage-tracking/viewed-product
// localhost:3000/usage-tracking/clicked-on-buy-now
// localhost:3000/usage-tracking/clicked-on-need-more-discount
// localhost:3000/usage-tracking/add-wishlist-item
// localhost:3000/usage-tracking/remove-wishlist-item
// localhost:3000/usage-tracking/add-cart-item
// localhost:3000/usage-tracking/remove-cart-item
// localhost:3000/usage-tracking/clicked-to-call

// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2MmIzYmZjZjM3M2VkN2NiNTU1NWNhMWEiLCJpYXQiOjE2ODA2ODgxOTYsImV4cCI6MTY4MDY4ODc5Nn0.GubPkKpETffTIR6ZX54FAyqBUgnp4yjUb_mSs2SH2vw

// type codes
// new-user
// sign-in
// find-store
// know-more-about-unboxedkart
// know-more-about-store-pickup
// searched-item
// viewed-item
// need-more-discount
// wishlist-item
// cart-item
// clicked-on-buy-now
// call
