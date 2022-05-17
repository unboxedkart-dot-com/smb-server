import mongoose from 'mongoose';

export const OrderSummarySchema = new mongoose.Schema({
  userId: { type: String, required: true },

  orderItems: [
    {
      productId: { type: String, required: true },
      productCount: { type: Number, required: true },
    },
  ],

  itemsCount: { type: Number, required: true },
  couponCode: { type: String, required: false },
  couponDiscount: { type: Number, required: false },

  deliveryType: { type: String, required: false },
  shippingDetails: {
    shipDate: { type: Date, required: false },
    expectedDeliveryDate: { type: Date, required: false },
    expectedDeliveryDateInString: { type: String, required: false },
    deliveryDate: { type: String, required: false },
    deliveryDateInString: { type: String, required: false },
    deliveryAddress: { type: {}, required: false },
  },
  pickUpDetails: {
    storeLocation: { type: {}, required: false },
    pickUpTimeStart: { type: String, required: false },
    pickUpTimeEnd: { type: String, required: false },
    pickUpDate: { type: String, required: false },
    pickUpDateInString: { type: String, required: false },
    pickUpTimeInString: { type: String, required: false },
  },

  paymentType: { type: String, required: false },
  paymentMethod: { type: String, required: false },

  paymentId: { type: String, required: false },
  partialPaymentId: { type: String, required: false },

  paymentOrderId: { type: String, required: false },
  partialPaymentOrderId: { type: String, required: false },

  isActive: { type: Boolean, default: false },

  paymentAmount: { type: Number },

  partialPaymentAmount: { type: Number },

  orderNumber: { type: String },
});

export interface OrderSummary {
  userId: string;

  orderItems: [
    {
      productId: string;
      productCount: number;
    },
  ];

  itemsCount: number;
  couponCode: string;
  couponDiscount: number;

  deliveryType: string;
  shippingDetails: {
    shipDate: Date;
    expectedDeliveryDate: Date;
    expectedDeliveryDateInString: string;
    deliveryDate: string;
    deliveryDateInString: string;
    deliveryAddress: any;
  };
  pickUpDetails: {
    storeLocation: any;
    pickUpTimeStart: string;
    pickUpTimeEnd: string;
    pickUpDate: string;
    pickUpDateInString: string;
    pickUpTimeInString: string;
  };

  paymentType: string;
  paymentMethod: string;

  paymentId: string;
  partialPaymentId: string;

  paymentOrderId: string;
  partialPaymentOrderId: string;

  isActive: boolean;

  paymentAmount: number;

  partialPaymentAmount: number;

  orderNumber: string;

  // userId: string;
  // timestamp: Date;
  // orderItems: [
  //   {
  //     productId: string;
  //     productCount: number;
  //   },
  // ];
}
