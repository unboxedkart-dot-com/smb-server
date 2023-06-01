import {
  Body,
  Controller,
  forwardRef,
  Get,
  Inject,
  Post,
  Query,
  Req,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { JwtAuthGuard } from 'src/auth/jwt-strategies/jwt-auth.guard';
import { S3Service } from 'src/s3/s3.service';
import { CreateEnquiryDto } from './dto/create-enquiry.dto';
import { CreateTokenDto } from './dto/create-token.dto';
import { StoreTokenService } from './store-token.service';

@Controller('store-app')
export class StoreTokenController {
  constructor(
    private readonly storeTokenService: StoreTokenService,
  ) // @Inject(forwardRef(() => AuthService))
  // private readonly authService: AuthService,
  {}

  @UseGuards(JwtAuthGuard)
  @Post('/create')
  async handleCreateToken(
    @Req() request: any,
    @Body() entireBody: CreateTokenDto,
  ) {
    const userId = request.user.userId;
    return await this.storeTokenService.handleCreateToken(userId, entireBody);
  }

  // @UseGuards(JwtAuthGuard)
  @Get('/get-tokens')
  async handleGetTokens(
    @Query('startDate') startDate: string,
    @Query('endDate') endDate: string,
  ) {
    return await this.storeTokenService.handleGetTokens(startDate, endDate);
  }



  @UseGuards(JwtAuthGuard)
  @Post('/create-enquiry')
  async handleCreateEnquiry(
    @Req() request: any,
    @Body() entireBody: CreateEnquiryDto,
  ) {
    const userId = request.user.userId;
    return await this.storeTokenService.handleCreateEnquiry(userId, entireBody);
  }

  @Get('/get-enquiries')
  async handleGetEnquiries(
    @Query('startDate') startDate: string,
    @Query('endDate') endDate: string,
  ) {
    return await this.storeTokenService.handleGetTokens(startDate, endDate);
  }



}
