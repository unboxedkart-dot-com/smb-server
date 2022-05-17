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

  async insertAllProdcts() {
    await this.productModel.insertMany([
      {
        imageUrls: {
          coverImage:
            'https://unboxedkart-india.s3.ap-south-1.amazonaws.com/product/mobile-phone/apple/iphone-x/spacegrey/apple-iphone-x-space-grey-unboxedkart-01.webp',
          images: [
            'https://unboxedkart-india.s3.ap-south-1.amazonaws.com/product/mobile-phone/apple/iphone-x/spacegrey/apple-iphone-x-space-grey-unboxedkart-01.webp',
            'https://unboxedkart-india.s3.ap-south-1.amazonaws.com/product/mobile-phone/apple/iphone-x/spacegrey/apple-iphone-x-space-grey-unboxedkart-02.webp',
            'https://unboxedkart-india.s3.ap-south-1.amazonaws.com/product/mobile-phone/apple/iphone-x/spacegrey/apple-iphone-x-space-grey-unboxedkart-03.webp',
            'https://unboxedkart-india.s3.ap-south-1.amazonaws.com/product/mobile-phone/apple/iphone-x/spacegrey/apple-iphone-x-space-grey-unboxedkart-04.webp',
          ],
        },
        productCode: 'apple-iphone-x',
        pricing: {
          price: 58000,
          sellingPrice: 22000,
        },
        moreDetails: {
          color: 'Space grey',
          colorCode: 'space-grey',
          storage: '64 GB',
          storageCode: '64-gb',
        },
        SKU: '1234567',
        title: 'Apple iPhone X (64 GB, Space grey, Grade A)',
        modelNumber: 'AMPXSM',
        brand: 'Apple',
        brandCode: 'apple',
        category: 'Mobile Phone',
        categoryCode: 'mobile-phone',
        condition: 'Grade - A',
        conditionCode: 'grade-a',
        quantity: 3,
        highlights: [
          '256 GB ROM',
          '14.73 cm (5.8 inch) Super Retina HD Display',
          '12MP + 12MP | 7MP Front Camera',
          'A11 Bionic Chip with 64-bit Architecture, Neural Engine, Embedded M11 Motion Coprocessor Processor',
        ],
        searchCases: [
          'ap',
          'app',
          'appl',
          'appe',
          'apple',
          'appleiphonex',
          'i',
          'ip',
          'iph',
          'ipho',
          'iphon',
          'iphone',
          'iphonex',
          'iphonexsmax',
          'iphonegold',
          'iphonexs',
          'iphonexsmaxgold256',
          'iphonemax',
        ],
      },
      {
        imageUrls: {
          coverImage:
            'https://unboxedkart-india.s3.ap-south-1.amazonaws.com/product/mobile-phone/apple/iphone-x/spacegrey/apple-iphone-x-space-grey-unboxedkart-01.webp',
          images: [
            'https://unboxedkart-india.s3.ap-south-1.amazonaws.com/product/mobile-phone/apple/iphone-x/spacegrey/apple-iphone-x-space-grey-unboxedkart-01.webp',
            'https://unboxedkart-india.s3.ap-south-1.amazonaws.com/product/mobile-phone/apple/iphone-x/spacegrey/apple-iphone-x-space-grey-unboxedkart-02.webp',
            'https://unboxedkart-india.s3.ap-south-1.amazonaws.com/product/mobile-phone/apple/iphone-x/spacegrey/apple-iphone-x-space-grey-unboxedkart-03.webp',
            'https://unboxedkart-india.s3.ap-south-1.amazonaws.com/product/mobile-phone/apple/iphone-x/spacegrey/apple-iphone-x-space-grey-unboxedkart-04.webp',
          ],
        },
        productCode: 'apple-iphone-x',
        pricing: {
          price: 65000,
          sellingPrice: 25000,
        },
        moreDetails: {
          color: 'Space grey',
          colorCode: 'space-grey',
          storage: '256 GB',
          storageCode: '256-gb',
        },
        SKU: '1234567',
        title: 'Apple iPhone X (256 GB, Space grey, Grade A)',
        modelNumber: 'AMPXSM',
        brand: 'Apple',
        brandCode: 'apple',
        category: 'Mobile Phone',
        categoryCode: 'mobile-phone',
        condition: 'Grade - A',
        conditionCode: 'grade-a',
        quantity: 3,
        highlights: [
          '256 GB ROM',
          '14.73 cm (5.8 inch) Super Retina HD Display',
          '12MP + 12MP | 7MP Front Camera',
          'A11 Bionic Chip with 64-bit Architecture, Neural Engine, Embedded M11 Motion Coprocessor Processor',
        ],
        searchCases: [
          'ap',
          'app',
          'appl',
          'appe',
          'apple',
          'appleiphonex',
          'i',
          'ip',
          'iph',
          'ipho',
          'iphon',
          'iphone',
          'iphonex',
          'iphonexsmax',
          'iphonegold',
          'iphonexs',
          'iphonexsmaxgold256',
          'iphonemax',
        ],
      },
      {
        imageUrls: {
          coverImage:
            'https://unboxedkart-india.s3.ap-south-1.amazonaws.com/product/mobile-phone/apple/iphone-x/spacegrey/apple-iphone-x-space-grey-unboxedkart-01.webp',
          images: [
            'https://unboxedkart-india.s3.ap-south-1.amazonaws.com/product/mobile-phone/apple/iphone-x/spacegrey/apple-iphone-x-space-grey-unboxedkart-01.webp',
            'https://unboxedkart-india.s3.ap-south-1.amazonaws.com/product/mobile-phone/apple/iphone-x/spacegrey/apple-iphone-x-space-grey-unboxedkart-02.webp',
            'https://unboxedkart-india.s3.ap-south-1.amazonaws.com/product/mobile-phone/apple/iphone-x/spacegrey/apple-iphone-x-space-grey-unboxedkart-03.webp',
            'https://unboxedkart-india.s3.ap-south-1.amazonaws.com/product/mobile-phone/apple/iphone-x/spacegrey/apple-iphone-x-space-grey-unboxedkart-04.webp',
          ],
        },
        productCode: 'apple-iphone-x',
        pricing: {
          price: 58000,
          sellingPrice: 20000,
        },
        moreDetails: {
          color: 'Space grey',
          colorCode: 'space-grey',
          storage: '64 GB',
          storageCode: '64-gb',
        },
        SKU: '1234567',
        title: 'Apple iPhone X (64 GB, Space grey, Grade C)',
        modelNumber: 'AMPXSM',
        brand: 'Apple',
        brandCode: 'apple',
        category: 'Mobile Phone',
        categoryCode: 'mobile-phone',
        condition: 'Grade - C',
        conditionCode: 'grade-c',
        quantity: 3,
        highlights: [
          '256 GB ROM',
          '14.73 cm (5.8 inch) Super Retina HD Display',
          '12MP + 12MP | 7MP Front Camera',
          'A11 Bionic Chip with 64-bit Architecture, Neural Engine, Embedded M11 Motion Coprocessor Processor',
        ],
        searchCases: [
          'ap',
          'app',
          'appl',
          'appe',
          'apple',
          'appleiphonex',
          'i',
          'ip',
          'iph',
          'ipho',
          'iphon',
          'iphone',
          'iphonex',
          'iphonexsmax',
          'iphonegold',
          'iphonexs',
          'iphonexsmaxgold256',
          'iphonemax',
        ],
      },
      {
        imageUrls: {
          coverImage:
            'https://unboxedkart-india.s3.ap-south-1.amazonaws.com/product/mobile-phone/apple/iphone-x/spacegrey/apple-iphone-x-space-grey-unboxedkart-01.webp',
          images: [
            'https://unboxedkart-india.s3.ap-south-1.amazonaws.com/product/mobile-phone/apple/iphone-x/spacegrey/apple-iphone-x-space-grey-unboxedkart-01.webp',
            'https://unboxedkart-india.s3.ap-south-1.amazonaws.com/product/mobile-phone/apple/iphone-x/spacegrey/apple-iphone-x-space-grey-unboxedkart-02.webp',
            'https://unboxedkart-india.s3.ap-south-1.amazonaws.com/product/mobile-phone/apple/iphone-x/spacegrey/apple-iphone-x-space-grey-unboxedkart-03.webp',
            'https://unboxedkart-india.s3.ap-south-1.amazonaws.com/product/mobile-phone/apple/iphone-x/spacegrey/apple-iphone-x-space-grey-unboxedkart-04.webp',
          ],
        },
        productCode: 'apple-iphone-x',
        pricing: {
          price: 58000,
          sellingPrice: 22000,
        },
        moreDetails: {
          color: 'Silver',
          colorCode: 'silver',
          storage: '64 GB',
          storageCode: '64-gb',
        },
        SKU: '1234567',
        title: 'Apple iPhone X (64 GB, Silver, Grade A)',
        modelNumber: 'AMPXSM',
        brand: 'Apple',
        brandCode: 'apple',
        category: 'Mobile Phone',
        categoryCode: 'mobile-phone',
        condition: 'Grade - A',
        conditionCode: 'grade-a',
        quantity: 3,
        highlights: [
          '256 GB ROM',
          '14.73 cm (5.8 inch) Super Retina HD Display',
          '12MP + 12MP | 7MP Front Camera',
          'A11 Bionic Chip with 64-bit Architecture, Neural Engine, Embedded M11 Motion Coprocessor Processor',
        ],
        searchCases: [
          'ap',
          'app',
          'appl',
          'appe',
          'apple',
          'appleiphonex',
          'i',
          'ip',
          'iph',
          'ipho',
          'iphon',
          'iphone',
          'iphonex',
          'iphonexsmax',
          'iphonegold',
          'iphonexs',
          'iphonexsmaxgold256',
          'iphonemax',
        ],
      },
    ]);
    // const products = [];
    // products.push(new this.productModel({}));
  }

  async insertProduct(entireBody: CreateProductDto) {
    const productData = await this.productDataModel.findOne({
      productCode: entireBody.productCode,
    });
    const imageUrl = `https://unboxedkart-india.s3.ap-south-1.amazonaws.com/product/${productData.categoryCode}/${productData.brandCode}/${productData.modelCode}/${entireBody.colorCode}/${entireBody.productCode}-unboxedkart`;

    const thumbailUrl = `https://unboxedkart-india.s3.ap-south-1.amazonaws.com/product/${productData.categoryCode}/${productData.brandCode}/${productData.modelCode}/${entireBody.colorCode}/thumbnails/${entireBody.productCode}-unboxedkart`;

    const productImages = await this.productImagesModel.findOne({
      productCode: entireBody.productCode,
      colorCode: entireBody.colorCode,
    });

    const imageUrls = this._handleGetProductImageUrls(
      imageUrl,
      thumbailUrl,
      productImages.count,
    );

    const searchCases = this._handleCreateProductSearchCases(
      productData.category,
      productData.brand,
      productData.title,
      entireBody,
    );

    const newTitle = this._handleGenerateNewTitle(
      productData.title,
      entireBody.condition,
      entireBody.color,
      entireBody.storage,
      entireBody.ram,
      entireBody.processor,
    );

    const aboutProduct = entireBody.aboutProduct.split('...');

    console.log('new title', newTitle);

    const newProduct = new this.productModel({
      productCode: entireBody.productCode,
      SKU: 'ABCD',
      title: newTitle,
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
        coverImage: imageUrls.coverImage,
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
      moreDetails: {
        color: entireBody.color,
        colorCode: entireBody.colorCode,
        storage: entireBody.storage,
        storageCode: entireBody.storageCode,
      },
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
    title: string,
    condition: string,
    color: string,
    storage: string,
    ram: string,
    processor: string,
  ) {
    let newTitle =
      title +
      ' (' +
      condition +
      ', ' +
      color +
      (storage != null ? `, ${storage}` : ``) +
      (ram != null ? `, ${ram}` : ``) +
      (processor != null ? `, ${processor}` : ``) +
      ')';
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
      thumbnails.push(`${thumbnailUrl}-1`);
      images.push(`${imageUrl}-1.webp`);
    }
    return {
      coverImage: `${imageUrl}-1.webp`,
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
    productCode: string,
    conditionCode: string,
    storageCode: string,
    colorCode: string,
    processorCode: string,
    ramCode: string,
  ) {
    console.log('selected storage code', storageCode);
    const product = await this.productModel.find({
      productCode: productCode,
      'moreDetails.colorCode': colorCode,
      conditionCode: conditionCode,

      'moreDetails.storageCode':
        storageCode === undefined || 'null' ? { $ne: null } : storageCode,
      'moreDetails.processorCode':
        processorCode === undefined || 'null' ? { $ne: null } : processorCode,
      'moreDetails.ramCode':
        ramCode === undefined || 'null' ? { $ne: null } : { $eq: ramCode },
    });
    // if (product != null) {
    //   return product._id.toString();
    // } else {
    //   return null;
    // }
    return product.length;
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

// {
// 	"coverImage": "https://unboxedkart-india.s3.ap-south-1.amazonaws.com/product/mobile-phone/apple/iphone-x/spacegrey/apple-iphone-x-space-grey-unboxedkart-01.webp",
// 		"images": [
// 			"https://unboxedkart-india.s3.ap-south-1.amazonaws.com/product/mobile-phone/apple/iphone-x/spacegrey/apple-iphone-x-space-grey-unboxedkart-01.webp",
// 			"https://unboxedkart-india.s3.ap-south-1.amazonaws.com/product/mobile-phone/apple/iphone-x/spacegrey/apple-iphone-x-space-grey-unboxedkart-02.webp",
// 			"https://unboxedkart-india.s3.ap-south-1.amazonaws.com/product/mobile-phone/apple/iphone-x/spacegrey/apple-iphone-x-space-grey-unboxedkart-03.webp",
// 			"https://unboxedkart-india.s3.ap-south-1.amazonaws.com/product/mobile-phone/apple/iphone-x/spacegrey/apple-iphone-x-space-grey-unboxedkart-04.webp"
// 		],
// 	"productCode" : "apple-iphone-x",
// 	"price": 46000,
// 		"sellingPrice": 20000,
// 		"color": "Space grey",
// 		"colorCode": "space-grey",
// 		"storage": "64 GB",
// 		"storageCode": "64gb",
// 	"SKU": "1234567",
// 	"title": "Apple iPhone X (64 GB, Space grey, Grade A)",
// 	"modelNumber": "AMPXSM",
// 	"brand": "Apple",
// 	"brandCode": "apple",
// 	"category": "Mobile Phone",
// 	"categoryCode": "mobile-phone",
// 	"condition": "Grade - A",
// 	"conditionCode": "grade-a",
// 	"quantity": 3,
// 	"searchCases": [
// 		"a",
// 		"ap",
// 		"app",
// 		"appl",
// 		"appe",
// 		"apple",
// 		"appleiphonex",
// 		"i",
// 		"ip",
// 		"iph",
// 		"ipho",
// 		"iphon",
// 		"iphone",
// 		"iphonex",
// 		"iphonexsmax",
// 		"iphonegold",
// 		"iphonexs",
// 		"iphonexsmaxgold256",
// 		"iphonemax"
// 	],
// 	"isBestSeller": true,
// 	"isFeatured": true
// }
