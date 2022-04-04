import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { AddStoreLocationDto } from './dto/add-store-location.dto';
import { StoreLocationService } from './store-location.service';

@Controller('store-location')
export class StoreLocationController {
  constructor(private readonly storeLocationService: StoreLocationService) {}

  @UseGuards(JwtAuthGuard)
  @Post('/add')
  async handleAddStoreLocation(@Body() entireBody: AddStoreLocationDto, @Req() request : any) {
    const userId = request.user.userId;
    await this.storeLocationService.addStoreLocation(userId, entireBody);
  }

  @Get()
  async handleGetStoreLocation() {
    const locations = await this.storeLocationService.getStoreLocations();
    return locations;
  }
}
