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
import { Model } from 'mongoose';
import { ProductData } from 'src/models/product_data.model';
import { ProductImages } from 'src/models/product_images.model';
import { QuestionAndAnswer } from 'src/models/q_and_a.model';
import { Review } from 'src/models/review.model';
import { Product } from '../models/product.model';
import { CreateProductDto } from './dto/add-product.dto';

export class ProductsService {
  constructor(
    @InjectModel('Product') private readonly productModel: Model<Product>,
    @InjectModel('ProductData')
    private readonly productDataModel: Model<ProductData>,
    @InjectModel('ProductImages')
    private readonly productImagesModel: Model<ProductImages>,
    @InjectModel('Review') private readonly reviewModel: Model<Review>, // @InjectModel('ProductSpecs') // private readonly productSpecsModel: Model<Product>, // @InjectModel('QuestionAndAnswer') // private readonly questionAndAnswersModel: Model<QuestionAndAnswer>, // @InjectModel('ProductDetails') private readonly productModel: Model<Product>,
  ) {}

  async insertProduct(entireBody: CreateProductDto) {
    const productData = await this.productDataModel.findOne({
      productCode: entireBody.productCode,
    });
    const imagePath = `https://unboxedkart-india.s3.ap-south-1.amazonaws.com/product/${productData.categoryCode}s/${productData.brandCode}/${productData.modelCode}/${entireBody.colorCode}/`;
    const imageUrl = `https://unboxedkart-india.s3.ap-south-1.amazonaws.com/product/${productData.categoryCode}s/${productData.brandCode}/${productData.modelCode}/${entireBody.colorCode}/${entireBody.productCode}-unboxedkart`;
    const thumbailUrl = `https://unboxedkart-india.s3.ap-south-1.amazonaws.com/product/${productData.categoryCode}s/${productData.brandCode}/${productData.modelCode}/${entireBody.colorCode}/thumbnails/${entireBody.productCode}-unboxedkart`;

    // const productImages = await this.productImagesModel.findOne({
    //   productCode: entireBody.productCode,
    //   colorCode: entireBody.colorCode,
    // });

    const imageUrls = this._handleGetProductImageUrls(
      imageUrl,
      thumbailUrl,
      4,
      // productImages.count,
    );

    const searchCases = this._handleCreateProductSearchCases(
      productData.category,
      productData.brand,
      productData.title,
      entireBody,
    );

    const newTitle = this._handleGenerateNewTitle(
      productData.categoryCode,
      productData.title,
      entireBody.condition,
      entireBody.color,
      entireBody.storage,
      entireBody.ram,
      entireBody.processor,
      entireBody.connectivity,
    );

    const aboutProduct = entireBody.aboutProduct.split('///');

    console.log('about splitting', aboutProduct);

    console.log('new title', newTitle);

    const newProduct = new this.productModel({
      productCode: entireBody.productCode,
      SKU: 'ABCD',
      title: newTitle,
      seriesCode: productData.seriesCode,
      highlights: productData.highlights,
      aboutProduct: aboutProduct,
      modelNumber: productData.modelNumber,
      brand: productData.brandCode,
      brandCode: productData.brandCode,
      category: productData.category,
      categoryCode: productData.categoryCode,
      condition: entireBody.condition,
      conditionCode: entireBody.conditionCode,
      imageUrls: {
        desktopCoverImage: `${imagePath}/desktop-cover.webp`,
        coverImage: `${imagePath}/mobile-cover.webp`,
        images: imageUrls.images,
        thumbnails: imageUrls.thumbnails,
      },
      pricing: {
        price: entireBody.price,
        sellingPrice: entireBody.sellingPrice,
      },
      quantity: entireBody.inventoryCount,
      searchCases: searchCases,
      isBestSeller: entireBody.isBestSeller,
      isFeatured: entireBody.isFeatured,
      isCertified: entireBody.isCertified,
      moreDetails: {
        color: entireBody.color,
        colorCode: entireBody.colorCode,
        storage: entireBody.storage,
        storageCode: entireBody.storageCode,
      },
      warrantyDetails: {
        isUnderWarranty: entireBody.isUnderWarranty,
        // expiryDate: entireBody.warrantyExpiryDate,
        warrantyLeft: entireBody.warrantyLeftInMonths,
        description: entireBody.warrantyDescription,
      },
      boxContains: entireBody.boxContains,
    });
    console.log('new product', newProduct);
    await newProduct.save();
    // return result.id;
  }

  _handleGetAboutProduct(aboutProduct: string) {
    console.log(aboutProduct);
    const aboutList = aboutProduct.split('...');
    console.log('aboutList', aboutList);
  }

  _handleGenerateNewTitle(
    category: string,
    title: string,
    condition: string,
    color: string,
    storage: string,
    ram: string,
    processor: string,
    connectivity: string,
  ) {
    let newTitle = '';
    if (category == 'mobile-phone') {
      newTitle =
        title +
        ' (' +
        condition +
        ', ' +
        color +
        (storage != null ? `, ${storage}` : ``) +
        (ram != null ? `, ${ram}` : ``) +
        ')';
    } else if (category == 'laptop') {
      newTitle =
        title +
        ' (' +
        condition +
        ', ' +
        color +
        (storage != null ? `, ${storage}` : ``) +
        (ram != null ? `, ${ram}` : ``) +
        (processor != null ? `, ${processor}` : ``) +
        ')';
    } else if (category == 'watch') {
      newTitle = title + ' (' + condition + ', ' + connectivity + color + ')';
    } else if (category == 'watch') {
      newTitle = title + ' (' + condition + ', ' + connectivity + color + ')';
    } else {
      newTitle = title + ' (' + condition + ', ' + color + ')';
    }

    return newTitle;
  }

  _handleGetProductImageUrls(
    imageUrl: string,
    thumbnailUrl: string,
    count: number,
  ) {
    const thumbnails = [];
    const images = [];
    for (let n = 1; n <= count; n++) {
      thumbnails.push(`${thumbnailUrl}-${n}.webp`);
      images.push(`${imageUrl}-${n}.webp`);
    }
    return {
      coverImage: `${imageUrl}-.webp`,
      thumbnails: thumbnails,
      images: images,
    };
  }

  _handleCreateProductSearchCases(
    category: string,
    brand: string,
    title: string,
    entireBody: CreateProductDto,
  ) {
    const searchCases = [];

    function addTerm(term: string) {
      searchCases.push(term.toLowerCase().replace(/\s/g, ''));
    }

    addTerm(brand);
    addTerm(category);
    addTerm(entireBody.color);
    entireBody.storage != null ?? addTerm(entireBody.storage);
    entireBody.processor != null ?? addTerm(entireBody.processor);
    entireBody.ram != null ?? addTerm(entireBody.ram);

    for (let i = 1; i <= title.length; i++) {
      addTerm(title.substring(0, i));
    }
    console.log('generated search terms', searchCases);
    return searchCases;
  }

  async updateInventoryCount({
    productId,
    count,
  }: {
    productId: string;
    count: number;
  }) {
    try {
      await this.productModel.findByIdAndUpdate(productId, {
        quantity: count,
      });
    } catch (e) {
      throw new ForbiddenException(
        'cannot update product pricing',
        "the product id doesn't exists",
      );
    }
  }

  async getProducts() {
    const products = await this.productModel.find().exec();
    return products as Product[];
  }

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
        const similarProducts = await this.productModel
          .find({
            brandCode: product.brandCode,
            categoryCode: product.categoryCode,
          })
          .limit(5);
        return similarProducts;
      }
    } else {
      throw new NotFoundException('The searched Product doesnot exists');
    }
  }

  async getRelatedProducts(productId: string) {
    if (productId.match(/^[0-9a-fA-F]{24}$/)) {
      const product = await this.productModel.findById(productId);
      if (product) {
        const relatedProducts = await this.productModel
          .find({
            brandCode: product.brandCode,
          })
          .limit(5);
        return relatedProducts;
      }
    } else {
      throw new NotFoundException('The searched Product doesnot exists');
    }
  }

  async getProduct(id: string) {
    console.log('grtting single product');
    {
      const product = await this.productModel.findById(id);
      if (!product) {
        console.log('not exis');
        throw new NotFoundException('could not find product');
      } else {
        console.log('exos');
        const product = await this.productModel.findById(id);
        return product;
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
