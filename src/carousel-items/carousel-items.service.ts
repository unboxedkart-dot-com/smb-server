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

  async deleteAll() {
    await this.carouselItemModel.deleteMany({});
  }

  async addMany() {
    await this.carouselItemModel.insertMany([
      //condition/unboxed
      {
        imageUrl:
          'https://unboxedkart-india.s3.ap-south-1.amazonaws.com/carousels/mobile/condition/unboxed/1.webp',
        productCode: 'apple-iphone-13-pro',
        placement: 'mobile/condition/unboxed',
        conditionCode: 'unboxed',
        isExact: true,
        index: 1,
      },
      {
        imageUrl:
          'https://unboxedkart-india.s3.ap-south-1.amazonaws.com/carousels/mobile/condition/unboxed/2.webp',
        productCode: 'apple-airpods-pro',
        placement: 'mobile/condition/unboxed',
        conditionCode: 'unboxed',
        isExact: true,
        index: 2,
      },
      {
        imageUrl:
          'https://unboxedkart-india.s3.ap-south-1.amazonaws.com/carousels/mobile/condition/unboxed/3.webp',
        brandCode: 'apple',
        categoryCode: 'laptop',
        seriesCode: 'macbook-pro',
        screenSizeCode: '13-inch',
        placement: 'mobile/condition/unboxed',
        conditionCode: 'unboxed',
        index: 3,
      },
      {
        imageUrl:
          'https://unboxedkart-india.s3.ap-south-1.amazonaws.com/carousels/mobile/condition/unboxed/4.webp',
        productCode: 'apple-ipad-pro',
        seriesCode: 'ipad-pro',
        categoryCode: 'tablet',
        brandCode: 'apple',
        placement: 'mobile/condition/condition',
        conditionCode: 'unboxed',
        index: 4,
      },
      {
        imageUrl:
          'https://unboxedkart-india.s3.ap-south-1.amazonaws.com/carousels/mobile/category/condition/5.webp',
        productCode: 'apple-watch-series-7',
        placement: 'mobile/condition/unboxed',
        conditionCode: 'unboxed',
        isExact: true,
        index: 5,
      },

      // grade -a
      {
        imageUrl:
          'https://unboxedkart-india.s3.ap-south-1.amazonaws.com/carousels/mobile/condition/grade-a/1.webp',
        productCode: 'apple-iphone-12-pro',
        placement: 'mobile/condition/grade-a',
        conditionCode: 'grade-a',
        isExact: true,
        index: 1,
      },
      {
        imageUrl:
          'https://unboxedkart-india.s3.ap-south-1.amazonaws.com/carousels/mobile/condition/grade-a/2.webp',
        productCode: 'apple-airpods-pro',
        placement: 'mobile/condition/grade-a',
        conditionCode: 'grade-a',
        isExact: true,
        index: 2,
      },
      {
        imageUrl:
          'https://unboxedkart-india.s3.ap-south-1.amazonaws.com/carousels/mobile/condition/grade-a/3.webp',
        brandCode: 'apple',
        categoryCode: 'laptop',
        seriesCode: 'macbook-pro',
        screenSizeCode: '13-inch',
        placement: 'mobile/condition/grade-a',
        conditionCode: 'grade-a',
        index: 3,
      },
      {
        imageUrl:
          'https://unboxedkart-india.s3.ap-south-1.amazonaws.com/carousels/mobile/condition/grade-a/4.webp',
        brandCode: 'apple',
        categoryCode: 'tablet',
        seriesCode: 'ipad-pro',
        placement: 'mobile/condition/grade-a',
        conditionCode : 'grade-a',
        index: 4,
      },
      {
        imageUrl:
          'https://unboxedkart-india.s3.ap-south-1.amazonaws.com/carousels/mobile/condition/grade-a/5.webp',
        productCode: 'apple-watch-series-7',
        conditionCode: 'grade-a',
        placement: 'mobile/condition/grade-a',
        isExact: true,
        index: 5,
      },


      //grade -b
      {
        imageUrl:
          'https://unboxedkart-india.s3.ap-south-1.amazonaws.com/carousels/mobile/condition/grade-b/1.webp',
        productCode: 'apple-iphone-12-pro',
        placement: 'mobile/condition/grade-b',
        conditionCode: 'grade-b',
        isExact: true,
        index: 1,
      },
      {
        imageUrl:
          'https://unboxedkart-india.s3.ap-south-1.amazonaws.com/carousels/mobile/condition/grade-b/2.webp',
        productCode: 'apple-airpods-pro',
        placement: 'mobile/condition/grade-b',
        conditionCode: 'grade-b',
        isExact: true,
        index: 2,
      },
      {
        imageUrl:
          'https://unboxedkart-india.s3.ap-south-1.amazonaws.com/carousels/mobile/condition/grade-b/3.webp',
        brandCode: 'apple',
        categoryCode: 'laptop',
        seriesCode: 'macbook-pro',
        screenSizeCode: '13-inch',
        placement: 'mobile/condition/grade-b',
        conditionCode: 'grade-b',
        index: 3,
      },
      {
        imageUrl:
          'https://unboxedkart-india.s3.ap-south-1.amazonaws.com/carousels/mobile/condition/grade-b/4.webp',
        brandCode: 'apple',
        categoryCode: 'tablet',
        seriesCode: 'ipad-pro',
        placement: 'mobile/condition/grade-b',
        conditionCode : 'grade-b',
        index: 4,
      },


      //grade -c 
      

    ]);
  }

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
      index: createCarouselItemDto.index,
      startingPrice: createCarouselItemDto.startingPrice,
      endingPrice: createCarouselItemDto.endingPrice,
      seriesCode: createCarouselItemDto.seriesCode,
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

  async carouselItems(q: string) {
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
