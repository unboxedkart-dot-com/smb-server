import mongoose from 'mongoose';

export const PaymentSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  orderNumber: { type: String, required: true },
  gateway: { type: String, required: true },
  status: { type: String, required: true },
  orderDate: { type: String, required: true, default: Date.now() },
  paymentOrderId: { type: String, required: true },
  paymentId: { type: String, required: true },
  paymentMethod: { type: String, required: true },
  paymentType: { type: String, required: true },
  amount: { type: Number, required: true },
  paymentTimeStamp: { type: Date, required: true, default: Date.now() },
});

export interface Payment {
  userId: string;
  orderNumber: string;
  gateway: string;
  status: string;
  orderDate: string;
  paymentOrderId : string;
  paymentId: string;
  paymentType: string;
  paymentMethod: string;
  amount: number;
  paymentTimeStamp: Date;
}
