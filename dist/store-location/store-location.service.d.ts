/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/error" />
import { Model } from 'mongoose';
import { StoreLocation } from 'src/models/store_location.model';
export declare class StoreLocationService {
    private readonly storeLocationModel;
    constructor(storeLocationModel: Model<StoreLocation>);
    getStoreLocations(): Promise<(import("mongoose").Document<unknown, any, StoreLocation> & StoreLocation & {
        _id: import("mongoose").Types.ObjectId;
    })[]>;
}
