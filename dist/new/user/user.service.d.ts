import { Model } from 'mongoose';
import { User } from 'src/models/user.model';
import { UserPaymentDetails } from 'src/models/user_payment_details.model';
import { UpdateUserDetailsDto } from './dto/update-user-details.dto';
import { UpdateUserPaymentDetailsDto } from './dto/update-user-payment-details.dto';
export declare class UserService {
    private readonly userModel;
    private readonly userPaymentDetailsModel;
    constructor(userModel: Model<User>, userPaymentDetailsModel: Model<UserPaymentDetails>);
    getUserDetails(userId: string): Promise<any>;
    getUserData(userId: string): Promise<{
        purchasedItemIds: any;
        answeredQuestionIds: any;
    }>;
    updateUserDetails(userId: string, entireBody: UpdateUserDetailsDto): Promise<void>;
    getPaymentDetails(userId: string): Promise<any>;
    updatePaymentDetails(userId: string, entireBody: UpdateUserPaymentDetailsDto): Promise<void>;
}
