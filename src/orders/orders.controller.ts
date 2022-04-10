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
import { request } from 'http';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrdersService } from './orders.service';

// @UseGuards(JwtAuthGuard)
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Delete('/deleteall')
  async handleDeleteAllOrder() {
    const orders = await this.ordersService.deleteAll();
    return orders;
  }

  @Post('/create-payment')
  async createDummyOrder(){
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
}
