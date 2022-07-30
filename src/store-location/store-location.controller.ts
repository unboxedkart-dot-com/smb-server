import { Controller, Get } from '@nestjs/common';
import { StoreLocationService } from './store-location.service';

@Controller('store-location')
export class StoreLocationController {
  constructor(private readonly storeLocationService: StoreLocationService) {}

  @Get()
  async handleGetStoreLocation() {
    const locations = await this.storeLocationService.getStoreLocations();
    return locations;
  }
}
