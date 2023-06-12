import mongoose from 'mongoose';

export enum OrderStatuses {
  PREORDERD = 'PRE ORDERED',
  ORDERED = 'ORDERED',
  ACCEPTED = 'ACCEPTED',
  SHIPPED = 'SHIPPED',
  READY_FOR_PICKUP = 'READY FOR PICKUP',
  OUT_FOR_DELIVERY = 'OUT FOR DELIVERY',
  DELIVERED = 'DELIVERED',
  CANCELLED = 'CANCELLED',
}

export enum PaymentTypes {
  FULL = 'FULL',
  PARTIAL = 'PARTIAL',
  NULL = 'NULL',
  // PAY_AT_STORE = 'PAY AT STORE',
  // CASH_ON_DELIVERY = 'CASH ON DELIVERY',
  // PREPAID = 'PREPAID',
}

export enum DeliveryTypes {
  STORE_PICKUP = 'STORE PICKUP',
  HOME_DELIVERY = 'HOME DELIVERY',
}

export enum PaymentMethods {
  PAY_AT_STORE = 'PAY AT STORE',
  PAY_AT_STORE_DUE = 'PAY AT STORE - DUE',
  CASH_ON_DELIVERY = 'CASH ON DELIVERY',
  CASH_ON_DELIVERY_DUE = 'CASH ON DELIVERY - DUE',
  PREPAID = 'PREPAID',
}

export const OrderSchema = new mongoose.Schema({
  paymentDetails: {
    paymentType: { type: String, required: true },
    paymentMethod: { type: String, required: true },
    // paymentDate: { type: String, required: false },
    paymentIds: { type: Array, required: false },
    partialPaymentId: { type: String, required: false },
    isPaid: { type: Boolean, required: true, default: false },

    amountPaid: { type: Number, required: true, default: 0 },
    amountDue: { type: Number, required: true },
  },
  pricingDetails: {
    billTotal: { type: Number, required: true },
    couponCode: { type: String, required: false },
    couponDiscount: { type: Number, required: false },
    payableTotal: { type: Number, required: true },
  },
  deliveryType: { type: String, required: true },
  shippingDetails: {},
  pickUpDetails: {},
  orderNumber: { type: String, required: true },
  orderDate: { type: String, required: true },
  // orderDate: { type: String, required: true, default: Date.now().toString() },
  // orderDateInString : {type : String , default : `${Date.now().}`}
  updatedDate: { type: String, required: false },
  userId: { type: String, required: true },
  userDetails: {
    phoneNumber: { type: Number, required: true },
    name: { type: String, required: true },
    emailId: { type: String, required: true },
  },
  orderStatus: {
    type: String,
    required: true,
    default: OrderStatuses.ORDERED,
  },
  timestamp: { type: Number, required: true },
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
});

export interface Order {
  userId: string;
  orderNumber: string;
  orderDate: Date;
  updatedDate: Date;
  deliveryType: string;
  shippingDetails: any;
  pickUpDetails: any;
  userDetails: {
    name: string;
    phoneNumber: number;
    emailId: string;
  };
  paymentDetails: {
    paymentType: string;
    paymentMethod: string;
    partialPaymentId: string;
    amountPaid: number;
    amountDue: number;

    // paymentDate: string;
    paymentIds: string[];
    isPaid: boolean;
  };
  pricingDetails: {
    billTotal: string;
    payableTotal: string;
    couponCode: string;
    couponDiscount: number;
  };
  orderStatus: string;
  timestamp: number;
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
//   isDelivered: string;,
// },

// shippingDetails: {
//   deliveryDate: Date;
//   deliveryAddress: Map<any, any>;
//   isDelivered: string;
//   shipDate: Date;
// };
