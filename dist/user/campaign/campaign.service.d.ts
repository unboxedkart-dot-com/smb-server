import { Campaign } from 'aws-sdk/clients/personalize';
import { Model } from 'mongoose';
import { User } from 'src/user/models/user.model';
import { NewCampaignDto } from './dto/new-campaign.dto';
export declare class CampaignService {
    private readonly userModel;
    private readonly campaignModel;
    constructor(userModel: Model<User>, campaignModel: Model<Campaign>);
    _generateOrderNumber(): string;
    createPaymentOrder(payableAmount: number, orderNumber: string): Promise<void>;
    getPayableAmount(userId: string, amount: string): Promise<{
        payableAmount: number;
        paymentOrderId: any;
    }>;
    addNewCampaign(userId: string, entireBody: NewCampaignDto): Promise<void>;
}
