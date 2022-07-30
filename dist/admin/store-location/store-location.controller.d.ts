import { AddStoreLocationDto } from './dto/add-store-location.dto';
import { StoreLocationService } from './store-location.service';
export declare class StoreLocationController {
    private readonly storeLocationService;
    constructor(storeLocationService: StoreLocationService);
    handleAddStoreLocation(entireBody: AddStoreLocationDto, request: any): Promise<void>;
}
