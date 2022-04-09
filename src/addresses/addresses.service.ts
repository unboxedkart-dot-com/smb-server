import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { Address } from 'src/models/address.model';
import {
  AddAddressDto,
  UpdateAddressDto,
  Address as AddressClass,
} from './dto';

@Injectable()
export class AddressesService {
  constructor(
    @InjectModel('Address') private readonly addressModel: Model<Address>,
  ) {}

  async getAddresses(userId: string) {
    const addresses = await this.addressModel
      .find({ userId: { $eq: userId } })
      .exec();
    return addresses as Address[];
  }

  async createAddress(address: AddAddressDto, userId: string) {
    const newAddress = new this.addressModel({ userId: userId, ...address });
    await newAddress.save();
  }

  async updateAddress(userId: string, address: UpdateAddressDto) {
    console.log('address data', address);
    const result = await this.addressModel.findByIdAndUpdate(
      address.addressId,
      { userId: userId, ...address },
    );
    console.log('result new', result);
    return result;
  }

  async deleteAddress(id: string) {
    if (mongoose.isValidObjectId(id)) {
      const result = await this.addressModel.findByIdAndDelete(id);
      return result;
    } else {
      throw new NotFoundException('could not find address');
    }
  }
}
