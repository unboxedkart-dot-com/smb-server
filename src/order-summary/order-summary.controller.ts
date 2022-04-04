import {
  Body,
  Controller,
  Get,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AddAddressDto } from 'src/addresses/dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { AddStoreLocationDto } from 'src/store-location/dto/add-store-location.dto';
import { CreateOrderSummaryDto } from './dto/create-order-summary.dto';
import { OrderSummaryService } from './order-summary.service';

@UseGuards(JwtAuthGuard)
@Controller('order-summary')
export class OrderSummaryController {
  constructor(private readonly orderSummaryService: OrderSummaryService) {}

  @Get()
  async handleGetOrderSummaryItems(@Req() request: any) {
    const userId = request.user.userId;
    const result = await this.orderSummaryService.getOrderSummaryItems(userId);
    return result;
  }

  @Post('add')
  async handleCreateOrderSummaryItems(
    @Req() request: any,
    @Body() entireBody: CreateOrderSummaryDto,
  ) {
    const userId = request.user.userId;
    const result = await this.orderSummaryService.createOrderSummaryItems(
      userId,
      entireBody,
    );
    return result;
  }

  @Patch('update/coupon')
  async handleAddCoupon(@Req() request: any, @Body() entireBody: any) {
    const userId = request.user.userId;
    const result = await this.orderSummaryService.addCouponDetails(
      userId,
      entireBody,
    );
    return result;
  }

  // @Patch('update/delivery')
  // async handleAddDeliveryDetails(@Req() request: any, @Body() entireBody: any) {
  //   const userId = request.user.userId;
  //   const result = await this.orderSummaryService.addDeliveryDetails(
  //     userId,
  //     entireBody,
  //   );
  //   return result;
  // }

  @Patch('update/store-details')
  async handleAddStoreDetails(
    @Req() request: any,
    @Body() entireBody: AddStoreLocationDto,
  ) {
    const userId = request.user.userId;
    console.log('entre body', entireBody);
    const response = await this.orderSummaryService.addSelectedStoreDetails(
      userId,
      entireBody,
    );
    return response;
  }

  @Patch('update/address-details')
  async handleAddDeliveryAddress(
    entireBody: AddAddressDto,
    @Req() request: any,
  ) {
    const userId = request.user.userId;
    const response = await this.orderSummaryService.addDeliveryAddress(
      userId,
      entireBody,
    );
    return response;
  }

  @Get('payable-amount')
  async handleGetPayableAmount(@Req() request: any) {
    const userId = request.user.userId;
    const response = await this.orderSummaryService.getPayableAmount(userId);
    return response;
  }
}