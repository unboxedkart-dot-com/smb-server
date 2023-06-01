import { AuthService } from 'src/auth/auth.service';
import { AddCartItemDto } from './dtos/add-cart-item.dto';
import { AddSearchedTermDto } from './dtos/add-searched-term.dto';
import { AddViewedProductDto } from './dtos/add-viewed-product.dto';
import { AddWishlistItemDto } from './dtos/add-wishlist-item.dto';
import { ClickedOnBuyNowDto } from './dtos/clicked-on-buy-now.dto';
import { clickedOnNeedMoreDiscountDto } from './dtos/clicked-on-need-more-discount.dto';
import { RemoveCartItemDto } from './dtos/remove-cart-item.dto';
import { RemoveWishlistItemDto } from './dtos/remove-wishlist-item.dto';
import { UsageTrackingControllerService } from './usage-tracking.service';
export declare class UsageTrackingController {
    private readonly usageTrackingService;
    private readonly authService;
    constructor(usageTrackingService: UsageTrackingControllerService, authService: AuthService);
    handleGetNotifications(request: any, type: string): Promise<import("../models/Tracking-notification.model").TrackingNotificationModel[]>;
    handleAddSearchedItem(request: any, entireBody: AddSearchedTermDto): Promise<void>;
    handleAddViewedProduct(request: any, entireBody: AddViewedProductDto): Promise<void>;
    handleAddClickedOnBuyNow(request: any, entireBody: ClickedOnBuyNowDto): Promise<void>;
    handleAddWishlistItem(request: any, entireBody: AddWishlistItemDto): Promise<void>;
    handleAddCartItem(request: any, entireBody: AddCartItemDto): Promise<void>;
    handleRemoveCartItem(request: any, entireBody: RemoveCartItemDto): Promise<void>;
    handleWishlistCartItem(request: any, entireBody: RemoveWishlistItemDto): Promise<void>;
    handleAddClickedToCall(request: any): Promise<void>;
    handleClickedOnNeedMoreDiscount(request: any, entireBody: clickedOnNeedMoreDiscountDto): Promise<void>;
    handleKnowMoreAboutUnboxedkart(request: any): Promise<void>;
    handleKnowMoreAboutStorePickup(request: any): Promise<void>;
    KnowMoreAboutStores(request: any): Promise<void>;
    viewCarouselItem(carouselId: string, request: any): Promise<void>;
}
