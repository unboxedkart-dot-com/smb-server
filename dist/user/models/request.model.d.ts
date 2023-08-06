import mongoose from 'mongoose';
export declare const NewRequestSchema: mongoose.Schema<any, mongoose.Model<any, any, any, any>, any, any>;
export interface Campaign {
    timestamp: string;
    title: string;
    description: string;
    hasImage: boolean;
    hasVideo: boolean;
    hasLink: boolean;
    imageUrl: string;
    videoUrl: string;
    linkUrl: string;
    requiredViewsCount: number;
    campaignDateInString: string;
    campaignDate: {
        type: Date;
    };
    preferredGender: string;
    preferredState: string;
    preferredDistrict: string;
    preferredCity: string;
    preferredPincode: number;
    userId: string;
    userDetails: {
        phoneNumber: number;
        name: string;
        emailId: string;
        companyName: string;
        officePhoneNumber: string;
        officeAddress: string;
    };
}
