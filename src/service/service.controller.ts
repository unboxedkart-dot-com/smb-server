import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
  Req,
} from '@nestjs/common';
import { ServiceService } from './service.service';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { JwtAuthGuard } from 'src/auth/jwt-strategies/jwt-auth.guard';

@Controller('service')
export class ServiceController {
  constructor(private readonly serviceService: ServiceService) {}

  @Get('diagnosis-fee')
  async getDiagnosisFee(@Query('categoryCode') categoryCode: string) {
    const fee = this.serviceService.diagnosisFee(categoryCode);
    return fee;
  }

  @UseGuards(JwtAuthGuard)
  @Post('create-service')
  async createServiceRequest(
    @Req() request: any,
    @Body() entireBody: CreateServiceDto,
  ) {
    const userId = request.user.userId;
    const orderNumber = await this.serviceService.createServiceRequest(userId, entireBody);
    return {"orderNumber":orderNumber};
  }

  @UseGuards(JwtAuthGuard)
  @Get('/orders')
  async getOrders(@Req() request: any) {
    const userId = request.user.userId;
    const orders = this.serviceService.orders(userId);
    return orders;
  }

  @UseGuards(JwtAuthGuard)
  @Get('/notifications')
  async getNotifications(@Req() request: any) {
    const userId = request.user.userId;
    const orders = this.serviceService.notifications(userId);
    return orders;
  }

  @Get('faqs')
  async getFaqs() {
    const faqs = this.serviceService.faqs();
    return faqs;
  }
}
