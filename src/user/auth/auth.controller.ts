import {
  Body,
  Controller,
  Get,
  Patch,
  Post,
  Query,
  Req,
  UseGuards
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { SignUpDto } from './dto/sign-up.dto';
import { JwtAuthGuard } from './jwt-strategies/jwt-auth.guard';
import { JwtRefreshAuthGuard } from './jwt-strategies/jwt-refresh-auth.guard';

@Controller('user/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // @Post('send-mail')
  // async sendMail(){
  //   const result = this.authService.sendMail();
  //   return result;
  // }
  

  @Post('/hello')
  async handleHello() {
    await this.authService.setStatus();
  }

  @UseGuards(JwtAuthGuard)
  @Patch('/deactivate')
  async handleDeactivateAccount(@Req() request: any) {
    console.log('trying to deactibated account');
    const userId = request.user.userId;
    return this.authService.deactivateAccount(userId);
  }
  @UseGuards(JwtAuthGuard)
  @Patch('/delete')
  async handleDeleteAccount(@Req() request: any) {
    const userId = request.user.userId;
    return this.authService.deleteAccount(userId);
  }

  // @UseGuards(JwtAuthGuard)
  // @Get()
  // async handlePrintHello(@Req() request: any) {
  //   console.log('request', request.user.userId);
  //   return request.user.userId;
  // }

  @Get('send-otp')
  async handleSendOtp(@Query('phoneNumber') phoneNumber: string) {
    // console.log('q', phoneNumber);
    const result = this.authService.sendOtp(parseInt(phoneNumber));
    return result;
  }

  @Get('resend-otp')
  async handleResendOtp(
    @Query('phoneNumber') phoneNumber: string,
    @Query('type') type: string,
  ) {
    const result = this.authService.resendOtp(
      parseInt(phoneNumber),
      parseInt(type),
    );
    return result;
  }

  @Get('validate-otp')
  async handleValidate(
    @Query('phoneNumber') phoneNumber: string,
    @Query('otp') otp: string,
  ) {
    const result = this.authService.validateOtp(
      parseInt(phoneNumber),
      parseInt(otp),
    );
    return result;
  }

  @Post('login')
  handleLoginUser(@Body() entireBody: LoginDto) {
    const result = this.authService.loginUser(entireBody);
    return result;
  }

  @Post('signup')
  handleSignupUser(@Body() entireBody: SignUpDto) {
    const result = this.authService.createUser(entireBody);
    return result;
  }

  @UseGuards(JwtRefreshAuthGuard)
  @Patch('new-access-token')
  handleGetNewAccessToken(
    @Query('refreshToken') refreshToken: string,
    @Req() request: any,
  ) {
    const userId = request.user.userId;
    return this.authService.newAccessToken(userId, refreshToken);
  }
}
