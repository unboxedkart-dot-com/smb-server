import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-strategies/jwt-auth.guard';
import { AddSearchTermDto } from './dto/add-search-term.dto';
import { SearchService } from './search.service';

@Controller('search')
export class SearchController {
  constructor(private readonly searchService: SearchService) {}

  @Get()
  async handleGetSearchedProducts(
    @Query('title') title: string,
    @Query('category') category: string,
    @Query('brand') brand: string,
    @Query('condition') condition: string,
    @Query('productCode') product: string,
    @Query('seller') seller: string,
    @Query('p') pageNumber: string,
  ) {
    // return {
    //   "date1" : Date.now(),
    //   "date2":Date.now
    // }
    console.log('query terms', title);
    return await this.searchService.getNewSearch(
      null,
      title,
      category,
      brand,
      condition,
      product,
      seller,
      pageNumber,
    );
    // const products = await this.searchService.getSearchedProducts(
    //   title,
    //   category,
    //   brand,
    //   condition,
    //   productCode,
    //   pageNumber,
    // );
    // return products;
  }

  @Get('/get-date')
  handleSendDate() {
    return {
      'date1': Date.now(),
      'date2': Date.now,
    };
  }

  @UseGuards(JwtAuthGuard)
  @Get('/recent-searches')
  async handleGetRecentSearches(@Req() request: any) {
    const userId = request.user.userId;
    const recentSearches = await this.searchService.getRecentSearches(userId);
    return recentSearches;
  }

  @UseGuards(JwtAuthGuard)
  @Post('/add/search-term')
  async handleAddRecentSearchTerm(
    @Req() request: any,
    @Body() entireBody: AddSearchTermDto,
  ) {
    const userId = request.user.userId;
    const recentSearches = await this.searchService.addRecentSearchTerm(
      userId,
      entireBody.searchTerm,
    );
    return recentSearches;
  }

  @UseGuards(JwtAuthGuard)
  @Post('/add/popular-search-term')
  async handleAddPopularSearchTerm(
    @Req() request: any,
    @Body() entireBody: AddSearchTermDto,
  ) {
    const userId = request.user.userId;
    const recentSearches = await this.searchService.addPopularSearchTerm(
      userId,
      entireBody.searchTerm,
    );
    return recentSearches;
  }

  @Get('/popular-searches')
  async handleGetPopularSearches() {
    const popularSearches = await this.searchService.getPopularSearches();
    return popularSearches;
  }

  @Get('/new-search')
  async handleGetNewSearch(
    @Query('brand') brand: string,
    @Query('category') category: string,
    @Query('condition') condition: string,
    @Query('seller') seller: string,
    @Query('product') product: string,
    @Query('title') title: string,
    @Query('p') pageNo: string,
  ) {
    return await this.searchService.getNewSearch(
      null,
      title,
      category,
      brand,
      condition,
      product,
      seller,
      pageNo,
    );
  }
}
