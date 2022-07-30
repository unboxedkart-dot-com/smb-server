import { Model } from 'mongoose';
import { StoreLocation } from 'src/models/store_location.model';
import { AddStoreLocationDto } from './dto/add-store-location.dto';
export declare class StoreLocationService {
    private readonly storeLocationModel;
    constructor(storeLocationModel: Model<StoreLocation>);
    addStoreLocation(userId: string, entireBody: AddStoreLocationDto): Promise<void>;
}
