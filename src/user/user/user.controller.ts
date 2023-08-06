import { Body, Controller, Get, Patch, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-strategies/jwt-auth.guard';
import { UpdateUserDetailsDto } from './dto/update-user-details.dto';
import { UpdateUserPaymentDetailsDto } from './dto/update-user-payment-details.dto';
import { UserService } from './user.service';

@UseGuards(JwtAuthGuard)
@Controller('user/user-details')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async handleGetUserDetails(@Req() request: any) {
    const userId = request.user.userId;
    const response = await this.userService.getUserDetails(userId);
    return response;
  }

  @Patch('/update')
  async handleUpdateUserDetails(
    @Req() request: any,
    @Body() entireBody: UpdateUserDetailsDto,
  ) {
    const userId = request.user.userId;
    const response = await this.userService.updateUserDetails(
      userId,
      entireBody,
    );
    return response;
  }

  @Get('/user-data')
  async handleGetUserData(@Req() request: any) {
    const userId = request.user.userId;
    const response = await this.userService.getUserData(userId);
    return response;
  }

  @Patch('/payment-details')
  async handleUpdatePaymentDetails(
    @Req() request: any,
    @Body() entireBody: UpdateUserPaymentDetailsDto,
  ) {
    console.log('updating payment details');
    const userId = request.user.userId;
    const response = await this.userService.updatePaymentDetails(
      userId,
      entireBody,
    );
    return response;
  }

  @Get('/payment-details')
  async handleGetPaymentDetails(@Req() request: any) {
    const userId = request.user.userId;
    const response = await this.userService.getPaymentDetails(userId);
    console.log('payment details', response);
    return response;
  }
}
