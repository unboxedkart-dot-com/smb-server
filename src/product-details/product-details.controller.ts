import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateProductDetailsDto } from './dto/create-product-details.dto';
// import { CreateProductDetailsDto } from './dto/create-product-details.dto';
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
    // {
    //   data: {
    //     response: productSpecs,
    //   },
    // };
  }

  @Get('/description/:id')
  async handleGetProductDescription(@Param('id') productId: string) {
    const productDescription =
      await this.productDetailsService.getProductDescription(productId);

    return productDescription;
    // return {
    //   data: {
    //     response: productDescription,
    //   },
    // };
  }

  @Post('/specs')
  async handleSetProductSpecs(@Body() entireBody: CreateProductDetailsDto) {
    const response = await this.productDetailsService.addProductSpecs(
      entireBody,
    );
  }
}
