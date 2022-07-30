import {
  Controller,
  Get,
  Param, Query
} from '@nestjs/common';
import { ProductDetailsService } from './product-details.service';

@Controller('product-details')
export class ProductDetailsController {
  constructor(private readonly productDetailsService: ProductDetailsService) {}


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

  @Get('/variants')
  async handleGetProductVariants(@Query('id') productCode: string) {
    console.log('productCode to get variants', productCode);
    const response = await this.productDetailsService.getProductVariants(
      productCode,
    );
    return response;
  }

}
