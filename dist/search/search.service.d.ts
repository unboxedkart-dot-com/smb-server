/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/error" />
import { Model } from 'mongoose';
import { Product } from 'src/models/product.model';
import { SearchTerm } from 'src/models/search_term';
import { User } from 'src/models/user.model';
export declare class SearchService {
    private readonly productModel;
    private readonly userModel;
    private readonly searchTermModel;
    constructor(productModel: Model<Product>, userModel: Model<User>, searchTermModel: Model<SearchTerm>);
    getNewSearch(title: string, category: string, brand: string, condition: string, productCode: string, sellerCode: string, pageNumber: string): Promise<number>;
    getSearchedProducts(title: string, category: string, brand: string, condition: string, productCode: string, pageNumber: string): Promise<Product[]>;
    _getProductsByProductCode(productCode: string, itemsToSkip: number): Promise<Product[]>;
    _getProductsByTitle(title: string, pageNumber: string, itemsToSkip: number): Promise<Product[]>;
    getRecentSearches(userId: any): Promise<[{
        searchTerm: string;
        timestamp: Date;
    }]>;
    addRecentSearchTerm(userId: string, searchTerm: string): Promise<void>;
    addPopularSearchTerm(userId: string, searchTerm: string): Promise<void>;
    getPopularSearches(): Promise<(import("mongoose").Document<unknown, any, SearchTerm> & SearchTerm & {
        _id: import("mongoose").Types.ObjectId;
    })[]>;
    _getProductsByCategoryAndBrand(category: string, brand: string, itemsToSkip: number): Promise<Product[]>;
    _getProductsByBrandAndCondition(brand: string, condition: string, itemsToSkip: number): Promise<Product[]>;
    _getProductsByConditionAndCategory(condition: string, category: string, itemsToSkip: number): Promise<Product[]>;
}
