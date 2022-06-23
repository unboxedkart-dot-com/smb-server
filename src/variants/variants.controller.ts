import { Controller, Get, Param, Post } from '@nestjs/common';
import { VariantsService } from './variants.service';

@Controller('variants')
export class VariantsController {
  constructor(private readonly variantsService: VariantsService) {}

  @Post('/add')
  async handleAddVariantsData() {
    await this.variantsService.addVariantsData();
  }

  @Get('/product/:code')
  async handleGetProductVariants(@Param('code') productCode: string) {
    console.log('getting product varinats', productCode);
    const response = await this.variantsService.getVariantsData(productCode);
    return response;
  }
}
