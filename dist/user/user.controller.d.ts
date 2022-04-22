/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose" />
import { UpdateUserDetailsDto } from './dto/update-user-details.dto';
import { UserService } from './user.service';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    handleGetUserDetails(request: any): Promise<import("mongoose").Document<unknown, any, import("../models/user.model").User> & import("../models/user.model").User & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    handleUpdateUserDetails(request: any, entireBody: UpdateUserDetailsDto): Promise<void>;
    handleGetUserData(request: any): Promise<{
        purchasedItemIds: string[];
        answeredQuestionIds: string[];
    }>;
}
