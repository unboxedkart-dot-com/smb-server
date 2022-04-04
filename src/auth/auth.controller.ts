import { HttpService } from '@nestjs/axios';
import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { User } from 'src/models/user.model';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async handlePrintHello(@Req() request : any) {
    console.log('request', request.user.userId);
    return request.user.userId;
  }

  @Post('send-otp')
  async handleSendOtp(@Body('phoneNumber') phoneNumber: number) {
    const result = this.authService.sendOtp(phoneNumber);
    return result;
  }

  @Post('validate-otp')
  async handleValidate(
    @Body('phoneNumber') phoneNumber: number,
    @Body('otp') otp: number,
  ) {
    const result = this.authService.validateOtp(phoneNumber, otp);
    return result;
  }

  @Post('login')
  handleLoginUser(
    @Body('phoneNumber') phoneNumber: number,
    @Body('otp') otp: number,
  ) {
    const result = this.authService.loginUser(phoneNumber, otp);
    
    return result;
  }

  @Post('signup')
  handleSignupUser(@Body() user: User) {
    const result = this.authService.createUser(user);
    return result;
  }
}
