import { NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { QuestionAndAnswer } from 'src/models/q_and_a.model';
import { Review } from 'src/models/review.model';
import { Product } from '../models/product.model';

export class ProductsService {
  constructor(
    @InjectModel('Product') private readonly productModel: Model<Product>,
    @InjectModel('Review') private readonly reviewModel: Model<Review>,
    @InjectModel('QuestionAndAnswer')
    private readonly questionAndAnswersModel: Model<QuestionAndAnswer>, // @InjectModel('ProductDetails') private readonly productModel: Model<Product>,
  ) {}

  async insertProduct(product: Product) {
    const newProduct = new this.productModel(product);
    const result = await newProduct.save();
    return result.id;
  }

  async getProducts() {
    const products = await this.productModel.find().exec();
    return products as Product[];
  }

  async getProduct(id: string) {
    if (id.match(/^[0-9a-fA-F]{24}$/)) {
      const product = await this.productModel.findById(id);
      if (!product) {
        throw new NotFoundException('could not find product');
      }
      const productQuestionAndAnswers = await this.questionAndAnswersModel.find(
        {
          productId: id,
          // 'questionDetails.isApproved': true,
        },
      );
      const productReviews = await this.reviewModel
        .find({
          productId: id,
        })
        .limit(10);
      const reviewsData = await this.reviewModel.find({ productId: id });
      return {
        product: product,
        productReviews: productReviews,
        reviewsData: reviewsData,
        productQAndA: productQuestionAndAnswers,
      };
      // return product;
    } else {
      throw new NotFoundException('could not find product');
    }
  }

  async deleteProducts() {
    await this.productModel.deleteMany({});
  }

  async deleteSingleProduct(id: string) {
    await this.productModel.deleteOne({ id: id });
  }

  async getBestSellers(brand: string, category: string, condition: string) {
    if (brand) {
      return this.getBestSellerByBrand(brand);
    } else if (category) {
      return this.getBestSellersByCategory(category);
    } else if (condition) {
      return this.getBestSellersByCondition(condition);
    } else {
      return this.getAllBestSellers();
    }
  }

  async getFeaturedProducts(
    brand: string,
    category: string,
    condition: string,
  ) {
    if (brand) {
      return this.getFeaturedProductsByBrand(brand);
    } else if (category) {
      return this.getFeaturedProductsByCategory(category);
    } else if (condition) {
      return this.getFeaturedProductsByCondition(condition);
    } else {
      return this.getAllFeaturedProducts();
    }
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
      .find({
        isFeatured: { $eq: true },
        brandCode: { $eq: brand },
      })
      .limit(10)
      .exec();
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

// {
//   title: { $gte: title },
//   condition: { $eq: condition },
// }

// var queryParams: any = { isFeatured: { $eq: true } };
// if (brand) {
//   queryParams = { isFeatured: { $eq: true }, brand: { $eq: brand } };
// } else if (category) {
//   queryParams = { isFeatured: { $eq: true }, category: { $eq: category } };
// } else if (condition) {
//   queryParams = {
//     isFeatured: { $eq: true },
//     condition: { $eq: condition },
//   };
// }
// const products = await this.productModel.find(queryParams).exec();
// return products;
