import { UpdateUserDetailsDto } from './dto/update-user-details.dto';
import { UpdateUserPaymentDetailsDto } from './dto/update-user-payment-details.dto';
import { UserService } from './user.service';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    handleGetUserDetails(request: any): Promise<any>;
    handleUpdateUserDetails(request: any, entireBody: UpdateUserDetailsDto): Promise<void>;
    handleGetUserData(request: any): Promise<{
        purchasedItemIds: any;
        answeredQuestionIds: any;
    }>;
    handleUpdatePaymentDetails(request: any, entireBody: UpdateUserPaymentDetailsDto): Promise<void>;
    handleGetPaymentDetails(request: any): Promise<any>;
}
