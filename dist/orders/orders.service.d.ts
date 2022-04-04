/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/error" />
import { Order, paymentTypes } from 'src/models/order.model';
import { Model } from 'mongoose';
import { CreateOrderDto } from './dto/create-order.dto';
import { Product } from 'src/models/product.model';
import { Coupon } from 'src/models/coupon.model';
import { OrderItem } from 'src/models/orderItem.model';
import { User } from 'src/models/user.model';
export declare class OrdersService {
    private readonly orderModel;
    private readonly productModel;
    private readonly couponModel;
    private readonly orderItemModel;
    private readonly userModel;
    constructor(orderModel: Model<Order>, productModel: Model<Product>, couponModel: Model<Coupon>, orderItemModel: Model<OrderItem>, userModel: Model<User>);
    createOrder(entireBody: CreateOrderDto, userId: string): Promise<{
        orderNumber: string;
        orderDate: number;
        selectedPickUpDate: number;
        paymentType: paymentTypes;
        deliveryType: string;
        selectedStore: any;
    }>;
    getOrderItems(userId: string): Promise<(import("mongoose").Document<unknown, any, OrderItem> & OrderItem & {
        _id: import("mongoose").Types.ObjectId;
    })[]>;
    _generateOrderNumber(): string;
    _getCouponDiscount(couponCode: string, orderTotal: number): Promise<number>;
    _validateCouponCode(couponCode: string, orderTotal: number): Promise<{
        couponDiscount: number;
        payableAmount: number;
    }>;
    _generateOrderItemDetails(orderItemsList: any): Promise<{
        orderItemsCount: number;
        orderItems: any[];
        orderTotal: number;
    }>;
    _generateSingleOrderItemDetails(productId: string, count: number): Promise<{
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
    }>;
    _handleSaveIndividualOrders(params: IndividualOrderItem): Promise<void>;
}
export interface IndividualOrderItem {
    paymentType: String;
    deliveryType: String;
    itemsCount: number;
    orderData: any;
    orderNumber: string;
    deliveryAddress: string;
    storeLocation: string;
    couponCode: string;
    couponDiscount: number;
}
