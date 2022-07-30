/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/error" />
import { Model } from 'mongoose';
import { SellerModel } from 'src/models/admin/seller.model';
import { NotificationsService } from '../notifications/notifications.service';
import { AddSellerDto } from './dto/add-seller.dto';
export declare class SellerService {
    private readonly sellerModel;
    private readonly notificationService;
    constructor(sellerModel: Model<SellerModel>, notificationService: NotificationsService);
    getSellers(): Promise<(import("mongoose").Document<unknown, any, SellerModel> & SellerModel & {
        _id: import("mongoose").Types.ObjectId;
    })[]>;
    addSeller(entireBody: AddSellerDto): Promise<void>;
}
