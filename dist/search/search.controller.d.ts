/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose" />
import { AddSearchTermDto } from './dto/add-search-term.dto';
import { SearchService } from './search.service';
export declare class SearchController {
    private readonly searchService;
    constructor(searchService: SearchService);
    handleGetSearchedProducts(title: string, category: string, brand: string, condition: string, product: string, seller: string, pageNumber: string): Promise<import("../models/product.model").Product[]>;
    handleSendDate(): {
        date1: number;
        date2: () => number;
    };
    handleGetRecentSearches(request: any): Promise<[{
        searchTerm: string;
        timestamp: Date;
    }]>;
    handleAddRecentSearchTerm(request: any, entireBody: AddSearchTermDto): Promise<void>;
    handleAddPopularSearchTerm(request: any, entireBody: AddSearchTermDto): Promise<void>;
    handleGetPopularSearches(): Promise<(import("mongoose").Document<unknown, any, import("../models/search_term").SearchTerm> & import("../models/search_term").SearchTerm & {
        _id: import("mongoose").Types.ObjectId;
    })[]>;
    handleGetNewSearch(brand: string, category: string, condition: string, seller: string, product: string, title: string, pageNo: string): Promise<import("../models/product.model").Product[]>;
}
