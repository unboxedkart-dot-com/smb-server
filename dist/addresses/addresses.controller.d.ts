/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose" />
import { Address } from 'src/models/address.model';
import { AddressesService } from './addresses.service';
import { AddAddressDto, UpdateAddressDto } from './dto';
export declare class AddressesController {
    private readonly addressesService;
    constructor(addressesService: AddressesService);
    handleGetAddress(request: any): Promise<Address[]>;
    handleCreateAddress(entireBody: AddAddressDto, request: any): Promise<void>;
    handleUpdateAddress(entireBody: UpdateAddressDto): Promise<import("mongodb").UpdateResult>;
    handleDeleteAddress(id: string): Promise<import("mongoose").Document<unknown, any, Address> & Address & {
        _id: import("mongoose").Types.ObjectId;
    }>;
}
