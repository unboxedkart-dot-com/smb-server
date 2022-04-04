import {
  Body,
  Controller,
  Get,
  Post,
  Param,
  Query,
  Delete,
} from '@nestjs/common';
import mongoose from 'mongoose';
import { Product } from '../models/product.model';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  async addProduct(
    @Body()
    entireBody: Product,
  ) {
    const generatedId = await this.productsService.insertProduct(
      entireBody,
      // entireBody.title,
      // entireBody.price,
      // entireBody.sellingPrice,
      // entireBody.condition,
      // entireBody.searchCases,
      // entireBody('title'), entireBody('price') entireBody('sellingPrice'), entireBody('condition')
    );
    return { id: generatedId };
  }

  // @Get()
  // async getProducts() {
  //   const products = await this.productsService.getProducts();
  //   return products;
  // }

  @Get()
  async getProduct(@Query('q') q: string) {
    const product = await this.productsService.getProduct(q);
    return product;
  }

  @Delete()
  async handleDeleteProducts() {
    await this.productsService.deleteProducts();
    return 'products deleted';
  }

  @Delete(':id')
  async handleDeleteProduct(@Body('id') id: string) {
    await this.productsService.deleteSingleProduct(id);
    return 'product deleted';
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
    console.log("DB URL", process.env.DB_CONNECTION_URL)
    return products;
  }

  @Get('best-sellers/brand/:brand')
  async handleGetBestSellersByBrand(){

  }

  @Get('best-sellers/category/:category')
  async handleGetBestSellersByCategory(){

  }

  @Get('best-sellers/condition/:condition')
  async handleGetBestSellersByCondition(){

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

  @Get('featured-products/brand/:brand')
  async handleGetFeaturedProductsByBrand(){

  }

  @Get('featured-products/category/:category')
  async handleGetFeaturedProductsByCategory(){

  }

  @Get('featured-products/condition/:condition')
  async handleGetFeaturedProductsByCondition(){

  }
}
