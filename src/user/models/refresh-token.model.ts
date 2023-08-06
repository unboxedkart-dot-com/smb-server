import mongoose from 'mongoose';

export const RefreshTokenSchema = new mongoose.Schema({
  token: { type: String, required: true },
  isActive: { type: Boolean, required: true, default : true },
  userId: { type: String, required: true },
});

export interface RefreshTokenModel {
  token: string;
  isActive: boolean;
  userId: string;
}
