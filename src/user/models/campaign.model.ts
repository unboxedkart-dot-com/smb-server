import mongoose from 'mongoose';

export const CampaignSchema = new mongoose.Schema({
  timestamp: { type: String, required: true, default: Date.now().toString() },
  title: { type: String, required: true },
  description: { type: String, required: false },
  hasImage: { type: Boolean, requied: true },
  hasVideo: { type: Boolean, requied: true },
  hasLink: { type: Boolean, requied: true },
  imageUrl: { type: String, required: false },
  videoUrl: { type: String, required: false },
  linkUrl: { type: String, required: false },

  requiredViewsCount: { type: Number, required: true },
  campaignDateInString: { type: String, required: true },
  // campaignDate: { type: Date },
  campaignDate: {
    type: String,
    required: true,
    default: Date.now().toString(),
  },

  preferredGender: { type: String, required: false },
  preferredState: { type: String, required: false },
  preferredDistrict: { type: String, required: false },
  preferredCity: { type: String, required: false },
  preferredPincode: { type: Number, required: false },

  userId: { type: String, required: true },
  userDetails: {
    phoneNumber: { type: Number, required: true },
    name: { type: String, required: true },
    emailId: { type: String, required: true },
    companyName: { type: String, required: true },
    officePhoneNumber: { type: String, required: true },
    officeAddress: { type: String, required: true },
  },

  status: { type: String, default: 'Requested' },
});

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
  campaignDate: { type: Date };
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
  status: string;
}
