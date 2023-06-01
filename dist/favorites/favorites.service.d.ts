import { Model } from 'mongoose';
import { Favorite } from 'src/models/favorite.model';
import { Product } from 'src/models/product.model';
import { TrackingNotificationModel } from 'src/models/Tracking-notification.model';
import { User } from 'src/models/user.model';
export declare class FavoritesService {
    private readonly favoriteModel;
    private readonly userModel;
    private readonly productModel;
    private readonly trackingNotificationModel;
    constructor(favoriteModel: Model<Favorite>, userModel: Model<User>, productModel: Model<Product>, trackingNotificationModel: Model<TrackingNotificationModel>);
    getFavorites(userId: string): Promise<Product[]>;
    addFavorite(userId: string, productId: string): Promise<string>;
    deleteFavorite(userId: string, productId: string): Promise<{
        status: string;
        message: string;
    }>;
}
