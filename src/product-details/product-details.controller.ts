import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Req,
} from '@nestjs/common';
import { AddProductDataDto } from './dto/add-product-data.dto';
import { AddProductImagesDto } from './dto/add-product-images.dto';
import { CreateProductDetailsDto } from './dto/create-product-details.dto';
// import { CreateProductDetailsDto } from './dto/create-product-details.dto';
import { ProductDetailsService } from './product-details.service';

@Controller('product-details')
export class ProductDetailsController {
  constructor(private readonly productDetailsService: ProductDetailsService) {}

  @Post('add-many')
  async handleAddMany() {
    await this.productDetailsService.addMoreProductData();
  }

  @Post('add-images-data')
  async handleAddManyImages(){
    await this.productDetailsService.addMoreProductImages();
  }

  @Get('/specs/:id')
  async handleGetProductSpecs(@Param('id') productId: string) {
    const productSpecs = await this.productDetailsService.getProductSpecs(
      productId,
    );
    return productSpecs;
  }

  @Get('/description/:id')
  async handleGetProductDescription(@Param('id') productId: string) {
    const productDescription =
      await this.productDetailsService.getProductDescription(productId);

    return productDescription;
  }

  @Post('/specs')
  async handleSetProductSpecs(@Body() entireBody: CreateProductDetailsDto) {
    console.log('adding individual sepcs');
    const response = await this.productDetailsService.addProductSpecs(
      entireBody,
    );
  }

  @Post('some')
  async addSomething() {
    const response = await this.productDetailsService.addSomething();
  }

  @Patch('modify-product-data')
  async modifyProductData() {
    await this.productDetailsService.addSeriesCodeToProductData();
  }

  @Post('/data')
  async addProductData(
    @Req() request: any,
    @Body() entireBody: AddProductDataDto,
  ) {
    const response = await this.productDetailsService.addProductData(
      entireBody,
    );
    return response;
  }

  @Get('/available-products')
  async getAvailableProducts(
    @Query('brand-code') brandCode: string,
    @Query('category-code') categoryCode: string,
  ) {
    const response = await this.productDetailsService.getAvailableProducts(
      brandCode,
      categoryCode,
    );
    return response;
  }

  @Post('/images')
  async handleAddProductImages(@Body() entireBody: AddProductImagesDto) {
    const response = await this.productDetailsService.addProductImages(
      entireBody,
    );
    return response;
  }

  @Get('/variants')
  async handleGetProductVariants(@Query('id') productCode: string) {
    console.log('productCode to get variants', productCode);
    const response = await this.productDetailsService.getProductVariants(
      productCode,
    );
    return response;
  }

  @Post('/add-many-specs')
  async handleAddManySpecs() {
    const response = await this.productDetailsService.addMultipleProductSpecs();
    return response;
  }
}
