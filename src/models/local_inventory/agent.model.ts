import mongoose from 'mongoose';

export const AgentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  idProofDoc: { type: String },
  idProofNumber: { type: String },
  phoneNumber: { type: Number, required: true },
  alternatePhoneNumber: { type: Number },
  city: { type: String },
});

export interface AgentModel {
    name: string;
    idProofDoc: string;
    idProofNumber: string;
    phoneNumber: number;
    alternatePhoneNumber: number;
    city: string;
  }