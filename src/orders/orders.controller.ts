import {
  Body,
  Controller,
  Delete,
  forwardRef,
  Get,
  Inject,
  Param,
  Patch,
  Post,
  Query,
  Req,
  UnauthorizedException,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { stringMap } from 'aws-sdk/clients/backup';
import { AuthService } from 'src/auth/auth.service';
import { JwtAuthGuard } from 'src/auth/jwt-strategies/jwt-auth.guard';
import { S3Service } from 'src/s3/s3.service';
import { CancelOrderDto } from './dto/cancel-order.dto';
import { CreateOrderDto } from './dto/create-order.dto';
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
    console.log('accepting order');
    const userId = request.user.userId;
    const isAdmin = await this.authService.CheckIfAdmin(userId);
    if (isAdmin) {
      const response = await this.ordersService.acceptOrder(
        userId,
        orderItemId,
      );
      return response;
    } else {
      console.log('throwing a new error');
      throw new UnauthorizedException();
    }
  }

  @Patch('ready-for-pickup/:id')
  async handleSetOrderReadyForPickup(
    @Req() request: any,
    @Param('id') orderItemId: string,
  ) {
    const userId = request.user.userId;
    const isAdmin = await this.authService.CheckIfAdmin(userId);
    if (isAdmin) {
      const response = await this.ordersService.orderReadyForPickUp(
        userId,
        orderItemId,
      );
    } else {
      throw new UnauthorizedException();
    }
  }

  @Patch('delivered/:id')
  async handleSerOrderDelivered(
    @Req() request: any,
    @Param('id') orderItemId: string,
  ) {
    const userId = request.user.userId;
    const isAdmin = await this.authService.CheckIfAdmin(userId);
    if (isAdmin) {
      const response = await this.ordersService.orderDelivered(
        userId,
        orderItemId,
      );
    } else {
      throw new UnauthorizedException();
    }
  }

  @Patch('shipped/:id')
  async handleSetOrderShipped(
    @Req() request: any,
    @Param('id') orderItemId: string,
  ) {
    const userId = request.user.userId;
    const isAdmin = await this.authService.CheckIfAdmin(userId);
    if (isAdmin) {
      const response = await this.ordersService.orderShipped(
        userId,
        orderItemId,
      );
      return response;
    } else {
      throw new UnauthorizedException();
    }
  }

  @Patch('out-for-delivery/:id')
  async handleSetOrderOutForDelivery(
    @Req() request: any,
    @Param('id') orderItemId: string,
  ) {
    const userId = request.user.userId;
    const isAdmin = await this.authService.CheckIfAdmin(userId);
    if (isAdmin) {
      const response = await this.ordersService.orderOutForDelivery(
        userId,
        orderItemId,
      );
      return response;
    } else {
      throw new UnauthorizedException();
    }
  }

  @Get('/sales-overview')
  async handleGetSalesOverview(
    @Req() request: any,
    @Query('start-date') startDate: any,
  ) {
    console.log('starting sales');
    console.log('given date', startDate);
    const userId = request.user.userId;
    const isAdmin = await this.authService.CheckIfAdmin(userId);
    if (isAdmin) {
      const response = await this.ordersService.getSalesOverview(startDate);
      return response;
    } else {
      throw new UnauthorizedException();
    }
  }

  @Patch('/cancel-order')
  async handleCancelOrder(
    @Req() request: any,
    @Body() entireBody: CancelOrderDto,
  ) {
    const userId: string = request.user.userId;
    const response = await this.ordersService.cancelOrder(userId, entireBody);
    return response;
  }

  // @Post('dummy-push')
  // async handleSendPushNotification() {
  //   console.log('dummt push started');
  //   const response = this.ordersService.handleOrderConfirmationNotification();
  // }

  //admin code
  @Post('/upload-invoice')
  @UseInterceptors(FileInterceptor('file'))
  async handleUploadInvoice(
    @UploadedFile() file: Express.Multer.File,
    @Req() request: any,
    @Body() Body: any,
  ) {
    console.log('uploading invoice', file, typeof file);
    // const response = this.ordersService.uploadInvoice(file);
    const response = this.s3Service.uploadFile(file);
    return response;
    // const userId: string = request.user.userId;
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
