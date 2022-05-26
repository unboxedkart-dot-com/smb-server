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
    getNewSearch(isExact: boolean, title: string, category: string, brand: string, condition: string, product: string, seller: string, pageNumber: string): Promise<Product[]>;
    getRecentSearches(userId: any): Promise<[{
        searchTerm: string;
        timestamp: Date;
    }]>;
    addRecentSearchTerm(userId: string, searchTerm: string): Promise<void>;
    addPopularSearchTerm(userId: string, searchTerm: string): Promise<void>;
    getPopularSearches(): Promise<(import("mongoose").Document<unknown, any, SearchTerm> & SearchTerm & {
        _id: import("mongoose").Types.ObjectId;
    })[]>;
}
