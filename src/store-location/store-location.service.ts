import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { StoreLocation } from 'src/models/store_location.model';
import { AddStoreLocationDto } from './dto/add-store-location.dto';

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

  async addStoreLocation(userId: string, entireBody: AddStoreLocationDto) {
    const newLocation = new this.storeLocationModel({
      storeName: entireBody.storeName,
      streetName: entireBody.streetName,
      cityName: entireBody.cityName,
      pinCode: entireBody.pinCode,
      directionsUrl: entireBody.directionsUrl,
      storeTimings: entireBody.storeTimings,
      storeOpenDays: entireBody.storeOpenDays,
      contactNumber: entireBody.contactNumber,
      alternateContactNumber: entireBody.alternateContactNumber,
    });
    newLocation.save();
  }
}
