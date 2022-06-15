import { InjectModel } from '@nestjs/mongoose';
import { Mode } from 'fs';
import { Model } from 'mongoose';
import { Product } from 'src/models/product.model';
import { SearchTerm } from 'src/models/search_term';
import { User } from 'src/models/user.model';

export class SearchService {
  constructor(
    @InjectModel('Product') private readonly productModel: Model<Product>,
    @InjectModel('User') private readonly userModel: Model<User>,
    @InjectModel('SearchTerm')
    private readonly searchTermModel: Model<SearchTerm>,
  ) {}

  async getNewSearch(
    isExact: boolean,
    title: string,
    category: string,
    brand: string,
    condition: string,
    product: string,
    seller: string,
    pageNumber: string,
  ) {
    var itemsToSkip: number = 0;
    if (pageNumber && parseInt(pageNumber) > 0) {
      itemsToSkip = 10 * parseInt(pageNumber) - 10;
    }
    console.log('item to skip', itemsToSkip);
    console.log(
      'new search',
      isExact,
      title,
      category,
      brand,
      condition,
      product,
      seller,
      pageNumber,
    );
    // const productExp = new RegExp(`${product}`);
    // const queryWithProductCode = {
    //   productCode: productExp,
    // };
    // console.log('product query', queryWithProductCode);
    let query = {};
    if (title != undefined && title != null && title != 'null') {
      console.log('title', title);
      const searchTerm = title.replace(/\s/g, '');
      const titleExp = new RegExp(`${searchTerm}`);
      console.log('title expression', searchTerm, titleExp);
      query = {
        searchCases: {
          $in: [searchTerm, titleExp],
        },
      };
    } else {
      // const productExp = new RegExp(`${product}`);
      const productExp = new RegExp('apple-iphone');
      // new RegExp(`${searchTerm}`);
      query = {
        conditionCode:
          condition != undefined && condition != 'null'
            ? { $eq: condition }
            : { $exists: true },
        categoryCode:
          category != undefined && category != 'null'
            ? { $eq: category }
            : { $exists: true },
        brandCode:
          brand != undefined && brand != 'null'
            ? { $eq: brand }
            : { $exists: true },
        productCode:
          product != undefined && product != 'null'
            ? // ? { $or: [{ $eq: product }, { $eq: productExp }] }
              { $eq: productExp }
            : { $exists: true },
      };
    }
    console.log('my query', query);
    const searchTerm = title.replace(/\s/g, '');
    const titleExp = new RegExp(`${searchTerm}`);
    // const products = await this.productModel.find(query);
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
        // { '$limit': itemsToSkip + 10 },
        { '$skip': itemsToSkip },
      ])
      .limit(10)
      // .skip(itemsToSkip)
      .exec();
    console.log('joined product', products.length);
    return products as Product[];
  }

  async getRecentSearches(userId) {
    const recentSearches = await this.userModel
      .findById(userId, {
        recentSearches: 1,
        _id: 0,
        length: 3,
      })
      .limit(3);
    return recentSearches.recentSearches;
  }

  async addRecentSearchTerm(userId: string, searchTerm: string) {
    const recentSearches = await this.userModel.findByIdAndUpdate(userId, {
      $push: {
        recentSearches: {
          searchTerm: searchTerm,
        },
      },
    });
    console.log('rs', searchTerm);
  }

  async addPopularSearchTerm(userId: string, searchTerm: string) {
    const newSearchTerm = new this.searchTermModel({
      searchTerm: searchTerm,
      isPopular: true,
      userId: userId,
    });
    newSearchTerm.save();
  }

  async getPopularSearches() {
    const popularSearches = await this.searchTermModel
      .find({ isPopular: true })
      .limit(3);
    return popularSearches;
  }
}
