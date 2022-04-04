import mongoose, { Model } from 'mongoose';
import { Address } from 'src/models/address.model';
import { AddAddressDto, UpdateAddressDto } from './dto';
export declare class AddressesService {
    private readonly addressModel;
    constructor(addressModel: Model<Address>);
    getAddresses(userId: string): Promise<(mongoose.Document<unknown, any, Address> & Address & {
        _id: mongoose.Types.ObjectId;
    })[]>;
    createAddress(address: AddAddressDto, userId: string): Promise<void>;
    updateAddress(address: UpdateAddressDto): Promise<import("mongodb").UpdateResult>;
    deleteAddress(id: string): Promise<mongoose.Document<unknown, any, Address> & Address & {
        _id: mongoose.Types.ObjectId;
    }>;
}
