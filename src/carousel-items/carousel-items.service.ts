import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CarouselItem } from 'src/models/carousel_item.model';
import { CreateCarouselItemDto } from './dto/create-carousel-item.dto';
import { UpdateCarouselItemDto } from './dto/update-carousel-item.dto';

@Injectable()
export class CarouselItemsService {
  constructor(
    @InjectModel('CarouselItem')
    private readonly carouselItemModel: Model<CarouselItem>,
  ) {}

  create(createCarouselItemDto: CreateCarouselItemDto) {
    const newItem = new this.carouselItemModel({
      imageUrl: createCarouselItemDto.imageUrl,
      brandCode: createCarouselItemDto.brandCode,
      categoryCode: createCarouselItemDto.categoryCode,
      conditionCode: createCarouselItemDto.conditionCode,
      title: createCarouselItemDto.title,
      productCode: createCarouselItemDto.productCode,
      isExact: createCarouselItemDto.isExact,
      productId: createCarouselItemDto.productId,
      placement: createCarouselItemDto.placement,
    });
    console.log('new carousel item');
    newItem.save();
  }

  findAll() {
    return `This action returns all carouselItems`;
  }

  async findOne(category: string, brand: string, condition: string, q: string) {
    const carouselItems = await this.carouselItemModel.find({
      conditionCode:
        condition == undefined || 'null' ? { $ne: null } : condition,
      brandCode: brand == undefined || 'null' ? { $ne: null } : brand,
      categoryCode: category == undefined || 'null' ? { $ne: null } : category,
      q: q == undefined || 'null' ? { $ne: null } : q,
    });
    console.log('got carousel items');
    return carouselItems;
    // return `This action returns a #${id} carouselItem`;
  }

  update(id: number, updateCarouselItemDto: UpdateCarouselItemDto) {
    return `This action updates a #${id} carouselItem`;
  }

  remove(id: number) {
    return `This action removes a #${id} carouselItem`;
  }

  async carouselItems(q : string){
    const carouselItems = await this.carouselItemModel.find({
      placement: q,
      isActive: true,
    });
    console.log('got carousel items');
    return carouselItems;
  }

  async carouselItemsByBrand(brand: string) {
    const carouselItems = await this.carouselItemModel.find({
      brandCode: brand,
      isActive: true,
    });
    console.log('got carousel items');
    return carouselItems;
  }

  async carouselItemsByCondition(condition: string) {
    const carouselItems = await this.carouselItemModel.find({
      conditionCode: condition,
      isActive: true,
    });
    console.log('got carousel items');
    return carouselItems;
  }

  async carouselItemsByCategory(category: string) {
    const carouselItems = await this.carouselItemModel.find({
      categoryCode: category,
      isActive: true,
    });
    console.log('got carousel items');
    return carouselItems;
  }

  async carouselItemsBySeller(Seller: string) {
    const carouselItems = await this.carouselItemModel.find({
      SellerCode: Seller,
      isActive: true,
    });
    console.log('got carousel items');
    return carouselItems;
  }
}
