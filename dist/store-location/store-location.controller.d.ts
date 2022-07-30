/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose" />
import { StoreLocationService } from './store-location.service';
export declare class StoreLocationController {
    private readonly storeLocationService;
    constructor(storeLocationService: StoreLocationService);
    handleGetStoreLocation(): Promise<(import("mongoose").Document<unknown, any, import("../models/store_location.model").StoreLocation> & import("../models/store_location.model").StoreLocation & {
        _id: import("mongoose").Types.ObjectId;
    })[]>;
}
