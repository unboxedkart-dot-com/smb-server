import mongoose from 'mongoose';

export const AddressSchema = new mongoose.Schema({
  userId: { type: String, required: true, select:false },
  name: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  alternatePhoneNumber: { type: String, required: false },
  doorNo: { type: String, required: true },
  street: { type: String, required: true },
  cityName: { type: String, required: true },
  stateName: { type: String, required: true },
  landmark: { type: String, required: true },
  addressType: { type: String, required: true },
});

export interface Address {
  // userId: string;
  name: string;
  phoneNumber: string;
  alternatePhoneNumber: string;
  doorNo: string;
  street: string;
  cityName: string;
  stateName: string;
  landmark: string;
  addressType: string;
}
