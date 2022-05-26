import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { CarouselItemsService } from './carousel-items.service';
import { CreateCarouselItemDto } from './dto/create-carousel-item.dto';
import { UpdateCarouselItemDto } from './dto/update-carousel-item.dto';

@Controller('carousel-items')
export class CarouselItemsController {
  constructor(private readonly carouselItemsService: CarouselItemsService) {}

  @Post()
  create(@Body() createCarouselItemDto: CreateCarouselItemDto) {
    return this.carouselItemsService.create(createCarouselItemDto);
  }

  // @Get() d
  // findAll() {
  //   return this.carouselItemsService.findAll();
  // }

  @Delete()
  deleteAll() {
    return this.carouselItemsService.deleteAll();
  }

  @Post('add-many')
  addMany() {
    return this.carouselItemsService.addMany();
  }

  @Get()
  findOne(@Query('placement') q: string) {
    console.log('getting carousel items for', q);
    return this.carouselItemsService.carouselItems(q);
  }

  @Get('brand/:q')
  getBrandCarouselItems(@Param('q') brandName: string) {
    return this.carouselItemsService.carouselItemsByBrand(brandName);
  }

  @Get('condition/:q')
  getConditionCarouselItems(@Param('q') conditionName: string) {
    return this.carouselItemsService.carouselItemsByBrand(conditionName);
  }

  @Get('category/:q')
  getCategoryCarouselItems(@Param('q') categoryName: string) {
    return this.carouselItemsService.carouselItemsByBrand(categoryName);
  }

  @Get('seller/:q')
  getSellerCarouselItems(@Param('q') sellerName: string) {
    return this.carouselItemsService.carouselItemsByBrand(sellerName);
  }

  // @Patch(':id')
  // update(
  //   @Param('id') id: string,
  //   @Body() updateCarouselItemDto: UpdateCarouselItemDto,
  // ) {
  //   return this.carouselItemsService.update(+id, updateCarouselItemDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.carouselItemsService.remove(+id);
  // }
}
