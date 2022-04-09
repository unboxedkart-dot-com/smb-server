import mongoose, { Model } from 'mongoose';
import { Address } from 'src/models/address.model';
import { AddAddressDto, UpdateAddressDto } from './dto';
export declare class AddressesService {
    private readonly addressModel;
    constructor(addressModel: Model<Address>);
    getAddresses(userId: string): Promise<Address[]>;
    createAddress(address: AddAddressDto, userId: string): Promise<void>;
    updateAddress(userId: string, address: UpdateAddressDto): Promise<mongoose.Document<unknown, any, Address> & Address & {
        _id: mongoose.Types.ObjectId;
    }>;
    deleteAddress(id: string): Promise<mongoose.Document<unknown, any, Address> & Address & {
        _id: mongoose.Types.ObjectId;
    }>;
}
