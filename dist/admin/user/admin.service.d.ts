import { Model } from 'mongoose';
import { User } from 'src/models/user.model';
export declare class AdminService {
    private readonly userModel;
    constructor(userModel: Model<User>);
}
