import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { userInfo } from 'os';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Address } from 'src/models/address.model';
import { AddressesService } from './addresses.service';
import { AddAddressDto, UpdateAddressDto } from './dto';

@UseGuards(JwtAuthGuard)
@Controller('addresses')
export class AddressesController {
  constructor(private readonly addressesService: AddressesService) {}

  @Get()
  async handleGetAddress(@Req() request: any) {
    const userId = request.user.userId;
    const addresses = await this.addressesService.getAddresses(userId);
    return addresses as Address[];
  }

  @Post()
  async handleCreateAddress(
    @Body() entireBody: AddAddressDto,
    @Req() request: any,
  ) {
    const userId = request.user.userId;
    const result = await this.addressesService.createAddress(
      entireBody,
      userId,
    );
    return result;
  }

  @Patch()
  async handleUpdateAddress(@Body() entireBody: UpdateAddressDto) {
    const result = await this.addressesService.updateAddress(entireBody);
    return result;
  }

  @Delete()
  async handleDeleteAddress(@Body('id') id: string) {
    const result = await this.addressesService.deleteAddress(id);
    return result;
  }
}
