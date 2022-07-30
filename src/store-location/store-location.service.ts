import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { StoreLocation } from 'src/models/store_location.model';

@Injectable()
export class StoreLocationService {
  constructor(
    @InjectModel('StoreLocation')
    private readonly storeLocationModel: Model<StoreLocation>,
  ) {}

  async getStoreLocations() {
    const locations = await this.storeLocationModel.find({});
    return locations;
  }


}
