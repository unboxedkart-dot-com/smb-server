"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SearchController = void 0;
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("../auth/jwt-strategies/jwt-auth.guard");
const add_search_term_dto_1 = require("./dto/add-search-term.dto");
const search_service_1 = require("./search.service");
let SearchController = class SearchController {
    constructor(searchService) {
        this.searchService = searchService;
    }
    async handleGetSearchedProducts(title, category, brand, condition, product, seller, pageNumber) {
        console.log('query terms', title);
        return await this.searchService.getNewSearch(null, title, category, brand, condition, product, seller, pageNumber);
    }
    handleSendDate() {
        return {
            'date1': Date.now(),
            'date2': Date.now,
        };
    }
    async handleGetRecentSearches(request) {
        const userId = request.user.userId;
        const recentSearches = await this.searchService.getRecentSearches(userId);
        return recentSearches;
    }
    async handleAddRecentSearchTerm(request, entireBody) {
        const userId = request.user.userId;
        const recentSearches = await this.searchService.addRecentSearchTerm(userId, entireBody.searchTerm);
        return recentSearches;
    }
    async handleAddPopularSearchTerm(request, entireBody) {
        const userId = request.user.userId;
        const recentSearches = await this.searchService.addPopularSearchTerm(userId, entireBody.searchTerm);
        return recentSearches;
    }
    async handleGetPopularSearches() {
        const popularSearches = await this.searchService.getPopularSearches();
        return popularSearches;
    }
    async handleGetNewSearch(brand, category, condition, seller, product, title, pageNo) {
        return await this.searchService.getNewSearch(null, title, category, brand, condition, product, seller, pageNo);
    }
};
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('title')),
    __param(1, (0, common_1.Query)('category')),
    __param(2, (0, common_1.Query)('brand')),
    __param(3, (0, common_1.Query)('condition')),
    __param(4, (0, common_1.Query)('productCode')),
    __param(5, (0, common_1.Query)('seller')),
    __param(6, (0, common_1.Query)('p')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, String, String, String, String]),
    __metadata("design:returntype", Promise)
], SearchController.prototype, "handleGetSearchedProducts", null);
__decorate([
    (0, common_1.Get)('/get-date'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], SearchController.prototype, "handleSendDate", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)('/recent-searches'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], SearchController.prototype, "handleGetRecentSearches", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)('/add/search-term'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, add_search_term_dto_1.AddSearchTermDto]),
    __metadata("design:returntype", Promise)
], SearchController.prototype, "handleAddRecentSearchTerm", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)('/add/popular-search-term'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, add_search_term_dto_1.AddSearchTermDto]),
    __metadata("design:returntype", Promise)
], SearchController.prototype, "handleAddPopularSearchTerm", null);
__decorate([
    (0, common_1.Get)('/popular-searches'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], SearchController.prototype, "handleGetPopularSearches", null);
__decorate([
    (0, common_1.Get)('/new-search'),
    __param(0, (0, common_1.Query)('brand')),
    __param(1, (0, common_1.Query)('category')),
    __param(2, (0, common_1.Query)('condition')),
    __param(3, (0, common_1.Query)('seller')),
    __param(4, (0, common_1.Query)('product')),
    __param(5, (0, common_1.Query)('title')),
    __param(6, (0, common_1.Query)('p')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, String, String, String, String]),
    __metadata("design:returntype", Promise)
], SearchController.prototype, "handleGetNewSearch", null);
SearchController = __decorate([
    (0, common_1.Controller)('search'),
    __metadata("design:paramtypes", [search_service_1.SearchService])
], SearchController);
exports.SearchController = SearchController;
//# sourceMappingURL=search.controller.js.map