/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/error" />
import { Model } from 'mongoose';
import { User } from 'src/models/user.model';
import { UpdateUserDetailsDto } from './dto/update-user-details.dto';
export declare class UserService {
    private readonly userModel;
    constructor(userModel: Model<User>);
    getUserDetails(userId: string): Promise<import("mongoose").Document<unknown, any, User> & User & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    updateUserDetails(userId: string, entireBody: UpdateUserDetailsDto): Promise<void>;
}
