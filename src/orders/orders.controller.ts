import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { response } from 'express';
import { request } from 'http';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrdersService } from './orders.service';

@UseGuards(JwtAuthGuard)
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Get('/referrals')
  async handleGetReferrals(@Req() request: any) {
    const userId = request.user.userId;
    const referrals = await this.ordersService.getReferrals(userId);
    return referrals;
  }

  @Delete('/deleteall')
  async handleDeleteAllOrder() {
    const orders = await this.ordersService.deleteAll();
    return orders;
  }

  @Post('/create-payment')
  async createDummyOrder() {
    const payment = await this.ordersService.createPaymentOrder();
    return payment;
  }

  @Post('create')
  async handleCreateOrder(
    @Req() request: any,
    @Body() entireBody: CreateOrderDto,
  ) {
    const userId = request.user.userId;
    const orders = await this.ordersService.createOrder(entireBody, userId);
    return orders;
  }

  @Get()
  async handleGetOrdersItems(@Req() request: any) {
    const userId = request.user.userId;
    const orders = await this.ordersService.getOrderItems(userId);
    return orders;
  }

  @Get('/:id')
  async handleGetOrderItem(@Req() request: any, @Param('id') orderId: string) {
    const userId = request.user.userId;
    const orders = await this.ordersService.getOrderItem(userId, orderId);
    return orders;
  }

  @Patch('update/:id')
  async updateOrderItem(@Req() request: any, @Param('id') productId: string) {
    const userId = request.user.userId;
    // const orders = await this.ordersService.updateOrderItem(userId, productId);
  }

  //admin only

  @Patch('accept/:id')
  async handleAcceptOrder(
    @Req() request: any,
    @Param('id') orderItemId: string,
  ) {
    const userId = request.user.userId;
    const response = await this.ordersService.acceptOrder(userId, orderItemId);
    return response;
  }

  @Patch('ready-for-pickup/:id')
  async handleSetOrderReadyForPickup(
    @Req() request: any,
    @Param('id') orderItemId: string,
  ) {
    const userId = request.user.userId;
    const response = await this.ordersService.orderReadyForPickUp(
      userId,
      orderItemId,
    );
    return response;
  }

  @Patch('delivered/:id')
  async handleSerOrderDelivered(
    @Req() request: any,
    @Param('id') orderItemId: string,
  ) {
    const userId = request.user.userId;
    const response = await this.ordersService.orderDelivered(
      userId,
      orderItemId,
    );
    return response;
  }

  @Patch('shipped/:id')
  async handleSetOrderShipped(
    @Req() request: any,
    @Param('id') orderItemId: string,
  ) {
    const userId = request.user.userId;
    const response = await this.ordersService.orderShipped(userId, orderItemId);
    return response;
  }

  @Patch('out-for-delivery/:id')
  async handleSetOrderOutForDelivery(
    @Req() request: any,
    @Param('id') orderItemId: string,
  ) {
    const userId = request.user.userId;
    const response = await this.ordersService.orderOutForDelivery(
      userId,
      orderItemId,
    );
    return response;
  }

  // @Post('dummy-push')
  // async handleSendPushNotification() {
  //   console.log('dummt push started');
  //   const response = this.ordersService.handleOrderConfirmationNotification();
  // }
}
