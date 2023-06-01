import { Product } from 'src/models/product.model';
import { Model } from 'mongoose';
import { User } from 'src/models/user.model';
import { CartItem } from 'src/models/cart-item.model';
import { SavedToLater } from 'src/models/save_to_later.model';
import { TrackingNotificationModel } from 'src/models/Tracking-notification.model';
export declare class CartService {
    private readonly cartItemModel;
    private readonly savedToLaterModel;
    private readonly userModel;
    private readonly productModel;
    private readonly trackingNotificationModel;
    constructor(cartItemModel: Model<CartItem>, savedToLaterModel: Model<SavedToLater>, userModel: Model<User>, productModel: Model<Product>, trackingNotificationModel: Model<TrackingNotificationModel>);
    getCartItems(userId: string): Promise<CartItem[]>;
    getSavedLaterProducts(userId: string): Promise<SavedToLater[]>;
    addCartItem(userId: string, productId: string): Promise<string>;
    addSavedToLater(userId: string, productId: string): Promise<void>;
    updateCartItem(userId: string, productId: string, productCount: number): Promise<void>;
    deleteCartItem(userId: string, productId: string): Promise<void>;
    removeProductFromSaveLater(userId: string, productId: string): Promise<void>;
    _handleAddCartItem(userId: string, productId: string): Promise<void>;
    _handleAddSaveLater(userId: string, productId: string): Promise<void>;
}
