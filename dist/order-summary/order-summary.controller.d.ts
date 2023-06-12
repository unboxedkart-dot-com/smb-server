import { AddDeliveryAddressDto } from './dto/add-address.dto';
import { AddSelectedStoreDto } from './dto/add-selected-store.dto';
import { CreateOrderSummaryDto } from './dto/create-order-summary.dto';
import { UpdateProductCountDto } from './dto/update-count.dto';
import { VerifyPaymentDto } from './dto/verify-payment.dto';
import { OrderSummaryService } from './order-summary.service';
export declare class OrderSummaryController {
    private readonly orderSummaryService;
    constructor(orderSummaryService: OrderSummaryService);
    handleGetOrderSummaryItems(request: any): Promise<import("../models/cart-item.model").CartItem[]>;
    handleCreateOrderSummaryItems(request: any, entireBody: CreateOrderSummaryDto): Promise<void>;
    handleUpdateCount(request: any, entireBody: UpdateProductCountDto): Promise<void>;
    handleAddCoupon(request: any, couponCode: string): Promise<void>;
    handleAddStoreDetails(request: any, entireBody: AddSelectedStoreDto): Promise<void>;
    handleAddDeliveryAddress(entireBody: AddDeliveryAddressDto, request: any): Promise<void>;
    handleGetPayableAmount(request: any): Promise<{
        payableAmount: number;
        paymentOrderId: any;
        partialPaymentOrderId: any;
        partialPaymentAmount: number;
        name: string;
        email: string;
        phoneNumber: string;
    }>;
    handleGetPartialPaymentAmount(request: any): Promise<{
        payableAmount: number;
        orderId: any;
        name: string;
        email: string;
        phoneNumber: string;
    }>;
    handleUpdatePaymentMethod(request: any, paymentMethod: string): Promise<{
        status: string;
        message: string;
        orderNumber: string;
        orderData: string;
    }>;
    handleVerifyPayment(request: any, entireBody: VerifyPaymentDto): Promise<{
        status: string;
        message: string;
        orderNumber: string;
    } | {
        status: string;
        message: string;
        orderNumber?: undefined;
    }>;
    handleVerifyPartialPayment(request: any, entireBody: VerifyPaymentDto): Promise<{
        status: string;
        message: string;
        orderNumber: string;
    } | {
        status: string;
        message: string;
        orderNumber?: undefined;
    }>;
}
