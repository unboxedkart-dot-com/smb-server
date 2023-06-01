import { Model } from 'mongoose';
import { StoreNotificationModel } from 'src/models/store-app/store-notification.model';
import { StoreToken } from 'src/models/store-app/token.model';
import { User } from 'src/models/user.model';
import { CreateTokenDto } from './dto/create-token.dto';
export declare class StoreTokenService {
    private readonly userModel;
    private readonly storeTokenModel;
    private readonly storeNotificationModel;
    constructor(userModel: Model<User>, storeTokenModel: Model<StoreToken>, storeNotificationModel: Model<StoreNotificationModel>);
    getAllOrders(status: string): Promise<void>;
    handleCreateToken(userId: string, body: CreateTokenDto): Promise<string>;
}
