import {
  Body,
  Controller,
  Get,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-strategies/jwt-auth.guard';
import { AddDeliveryAddressDto } from './dto/add-address.dto';
import { AddSelectedStoreDto } from './dto/add-selected-store.dto';
import { CreateOrderSummaryDto } from './dto/create-order-summary.dto';
import { UpdateProductCountDto } from './dto/update-count.dto';
import { VerifyPaymentDto } from './dto/verify-payment.dto';
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

  @Patch('update')
  async handleUpdateCount(
    @Req() request: any,
    @Body() entireBody: UpdateProductCountDto,
  ) {
    const userId = request.user.userId;
    const result = await this.orderSummaryService.updateCount(
      userId,
      entireBody,
    );
    return result;
  }

  @Patch('update/coupon')
  async handleAddCoupon(
    @Req() request: any,
    @Body('couponCode') couponCode: string,
  ) {
    const userId = request.user.userId;
    const result = await this.orderSummaryService.addCouponDetails(
      userId,
      couponCode,
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
    @Body() entireBody: AddSelectedStoreDto,
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
    @Body() entireBody: AddDeliveryAddressDto,
    @Req() request: any,
  ) {
    console.log('addddd bodt', entireBody);
    const userId = request.user.userId;
    const response = await this.orderSummaryService.addDeliveryAddress(
      userId,
      entireBody,
    );
    return response;
  }

  @Get('payable-amount')
  async handleGetPayableAmount(@Req() request: any) {
    console.log('getting payable amount');
    const userId = request.user.userId;
    const response = await this.orderSummaryService.getPayableAmount(userId);
    console.log(response);
    return response;
  }
  @Get('partial-payment')
  async handleGetPartialPaymentAmount(@Req() request: any) {
    const userId = request.user.userId;
    const response = await this.orderSummaryService.getPartialPaymentAmount(
      userId,
    );
    return response;
  }

  @Patch('update/payment-method')
  async handleUpdatePaymentMethod(
    @Req() request: any,
    @Body('paymentMethod') paymentMethod: string,
  ) {
    const userId = request.user.userId;
    const response = await this.orderSummaryService.addPaymentMethod(
      userId,
      paymentMethod,
    );
    return response;
  }

  @Post('verify-payment')
  async handleVerifyPayment(
    @Req() request: any,
    @Body() entireBody: VerifyPaymentDto,
  ) {
    const userId = request.user.userId;
    const response = await this.orderSummaryService.verifyPaymentSignature(
      userId,
      entireBody,
    );
    console.log('response verify', response);
    return response;
  }

  @Post('verify-partial-payment')
  async handleVerifyPartialPayment(
    @Req() request: any,
    @Body() entireBody: VerifyPaymentDto,
  ) {
    const userId = request.user.userId;
    const response =
      await this.orderSummaryService.verifyPartialPaymentSignature(
        userId,
        entireBody,
      );
    console.log('response partial verify', response);
    return response;
  }
}
