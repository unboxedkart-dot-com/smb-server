/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose" />
import { AddStoreLocationDto } from './dto/add-store-location.dto';
import { StoreLocationService } from './store-location.service';
export declare class StoreLocationController {
    private readonly storeLocationService;
    constructor(storeLocationService: StoreLocationService);
    handleAddStoreLocation(entireBody: AddStoreLocationDto, request: any): Promise<void>;
    handleGetStoreLocation(): Promise<(import("mongoose").Document<unknown, any, import("../models/store_location.model").StoreLocation> & import("../models/store_location.model").StoreLocation & {
        _id: import("mongoose").Types.ObjectId;
    })[]>;
}
