import { Body, Controller, Get, Patch, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-strategies/jwt-auth.guard';
import { UpdateUserDetailsDto } from './dto/update-user-details.dto';
import { UserService } from './user.service';

@UseGuards(JwtAuthGuard)
@Controller('user-details')
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
}
