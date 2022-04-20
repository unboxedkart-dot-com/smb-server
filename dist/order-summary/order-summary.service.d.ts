import { OrderSummary } from 'src/models/order_summary.model';
import { Product } from 'src/models/product.model';
import { User } from 'src/models/user.model';
import { Model } from 'mongoose';
import { CartItem } from 'src/models/cart-item.model';
import { CreateOrderSummaryDto } from './dto/create-order-summary.dto';
import { Coupon } from 'src/models/coupon.model';
import { UpdateProductCountDto } from './dto/update-count.dto';
import { VerifyPaymentDto } from './dto/verify-payment.dto';
import { AddDeliveryAddressDto } from './dto/add-address.dto';
import { AddSelectedStoreDto } from './dto/add-selected-store.dto';
export declare class OrderSummaryService {
    private readonly orderSummaryModel;
    private readonly userModel;
    private readonly productModel;
    private readonly couponModel;
    constructor(orderSummaryModel: Model<OrderSummary>, userModel: Model<User>, productModel: Model<Product>, couponModel: Model<Coupon>);
    getPayableAmount(userId: string): Promise<{
        payableAmount: number;
        orderId: any;
        name: string;
        email: string;
        phoneNumber: string;
    }>;
    createPaymentOrder(payableAmount: number): Promise<any>;
    verifyPaymentSignature(userId: string, entireBody: VerifyPaymentDto): Promise<{
        status: string;
        message: string;
    }>;
    _calculateAmount(orderItems: any): Promise<number>;
    _getSingleItemPrice(productId: string, productCount: number): Promise<number>;
    getOrderSummaryItems(userId: string): Promise<CartItem[]>;
    createOrderSummaryItems(userId: string, entireBody: CreateOrderSummaryDto): Promise<void>;
    addDeliveryAddress(userId: string, entireBody: AddDeliveryAddressDto): Promise<void>;
    addSelectedStoreDetails(userId: string, entireBody: AddSelectedStoreDto): Promise<void>;
    addCouponDetails(userId: string, couponCode: String): Promise<void>;
    updateCount(userId: string, entireBody: UpdateProductCountDto): Promise<void>;
}
