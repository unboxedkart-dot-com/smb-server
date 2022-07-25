import mongoose from 'mongoose';

export const VendorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  idProofDoc: { type: String, },
  idProofNumber: { type: String},
  phoneNumber: { type: Number, required: true },
  alternatePhoneNumber: { type: Number },
  city: { type: String, required: true },
  idProofUrl: { type: String},
});

export interface VendorModel {
  name: string;
  idProofDoc: string;
  idProofNumber: string;
  phoneNumber: number;
  alternatePhoneNumber: number;
  city: string;
  idProofUrl: string;
}
