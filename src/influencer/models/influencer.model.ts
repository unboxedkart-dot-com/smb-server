import mongoose from 'mongoose';

export const InfluencerSchema = new mongoose.Schema({
  createdTime: { type: String, required: true, default: Date.now().toString() },
  phoneNumber: { type: Number, required: true },
  userRole: {
    type: String,
    required: false,
    select: false,
    default: 'influencer',
  },
  name: { type: String, required: true },
  emailId: { type: String, required: true },
  contactsCount: { type: Number, required: false },
  profilePicUrl: { type: String, required: false },
  state: { type: String, required: false },
  district: { type: String, required: false },
  city: { type: String, required: false },
  pinCode: { type: Number, required: false },
  isDeactivated: { type: Boolean, default: false },
  isDeleted: { type: Boolean, default: false },
});

export interface Influencer {
  phoneNumber: number;
  name: string;
  emailId: string;
  contactsCount: number;
  profilePicUrl: string;
  state: string;
  district: string;
  city: string;
  pinCode: number;
  isDeactivated: boolean;
  isDeleted: boolean;
}
