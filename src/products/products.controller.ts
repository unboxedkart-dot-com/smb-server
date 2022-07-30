import {
  Body,
  Controller,
  Get,
  Post,
  Param,
  Query,
  Delete,
  Req,
  Inject,
  forwardRef,
  UnauthorizedException,
  Patch,
  UseFilters,
  ForbiddenException,
  UseGuards,
} from '@nestjs/common';
import { Http2ServerResponse } from 'http2';
import mongoose from 'mongoose';
import { AuthService } from 'src/auth/auth.service';
import { JwtAuthGuard } from 'src/auth/jwt-strategies/jwt-auth.guard';
import { HttpExceptionFilter } from 'src/exceptions/http-exception.filter';
import { Product } from '../models/product.model';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(
    private readonly productsService: ProductsService,
    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService,
  ) {}

  @Get()
  async getProduct(@Query('q') q: string) {
    const product = await this.productsService.getProduct(q);
    return product;
    // {
    //   data: {
    //     response:
    //   },
    // };
  }

  @Get('/variant')
  async getSelectedVariant(
    @Query('product') product: string,
    @Query('condition') condition: string,
    @Query('storage') storage: string,
    @Query('color') color: string,
    @Query('processor') processor: string,
    @Query('combination') combination: string,
    @Query('ram') ram: string,
    @Query('screenSize') screenSize: string,
  ) {
    const response = await this.productsService.getSelectedVariant(
      product,
      condition,
      storage,
      color,
      processor,
      ram,
      combination,
      screenSize,
    );
    console.log('getting variant product', product);
    // return product;
    return response;
  }

  @Get('/similar-products/:id')
  async handleGetSimilarProducts(@Param('id') productId: string) {
    const products = await this.productsService.getSimilarProducts(productId);
    return products;
  }

  @Get('/related-products/:id')
  async handleGetRelatedProducts(@Param('id') productId: string) {
    const products = await this.productsService.getRelatedProducts(productId);
    return products;
  }

  @Get('best-sellers')
  async handleGetBestSellers(
    @Query('brand') brand: string,
    @Query('condition') condition: string,
    @Query('category') category: string,
  ) {
    const products = await this.productsService.getBestSellers(
      brand,
      category,
      condition,
    );
    return products;
  }

  @Get('featured-products')
  async handleGetFeaturedProducts(
    @Query('brand') brand: string,
    @Query('condition') condition: string,
    @Query('category') category: string,
  ) {
    const products = await this.productsService.getFeaturedProducts(
      brand,
      category,
      condition,
    );
    return products;
  }
}

// @Get('best-sellers/brand/:brand')
// async handleGetBestSellersByBrand() {

// }

// @Get('best-sellers/category/:category')
// async handleGetBestSellersByCategory() {}

// @Get('best-sellers/condition/:condition')
// async handleGetBestSellersByCondition() {}

// @Get('featured-products/brand/:brand')
// async handleGetFeaturedProductsByBrand() {}

// @Get('featured-products/category/:category')
// async handleGetFeaturedProductsByCategory() {}

// @Get('featured-products/condition/:condition')
// async handleGetFeaturedProductsByCondition() {}
