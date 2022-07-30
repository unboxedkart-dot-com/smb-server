import {
  BadRequestException,
  Catch,
  ForbiddenException,
  HttpException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Mode } from 'fs';
import mongoose from 'mongoose';
import { Model } from 'mongoose';
import { ProductData } from 'src/models/product_data.model';
import { ProductImages } from 'src/models/product_images.model';
import { QuestionAndAnswer } from 'src/models/q_and_a.model';
import { Review } from 'src/models/review.model';
import { Product } from '../models/product.model';

export class ProductsService {
  constructor(
    @InjectModel('Product') private readonly productModel: Model<Product>,
    @InjectModel('ProductData')
    private readonly productDataModel: Model<ProductData>,
    @InjectModel('ProductImages')
    private readonly productImagesModel: Model<ProductImages>,
    @InjectModel('Review') private readonly reviewModel: Model<Review>, // @InjectModel('ProductSpecs') // private readonly productSpecsModel: Model<Product>, // @InjectModel('QuestionAndAnswer') // private readonly questionAndAnswersModel: Model<QuestionAndAnswer>, // @InjectModel('ProductDetails') private readonly productModel: Model<Product>,
  ) {}

  async getSelectedVariant(
    product: string,
    condition: string,
    storage: string,
    color: string,
    processor: string,
    ram: string,
    combination: String,
    screenSize: string,
  ) {
    console.log(
      'selected variant details',
      product,
      condition,
      storage,
      color,
      processor,
      ram,
      combination,
      screenSize,
    );
    const query = {
      productCode: product,
      conditionCode:
        condition != undefined && condition != 'null'
          ? { $eq: condition }
          : { $exists: true },
      'moreDetails.storageCode':
        storage != undefined && storage != 'null'
          ? { $eq: storage }
          : { $exists: true },
      'moreDetails.colorCode':
        color != undefined && color != 'null'
          ? { $eq: color }
          : { $exists: true },
      'moreDetails.processorCode':
        processor != undefined && processor != 'null'
          ? { $eq: processor }
          : { $exists: true },
      'moreDetails.ramCode':
        ram != undefined && ram != 'null' ? { $eq: ram } : { $exists: true },
      'moreDetails.combinationCode':
        combination != undefined && combination != 'null'
          ? { $eq: combination }
          : { $exists: true },
      'moreDetails.screenSizeCode':
        screenSize != undefined && screenSize != 'null'
          ? { $eq: screenSize }
          : { $exists: true },
    };

    console.log('variant query', query);
    // const selectedProduct = this.productModel.find(query);
    const selectedProduct = await this.productModel.findOne(query);
    if (selectedProduct) {
      return selectedProduct._id;
    }
    return null;

    // console.log('selected storage code', storageCode);
    // const product = await this.productModel.find({
    //   productCode: productCode,
    //   'moreDetails.colorCode': colorCode,
    //   conditionCode: conditionCode,

    //   'moreDetails.storageCode':
    //     storageCode === undefined || 'null' ? { $ne: null } : storageCode,
    //   'moreDetails.processorCode':
    //     processorCode === undefined || 'null' ? { $ne: null } : processorCode,
    //   'moreDetails.ramCode':
    //     ramCode === undefined || 'null' ? { $ne: null } : { $eq: ramCode },
    // });
    // if (product != null) {
    //   return product._id.toString();
    // } else {
    //   return null;
    // }
    // return product.length;
  }

  async getSimilarProducts(productId: string) {
    if (productId.match(/^[0-9a-fA-F]{24}$/)) {
      const product = await this.productModel.findById(productId);
      if (product) {
        const products = await this.productModel
          .aggregate([
            {
              $match: {
                brandCode: product.brandCode,
                categoryCode: product.categoryCode,
              },
            },
            {
              $lookup: {
                from: 'reviewsdatas',
                localField: 'productCode',
                foreignField: 'productCode',
                as: 'rating',
              },
            },
          ])
          .limit(10)
          .exec();
        // const similarProducts = await this.productModel
        //   .find({
        //     brandCode: product.brandCode,
        //     categoryCode: product.categoryCode,
        //   })
        //   .limit(5);
        return products as Product[];
      }
    } else {
      throw new NotFoundException('The searched Product doesnot exists');
    }
  }

  async getRelatedProducts(productId: string) {
    if (productId.match(/^[0-9a-fA-F]{24}$/)) {
      const product = await this.productModel.findById(productId);
      if (product) {
        const products = await this.productModel
          .aggregate([
            {
              $match: {
                brandCode: product.brandCode,
                categoryCode: product.categoryCode,
              },
            },
            {
              $lookup: {
                from: 'reviewsdatas',
                localField: 'productCode',
                foreignField: 'productCode',
                as: 'rating',
              },
            },
          ])
          .limit(10)
          .exec();
        // const relatedProducts = await this.productModel
        //   .find({
        //     brandCode: product.brandCode,
        //   })
        //   .limit(5);
        // return relatedProducts;
        return products as Product[];
      }
    } else {
      throw new NotFoundException('The searched Product doesnot exists');
    }
  }

  async getProduct(id: string) {
    const ObjectId = mongoose.Types.ObjectId;
    // console.log('grtting single product', id);
    {
      const product = await this.productModel.findById(id);
      if (!product) {
        console.log('not exis');
        throw new NotFoundException('could not find product');
      } else {
        console.log('exos');
        // const product = await this.productModel.findById(id);
        const product = await this.productModel
          .aggregate([
            {
              $match: { _id: new ObjectId(id) },
            },
            {
              $lookup: {
                from: 'reviewsdatas',
                localField: 'productCode',
                foreignField: 'productCode',
                as: 'rating',
              },
            },
          ])
          .limit(1);
        return product[0];
      }
      // try {

      // } catch (e) {
      //   throw new HttpException('something went wrong', 500);
      // }
      // const productQuestionAndAnswers = await this.questionAndAnswersModel
      //   .find({
      //     productId: id,
      //     // 'questionDetails.isApproved': true,
      //   })
      //   .limit(5);
      // const productReviews = await this.reviewModel
      //   .find({
      //     productId: id,
      //   })
      //   .limit(5);
      // const reviewsData = await this.reviewModel.find({ productId: id });
      // const response = await this.productSpecsModel.findOne(
      //   {
      //     productId: '123',
      //   },
      //   { _id: 0, productSpecs: 1 },
      // );
      // const productSpecs = response['productSpecs'];
      // return product;
      // {
      // product: product,
      // productSpecs: productSpecs,
      // productReviews: productReviews,
      // reviewsData: reviewsData,
      // productQAndA: productQuestionAndAnswers,
      // };
      // return product;
      // } else {
      //   throw new NotFoundException('could not find product');
    }
  }

  async getBestSellers(brand: string, category: string, condition: string) {
    let query = {};
    if (brand) {
      query = {
        brandCode:
          brand != undefined && brand != 'null'
            ? { $eq: brand }
            : { $exists: true },
        isFeatured: true,
      };
      // return this.getFeaturedProductsByBrand(brand);
    } else if (category) {
      query = {
        categoryCode:
          category != undefined && category != 'null'
            ? { $eq: category }
            : { $exists: true },

        isFeatured: true,
      };
      // return this.getFeaturedProductsByCategory(category);
    } else if (condition) {
      // return this.getFeaturedProductsByCondition(condition);
      query = {
        conditionCode:
          condition != undefined && condition != 'null'
            ? { $eq: condition }
            : { $exists: true },
        isFeatured: true,
      };
    } else {
      query = {
        conditionCode:
          condition != undefined && condition != 'null'
            ? { $eq: condition }
            : { $exists: true },
        isFeatured: true,
      };
    }
    const products = await this.productModel
      .aggregate([
        {
          $match: query,
        },
        {
          $lookup: {
            from: 'reviewsdatas',
            localField: 'productCode',
            foreignField: 'productCode',
            as: 'rating',
          },
        },
      ])
      .limit(10)
      .exec();
    return products;
  }

  async getFeaturedProducts(
    brand: string,
    category: string,
    condition: string,
  ) {
    let query = {};
    if (brand) {
      query = {
        brandCode:
          brand != undefined && brand != 'null'
            ? { $eq: brand }
            : { $exists: true },
        isFeatured: true,
      };
      // return this.getFeaturedProductsByBrand(brand);
    } else if (category) {
      query = {
        categoryCode:
          category != undefined && category != 'null'
            ? { $eq: category }
            : { $exists: true },

        isFeatured: true,
      };
      // return this.getFeaturedProductsByCategory(category);
    } else if (condition) {
      // return this.getFeaturedProductsByCondition(condition);
      query = {
        conditionCode:
          condition != undefined && condition != 'null'
            ? { $eq: condition }
            : { $exists: true },
        isFeatured: true,
      };
    } else {
      query = {
        conditionCode:
          condition != undefined && condition != 'null'
            ? { $eq: condition }
            : { $exists: true },
        isFeatured: true,
      };
    }
    const products = await this.productModel
      .aggregate([
        {
          $match: query,
        },
        {
          $lookup: {
            from: 'reviewsdatas',
            localField: 'productCode',
            foreignField: 'productCode',
            as: 'rating',
          },
        },
      ])
      .limit(10)
      .exec();
    return products;
  }

  async getAllBestSellers() {
    const products = await this.productModel
      .find({
        isBestSeller: { $eq: true },
      })
      .limit(10)
      .exec();
    return products as Product[];
  }

  async getBestSellerByBrand(brand: string) {
    const products = await this.productModel
      .find({
        isBestSeller: { $eq: true },
        brandCode: { $eq: brand },
      })
      .limit(10)
      .exec();
    return products as Product[];
  }

  async getBestSellersByCategory(category: string) {
    const products = await this.productModel
      .find({
        isBestSeller: { $eq: true },
        categoryCode: { $eq: category },
      })
      .limit(10)
      .exec();
    return products as Product[];
  }

  async getBestSellersByCondition(condition: string) {
    const products = await this.productModel
      .find({
        isBestSeller: { $eq: true },
        conditionCode: { $eq: condition },
      })
      .limit(10)
      .exec();
    return products as Product[];
  }

  async getFeaturedProductsByBrand(brand: string) {
    const products = await this.productModel
      .aggregate([
        {
          $match: {
            isFeatured: { $eq: true },
            brandCode: { $eq: brand },
          },
        },
        {
          $lookup: {
            from: 'reviewsdatas',
            localField: 'productCode',
            foreignField: 'productCode',
            as: 'rating',
          },
        },
      ])
      .limit(10)
      // .skip(itemsToSkip)
      .exec();
    // const products = await this.productModel
    //   .find({
    //     isFeatured: { $eq: true },
    //     brandCode: { $eq: brand },
    //   })
    //   .limit(10)
    //   .exec();
    return products as Product[];
  }

  async getFeaturedProductsByCategory(category: string) {
    const products = await this.productModel
      .find({
        isFeatured: { $eq: true },
        categoryCode: { $eq: category },
      })
      .limit(10)
      .exec();
    return products as Product[];
  }

  async getFeaturedProductsByCondition(condition: string) {
    const products = await this.productModel
      .find({
        isFeatured: { $eq: true },
        conditionCode: { $eq: condition },
      })
      .limit(10)
      .exec();
    return products as Product[];
  }

  async getAllFeaturedProducts() {
    const products = await this.productModel
      .find({
        isFeatured: { $eq: true },
      })
      .limit(10)
      .exec();
    return products as Product[];
  }

}
