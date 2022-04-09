import mongoose from 'mongoose';

export const AddressSchema = new mongoose.Schema({
  userId: { type: String, required: true, select: false },
  name: { type: String, required: true },
  phoneNumber: { type: Number, required: true },
  alternatePhoneNumber: { type: Number, required: false },
  doorNo: { type: String, required: true },
  lane: { type: String, required: false },
  street: { type: String, required: true },
  pinCode: { type: Number, required: true },
  cityName: { type: String, required: true },
  stateName: { type: String, required: true },
  landmark: { type: String, required: true },
  addressType: { type: String, required: true },
});

export interface Address {
  name: string;
  phoneNumber: number;
  alternatePhoneNumber: number;
  pinCode: number;
  doorNo: string;
  lane: string;
  street: string;
  cityName: string;
  stateName: string;
  landmark: string;
  addressType: string;
}
