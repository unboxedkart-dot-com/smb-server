import mongoose from 'mongoose';

export enum OrderStatuses {
  ORDERED = 'ORDERED',
  ACCEPTED = 'ACCEPTED',
  SHIPPED = 'SHIPPED',
  OUT_FOR_DELIVERY = 'OUT FOR DELIVERY',
  DELIVERED = 'DELIVERED',
}

export enum paymentTypes {
  PAY_AT_STORE = 'PAY AT STORE',
  CASH_ON_DELIVERY = 'CASH ON DELIVERY',
  PREPAID = 'PREPAID',
}

export enum DeliveryTypes {
  STORE_PICKUP = 'STORE PICKUP',
  HOME_DELIVERY = 'HOME DELIVERY',
}

export const OrderSchema = new mongoose.Schema({
  paymentDetails: {
    paymentType: { type: String, required: true },
    paymentDate: { type: String, required: false },
    paymentId: { type: String, required: false },
    isPaid: { type: Boolean, required: true, default: false },
    billTotal: { type: Number, required: true },
    couponCode: { type: String, required: false },
    couponDiscount: { type: Number, required: false },
    payableTotal: { type: Number, required: true },
  },
  orderNumber: { type: String, required: true },
  orderDate: { type: String, required: true, default: Date.now() },
  updatedDate: { type: String, required: false },
  userId: { type: String, required: true },
  orderStatus: {
    type: String,
    required: true,
    default: OrderStatuses.ORDERED,
  },
  itemsCount: { type: Number, required: true },
  orderItems: [
    {
      productId: { type: String, required: true },
      pricePerItem: { type: Number, required: true },
      productCount: { type: Number, required: true },
      total: { type: Number, required: true },
      productDetails: {
        imageUrl: { type: String, required: true },
        title: { type: String, required: true },
        color: { type: String, required: false },
        condition: { type: String, required: true },
        brand: { type: String, required: true },
        category: { type: String, required: true },
      },
    },
  ],
  // reviewDetails: {
  //   isReviewed: { type: Boolean, required: true, default: false },
  //   rating: { type: Number, required: false },
  //   reviewTitle: { type: String, required: false },
  //   reviewContent: { type: String, required: false },
  // },
});

export interface Order {
  userId: string;
  orderNumber: string;
  orderDate: Date;
  updatedDate: Date;
  paymentDetails: {
    paymentDate: string;
    paymentId: string;
    isPaid: boolean;
    billTotal: string;
    payableTotal: string;
  };

  orderStatus: string;
  orderItems: [
    {
      productId: string;
      pricePerItem: number;
      productCount: number;
      total: number;
      productDetails: {
        imageUrl: string;
        title: string;
        color: string;
        condition: string;
        brand: string;
        category: string;
      };
    },
  ];
}







// orderId: { type: String, required: true, default },
// timestamp: { type: String, required: true, default : Date.now() },

// shippingDetails: {
//   shipDate: { type: String, required: false },
//   deliveryDate: { type: String, required: false },
//   deliveryAddress: { type: Map, required: false },
//   isDelivered: { type: String, required: true },
// },

// shippingDetails: {
//   deliveryDate: Date;
//   deliveryAddress: Map<any, any>;
//   isDelivered: string;
//   shipDate: Date;
// };
