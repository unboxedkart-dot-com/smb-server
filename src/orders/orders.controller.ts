import {
  Controller, forwardRef,
  Get,
  Inject, Post,
  Query,
  Req,
  UnauthorizedException, UseGuards
} from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { JwtAuthGuard } from 'src/auth/jwt-strategies/jwt-auth.guard';
import { S3Service } from 'src/s3/s3.service';
import { OrdersService } from './orders.service';

@UseGuards(JwtAuthGuard)
@Controller('orders')
export class OrdersController {
  constructor(
    private readonly ordersService: OrdersService,
    // private readonly authService: AuthService,
    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService,
    @Inject(forwardRef(() => S3Service))
    private readonly s3Service: S3Service,
  ) {}

  @Get('/all-orders')
  async handleGetAllOrders(
    @Req() request: any,
    @Query('status') status: string,
  ) {
    const userId = request.user.userId;
    const isAdmin = await this.authService.CheckIfAdmin(userId);
    if (isAdmin) {
      const response = await this.ordersService.getAllOrders(status);
      return response;
    } else {
      console.log('throwing a new error');
      throw new UnauthorizedException();
    }
  }

  @Get('/referrals')
  async handleGetReferrals(@Req() request: any) {
    const userId = request.user.userId;
    const referrals = await this.ordersService.getReferrals(userId);
    return referrals;
  }

  @Post('create')
  async handleCreateOrder(@Req() request: any) {
    const userId = request.user.userId;
    const orderNumber = this._generateOrderNumber();
    return await this.ordersService.createOrder(userId);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async handleGetOrdersItems(@Req() request: any) {
    const userId = request.user.userId;
    const orders = await this.ordersService.getOrderItems(userId);
    return orders;
  }

  @UseGuards(JwtAuthGuard)
  @Get('/order')
  async handleGetOrder(@Query('id') id: string, @Req() request: any) {
    const userId = request.user.userId;
    const order = await this.ordersService.getOrder(userId, id);
    console.log('order is', order);
    return order;
  }

  @Get('/order-item')
  async handleGetOrderItem(@Req() request: any, @Query('id') orderId: string) {
    console.log('getting single order item', orderId);
    const userId = request.user.userId;
    const order = await this.ordersService.getOrderItem(userId, orderId);
    return order;
  }



  @Get()
  async handleSendInvoiceCopy(
    @Req() request: any,
    @Query('id') orderId: string,
  ) {
    const userId: string = request.user.userId;
    await this.ordersService.sendInvoiceCopy(userId, orderId);
  }

  _generateOrderNumber() {
    const orderCode = 'OD';
    const randomNumber = Math.floor(
      10000000000000 + Math.random() * 90000000000000,
    );
    const orderNumber = orderCode + randomNumber.toString();
    return orderNumber;
  }
}
