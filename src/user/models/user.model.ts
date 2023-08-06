import mongoose from 'mongoose';

export enum userRoles {
  USER = 'USER',
  SELLER = 'SELLER',
  ADMIN = 'ADMIN',
}

export const UserSchema = new mongoose.Schema({
  createdTime: { type: String, required: true, default: Date.now().toString() },
  phoneNumber: { type: Number, required: true },
  userRole: {
    type: String,
    required: false,
    select: false,
    default: 'user',
  },
  representativeName: { type: String, required: true },
  designation: { type: String, required: true },
  emailId: { type: String, required: true },
  companyName: { type: String, required: true },
  category: { type: String, required: true },
  profilePicUrl: { type: String, required: false },
  officeAddress: { type: String, required: false },
  officeMobileNumber: { type: Number, required: true },
  isDeactivated: { type: Boolean, default: false },
  isDeleted: { type: Boolean, default: false },
});

export interface User {
  createdTime: string;
  phoneNumber: number;
  userRole: string;
  representativeName: string;
  designation: string;
  emailId: string;
  companyName: string;
  officeAddress: string;
  category: string;
  profilePicUrl: string;
  officeMobileNumber: number;
  isDeactivated: boolean;
  isDeleted: boolean;
}
