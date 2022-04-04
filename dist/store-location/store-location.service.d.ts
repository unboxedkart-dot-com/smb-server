/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/error" />
import { Model } from 'mongoose';
import { StoreLocation } from 'src/models/store_location.model';
import { AddStoreLocationDto } from './dto/add-store-location.dto';
export declare class StoreLocationService {
    private readonly storeLocationModel;
    constructor(storeLocationModel: Model<StoreLocation>);
    getStoreLocations(): Promise<(import("mongoose").Document<unknown, any, StoreLocation> & StoreLocation & {
        _id: import("mongoose").Types.ObjectId;
    })[]>;
    addStoreLocation(userId: string, entireBody: AddStoreLocationDto): Promise<void>;
}
