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
      {
        imageUrl:
          'https://unboxedkart-india.s3.ap-south-1.amazonaws.com/carousels/mobile/brand/apple/1.webp',
        productCode: 'apple-iphone-13-pro',
        isExact: true,
        title : "iPhone 13 Pro",
        placement: 'mobile/brand/apple',
        index: 1,
      },

      {
        imageUrl:
          'https://unboxedkart-india.s3.ap-south-1.amazonaws.com/carousels/mobile/brand/apple/2.webp',
        productCode: 'apple-airpods-pro',
        isExact: true,
        title : "Apple Airpods Pro",
        placement: 'mobile/brand/apple',
        index: 2,
      },

      {
        imageUrl:
          'https://unboxedkart-india.s3.ap-south-1.amazonaws.com/carousels/mobile/brand/apple/3.webp',
        categoryCode: 'watch',
        title : "Apple Watch",
        brandCode: 'apple',
        placement: 'mobile/brand/apple',
        index: 3,
      },

      {
        imageUrl:
          'https://unboxedkart-india.s3.ap-south-1.amazonaws.com/carousels/mobile/brand/apple/4.webp',
        categoryCode: 'laptop',
        productCode : "apple-macbook-pro",
        isExact : true,
        title : "MacBook Pro 13 Inch",
        screenSizeCode: '13-inch',
        seriesCode: 'macbook-pro',
        brandCode: 'apple',
        placement: 'mobile/brand/apple',
        index: 4,
      },

      {
        imageUrl:
          'https://unboxedkart-india.s3.ap-south-1.amazonaws.com/carousels/mobile/brand/apple/4.webp',
        productCode : "apple-ipad-pro",
        title : "iPad Pro",
        placement: 'mobile/brand/apple',
        index: 4,
      },

      // samsung

      {
        imageUrl:
          'https://unboxedkart-india.s3.ap-south-1.amazonaws.com/carousels/mobile/brand/samsung/1.webp',
        productCode: 'samsung-galaxy-s21-ultra',
        title : "Samsung Galaxy S21 Ultra",
        isExact: true,
        placement: 'mobile/brand/samsung',
        index: 1,
      },

      {
        imageUrl:
          'https://unboxedkart-india.s3.ap-south-1.amazonaws.com/carousels/mobile/brand/samsung/4.webp',
        productCode : "samsung-galaxy-fold",
        title : "Samsung Galaxy Fold",
        placement: 'mobile/brand/samsung',
        index: 2,
      },
      {
        imageUrl:
          'https://unboxedkart-india.s3.ap-south-1.amazonaws.com/carousels/mobile/brand/samsung/3.webp',
        title : "Samsung Galaxy Note",
        productCode : "samsung-galaxy-note",
        placement: 'mobile/brand/samsung',
        index: 3,
      },
       {
        imageUrl:
          'https://unboxedkart-india.s3.ap-south-1.amazonaws.com/carousels/mobile/brand/samsung/4.webp',
        brandCode: 'samsung',
        categoryCode: 'earphones',
        title : "Samsung Galaxy Buds",
        placement: 'mobile/brand/samsung',
        index: 4,
      },



      //oneplus

      {
        imageUrl:
          'https://unboxedkart-india.s3.ap-south-1.amazonaws.com/carousels/mobile/brand/oneplus/1.webp',
        productCode: 'oneplus-10-pro',
        isExact : true,
        title : "Oneplus 10 Pro",
        placement: 'mobile/brand/oneplus',
        index: 1,
      },

      

      {
        imageUrl:
          'https://unboxedkart-india.s3.ap-south-1.amazonaws.com/carousels/mobile/brand/oneplus/2.webp',
        productCode: 'oneplus-9-pro',
        isExact : true,
        title : "Oneplus 9 Pro",
        placement: 'mobile/brand/oneplus',
        index: 2,
      },

      {
        imageUrl:
          'https://unboxedkart-india.s3.ap-south-1.amazonaws.com/carousels/mobile/brand/oneplus/3.webp',
        productCode: 'oneplus-9r',
        isExact : true, 
        title : "Oneplus 9R",
        placement: 'mobile/brand/oneplus',
        index: 3,
      },

      {
        imageUrl:
          'https://unboxedkart-india.s3.ap-south-1.amazonaws.com/carousels/mobile/brand/oneplus/4.webp',
        productCode : "oneplus-8",
        isExact : true,
        title : "Oneplus 8",
        placement: 'mobile/brand/oneplus',
        index: 4,
      },

     

      //brand/category/mobile-phone

      {
        imageUrl:
          'https://unboxedkart-india.s3.ap-south-1.amazonaws.com/carousels/mobile/category/mobile-phone/1.webp',
        productCode: 'apple-iphone-11',
        isExact : true,
        title : "iPhone 11",
        placement: 'mobile/category/mobile-phone',
        index: 1,
      },
      {
        imageUrl:
          'https://unboxedkart-india.s3.ap-south-1.amazonaws.com/carousels/mobile/category/mobile-phone/2.webp',
        productCode: 'apple-iphone-13-pro',
        isExact : true,
        title : "iphone 13 Pro",
        placement: 'mobile/category/mobile-phone',
        index: 2,
      },

      {
        imageUrl:
          'https://unboxedkart-india.s3.ap-south-1.amazonaws.com/carousels/mobile/category/mobile-phone/3.webp',
        productCode: 'samsung-galaxy-s21-ultra',
        isExact : true,
        title : "Samsung Galaxy S21 Ultra",
        placement: 'mobile/category/mobile-phone',
        index: 3,
      },

      {
        imageUrl:
          'https://unboxedkart-india.s3.ap-south-1.amazonaws.com/carousels/mobile/category/mobile-phone/4.webp',
        productCode: 'oneplus-10-pro',
        isExact : true,
        title : "Oneplus 10 Pro",
        placement: 'mobile/category/mobile-phone',
        index: 4,
      },

      //category / earphones

      {
        imageUrl:
          'https://unboxedkart-india.s3.ap-south-1.amazonaws.com/carousels/mobile/category/earphones/1.webp',
        productCode: 'apple-airpods-pro',
        placement: 'mobile/category/earphones',
        isExact: true,
        title : "Apple Airpods Pro",
        index: 1,
      },

      {
        imageUrl:
          'https://unboxedkart-india.s3.ap-south-1.amazonaws.com/carousels/mobile/category/earphones/2.webp',
        productCode: 'apple-airpods-max',
        placement: 'mobile/category/earphones',
        isExact: true,
        title : "Apple Airpods Max",
        index: 2,
      },

      {
        imageUrl:
          'https://unboxedkart-india.s3.ap-south-1.amazonaws.com/carousels/mobile/category/earphones/3.webp',
        brandCode: 'apple',
        categoryCode: 'earphones',
        title : "Apple Airpods",
        placement: 'mobile/category/earphones',
        index: 3,
      },
      {
        imageUrl:
          'https://unboxedkart-india.s3.ap-south-1.amazonaws.com/carousels/mobile/category/earphones/4.webp',
        productCode: 'apple-airpods-3',
        title : "Apple Airpods 3",
        placement: 'mobile/category/earphones',
        isExact: true,
        index: 4,
      },
      {
        imageUrl:
          'https://unboxedkart-india.s3.ap-south-1.amazonaws.com/carousels/mobile/category/earphones/5.webp',
        brandCode: 'samsung',
        categoryCode: 'earphones',
        placement: 'mobile/category/earphones',
        index: 5,
      },

      //category/ipads
      {
        imageUrl:
          'https://unboxedkart-india.s3.ap-south-1.amazonaws.com/carousels/mobile/category/tablet/1.webp',
          isExact : true,
        title : "iPad Pro",
        productCode : "apple-ipad-pro",
        placement: 'mobile/category/tablet',
        index: 1,
      },
      {
        imageUrl:
          'https://unboxedkart-india.s3.ap-south-1.amazonaws.com/carousels/mobile/category/tablet/2.webp',
          isExact : true,
        title : "iPad Pro",
        productCode : "apple-ipad-air",
        placement: 'mobile/category/tablet',
        index: 2,
      },
      {
        imageUrl:
          'https://unboxedkart-india.s3.ap-south-1.amazonaws.com/carousels/mobile/category/tablet/3.webp',
         isExact : true,
        title : "iPad Pro",
        productCode : "apple-ipad",
        placement: 'mobile/category/tablet',
        index: 3,
      },

      //category / laptop
      {
        imageUrl:
          'https://unboxedkart-india.s3.ap-south-1.amazonaws.com/carousels/mobile/category/laptop/1.webp',
                 isExact : true,
        title : "MacBook Pro",
        productCode : "apple-macbook-pro",
        placement: 'mobile/category/laptop',
        screenSizeCode: '13-inch',
        index: 1,
      },
      {
        imageUrl:
          'https://unboxedkart-india.s3.ap-south-1.amazonaws.com/carousels/mobile/category/laptop/2.webp',
                isExact : true,
        title : "MacBook Air",
        productCode : "apple-macbook-air",
        placement: 'mobile/category/laptop',
        screenSizeCode: '13-inch',
        processorCode: 'm1',
        index: 2,
      },
      {
        imageUrl:
          'https://unboxedkart-india.s3.ap-south-1.amazonaws.com/carousels/mobile/category/laptop/3.webp',
        categoryCode: 'laptop',
        brandCode: 'apple',
        seriesCode: 'macbook-pro',
        placement: 'mobile/category/laptop',
        screenSizeCode: '13-inch',
        processorCode: 'm1',
        index: 3,
      },

      //category //accessories

      {
        imageUrl:
          'https://unboxedkart-india.s3.ap-south-1.amazonaws.com/carousels/mobile/category/accessories/1.webp',
        productCode: 'apple-magsafe-battery-pack',
        title : "MagSafe Battery Pack",
        placement: 'mobile/category/accessories',
        isExact: true,
        index: 1,
      },
      {
        imageUrl:
          'https://unboxedkart-india.s3.ap-south-1.amazonaws.com/carousels/mobile/category/accessories/2.webp',
        productCode: 'apple-airtag',
        title : "Apple Airtag",
        placement: 'mobile/category/accessories',
        isExact: true,
        index: 2,
      },
      {
        imageUrl:
          'https://unboxedkart-india.s3.ap-south-1.amazonaws.com/carousels/mobile/category/accessories/3.webp',
        brandCode: 'apple',
        categoryCode: 'accessories',
        title : "Macbook Charger",
        seriesCode: 'macbook-charger',
        placement: 'mobile/category/accessories',
        isExact: true,
        index: 3,
      },

      //category //watch
      {
        imageUrl:
          'https://unboxedkart-india.s3.ap-south-1.amazonaws.com/carousels/mobile/category/watch/1.webp',
        productCode: 'apple-watch-series-4',
        placement: 'mobile/category/watch',
        title : "Apple Watch Series 4",
        isExact: true,
        index: 1,
      },
      {
        imageUrl:
          'https://unboxedkart-india.s3.ap-south-1.amazonaws.com/carousels/mobile/category/watch/2.webp',
        brandCode: 'samsung',
        categoryCode: 'watch',
        placement: 'mobile/category/watch',
        title : "Samsung Watch",
        index: 2,
      },
      {
        imageUrl:
          'https://unboxedkart-india.s3.ap-south-1.amazonaws.com/carousels/mobile/category/watch/3.webp',
        productCode: 'apple-watch-series-7',
        placement: 'mobile/category/watch',
        title :"Apple Watch Series 7",
        isExact: true,
        index: 3,
      },

      //condition/unboxed
      {
        imageUrl:
          'https://unboxedkart-india.s3.ap-south-1.amazonaws.com/carousels/mobile/condition/unboxed/1.webp',
        productCode: 'apple-iphone-13-pro',
        title : "iPhone 13 Pro",
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
        title : "Apple Airpods Pro",
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
        title : "MacBook Pro 13 Inch",
        placement: 'mobile/condition/unboxed',
        conditionCode: 'unboxed',
        index: 3,
      },
      {
        imageUrl:
          'https://unboxedkart-india.s3.ap-south-1.amazonaws.com/carousels/mobile/condition/unboxed/4.webp',
        productCode: 'apple-ipad-pro',
        isExact : true,
        title : "iPad Pro",
        placement: 'mobile/condition/unboxed',
        conditionCode: 'unboxed',
        index: 4,
      },
      {
        imageUrl:
          'https://unboxedkart-india.s3.ap-south-1.amazonaws.com/carousels/mobile/category/condition/5.webp',
        productCode: 'apple-watch-series-7',
        title : "Apple Watch Series 7",
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
        title : "iPhone 12 Pro",
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
        title : "Apple Airpods Pro",
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
        title : "MacBook Pro 13 Inch",
        placement: 'mobile/condition/grade-a',
        conditionCode: 'grade-a',
        index: 3,
      },
      {
        imageUrl:
          'https://unboxedkart-india.s3.ap-south-1.amazonaws.com/carousels/mobile/condition/grade-a/4.webp',
        productCode: 'apple-ipad-pro',
        isExact : true,
             title : "iPad Pro",
        placement: 'mobile/condition/grade-a',
        conditionCode : 'grade-a',
        index: 4,
      },
      {
        imageUrl:
          'https://unboxedkart-india.s3.ap-south-1.amazonaws.com/carousels/mobile/condition/grade-a/5.webp',
        isExact : true,
        title : "Apple watch series 7",
        productCode: 'apple-watch-series-7',
        conditionCode: 'grade-a',
        placement: 'mobile/condition/grade-a',
        index: 5,
      },


      //grade -b
      {
        imageUrl:
          'https://unboxedkart-india.s3.ap-south-1.amazonaws.com/carousels/mobile/condition/grade-b/1.webp',
        productCode: 'apple-iphone-12-pro',
        isExact : true,
        placement: 'mobile/condition/grade-b',
        title : "iPhone 12 Pro",
        conditionCode: 'grade-b',
        index: 1,
      },
      {
        imageUrl:
          'https://unboxedkart-india.s3.ap-south-1.amazonaws.com/carousels/mobile/condition/grade-b/2.webp',
        productCode: 'apple-airpods-pro',
        placement: 'mobile/condition/grade-b',
        title : "Apple Airpods Pro",
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
        title : "MacBook Pro 13 Inch",
        placement: 'mobile/condition/grade-b',
        conditionCode: 'grade-b',
        index: 3,
      },
      {
        imageUrl:
          'https://unboxedkart-india.s3.ap-south-1.amazonaws.com/carousels/mobile/condition/grade-b/4.webp',
        productCode: 'apple-ipad-pro',
        isExact : true,
             title : "iPad Pro",
        placement: 'mobile/condition/grade-b',
        conditionCode : 'grade-b',
        index: 4,
      },



      //mobile/home
      {
        imageUrl:
          'https://unboxedkart-india.s3.ap-south-1.amazonaws.com/carousels/mobile/home/1.webp',
        productCode: 'apple-iphone-13-pro',
        title : "iPhone 13 Pro",
        placement: 'mobile/home',
        isExact: true,
        index: 1,
      },
       {
        imageUrl:
          'https://unboxedkart-india.s3.ap-south-1.amazonaws.com/carousels/mobile/home/2.webp',
        categoryCode : "earphones",
        brandCode : "apple",
        title : "Apple Airpods",
        placement: 'mobile/home',
        index: 2,
      },
       {
        imageUrl:
          'https://unboxedkart-india.s3.ap-south-1.amazonaws.com/carousels/mobile/home/3.webp',
        productCode : "apple-macbook-pro",
        isExact : true,
        title : "MacBook Pro",
        placement: 'mobile/home',
        index: 3,
      },
      {
        imageUrl:
          'https://unboxedkart-india.s3.ap-south-1.amazonaws.com/carousels/mobile/home/4.webp',
          brandCode : "apple",
          categoryCode : "watch",
        title : "Apple Watch",
        placement: 'mobile/home',
        index: 4,
      },
       {
        imageUrl:
          'https://unboxedkart-india.s3.ap-south-1.amazonaws.com/carousels/mobile/home/5.webp',
          brandCode : "apple-magsafe-battery-pack",
          isExact : true,
        title : "MagSafe Battery Pack",
        placement: 'mobile/home',
        index: 5,
      },
        {
        imageUrl:
          'https://unboxedkart-india.s3.ap-south-1.amazonaws.com/carousels/mobile/home/6.webp',
          brandCode : "apple-ipad-pro",
          isExact : true,
        title : "iPad Pro",
        placement: 'mobile/home',
        index: 6,
      },
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
