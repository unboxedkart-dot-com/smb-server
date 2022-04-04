import {
  Body,
  Controller,
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

@UseGuards(JwtAuthGuard)
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

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

  @Patch('update/:id')
  async updateOrderItem(@Req() request: any, @Param('id') productId: string) {
    const userId = request.user.userId;
    // const orders = await this.ordersService.updateOrderItem(userId, productId);
  }
}
