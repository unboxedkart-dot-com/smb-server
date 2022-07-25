import mongoose from 'mongoose';
export declare const AgentSchema: mongoose.Schema<any, mongoose.Model<any, any, any, any>, any, any>;
export interface AgentModel {
    name: string;
    idProofDoc: string;
    idProofNumber: string;
    phoneNumber: number;
    alternatePhoneNumber: number;
    city: string;
}
