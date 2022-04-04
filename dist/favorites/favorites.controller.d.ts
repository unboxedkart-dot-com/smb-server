import { FavoritesService } from './favorites.service';
export declare class FavoritesController {
    private readonly favoritesService;
    constructor(favoritesService: FavoritesService);
    handleGetFavorites(request: any): Promise<import("../models/product.model").Product[]>;
    handleAddFavorite(request: any, productId: string): Promise<string>;
    handleDeleteFavorite(request: any, productId: string): Promise<void>;
}
