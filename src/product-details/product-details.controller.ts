import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateProductDetailsDto } from './dto/create-product-details.dto';
import { ProductDetailsService } from './product-details.service';

@Controller('product-details')
export class ProductDetailsController {
  constructor(private readonly productDetailsService: ProductDetailsService) {}

  @Get('/:id')
  async handleGetProductSpecs(@Param('id') productId: string) {
    const response = await this.productDetailsService.getProductSpecs(
      productId,
    );
    return response;
  }

  @Post()
  async handleSetProductSpecs(@Body('') entireBody: CreateProductDetailsDto) {
    const response = await this.productDetailsService.addProductSpecs(
      entireBody,
    );
  }
}
