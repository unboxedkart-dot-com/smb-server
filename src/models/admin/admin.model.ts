import mongoose from 'mongoose';

export const AdminSchema = new mongoose.Schema({
  phoneNumber: { type: Number, required: true },
  name: { type: String, required: true },
  createdTime: { type: Date, required: true, default: Date.now() },
  emailId: { type: String, required: false },
  gender: { type: String, required: false },
  lastLoggedIn: { type: Date, required: true, default: Date.now() },
});

export interface Admin {
  phoneNumber: Number;
  name: string;
  createdTime: Date;
  emailId: string;
  gender: string;
  lastLoggedIn: Date;
}
