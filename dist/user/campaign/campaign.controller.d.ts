/// <reference types="multer" />
import { S3Service } from 'src/s3/s3.service';
import { CampaignService } from './campaign.service';
import { NewCampaignDto } from './dto/new-campaign.dto';
export declare class CampaignController {
    private readonly campaignService;
    private readonly s3Service;
    constructor(campaignService: CampaignService, s3Service: S3Service);
    handleUploadInvoice(file: Express.Multer.File, request: any, Body: any): Promise<void>;
    handleUploadVideo(file: Express.Multer.File, request: any, Body: any): Promise<void>;
    handleGetPayableAmount(request: any, amount: string): Promise<{
        payableAmount: number;
        paymentOrderId: any;
    }>;
    handleGetUserData(request: any, entireBody: NewCampaignDto): Promise<void>;
}
