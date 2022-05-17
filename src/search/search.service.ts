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

  // nullValues = [null, 'null', undefined];

  async getNewSearch(
    title: string,
    category: string,
    brand: string,
    condition: string,
    productCode: string,
    sellerCode: string,
    pageNumber: string,
  ) {
    console.log(
      'new search',
      title,
      category,
      brand,
      condition,
      productCode,
      sellerCode,
      pageNumber,
    );
    const products = await this.productModel.find({
      conditionCode:
        condition === undefined || 'null' ? { $ne: null } : condition,
      categoryCode: category === undefined || 'null' ? { $ne: null } : category,
      brandCode: brand === undefined || 'null' ? { $ne: null } : brand,
      productCode:
        productCode === undefined || 'null' ? { $ne: null } : productCode,
      // brandCode : brand
    });
    return products.length;
  }

  async getSearchedProducts(
    title: string,
    category: string,
    brand: string,
    condition: string,
    productCode: string,
    pageNumber: string,
  ) {
    console.log('dd', productCode);
    var itemsToSkip: number = 0;
    if (pageNumber && parseInt(pageNumber) > 0) {
      itemsToSkip = 10 * parseInt(pageNumber) - 10;
    }
    console.log('ss', itemsToSkip);
    if (productCode) {
      console.log('has product code');
      const products = await this._getProductsByProductCode(
        productCode,
        itemsToSkip,
      );
      return products;
    } else if (!title) {
      if (category && brand) {
        const products = await this._getProductsByCategoryAndBrand(
          category,
          brand,
          itemsToSkip,
        );
        return products;
      } else if (category && condition) {
        const products = await this._getProductsByConditionAndCategory(
          condition,
          category,
          itemsToSkip,
        );
        return products;
      } else if (brand && condition) {
        const products = await this._getProductsByBrandAndCondition(
          brand,
          condition,
          itemsToSkip,
        );
        return products;
      }
    } else {
      const products = await this._getProductsByTitle(
        title,
        pageNumber,
        itemsToSkip,
      );
      return products;
    }
  }

  async _getProductsByProductCode(productCode: string, itemsToSkip: number) {
    // var itemsToSkip: number = 0;
    // if (pageNumber && parseInt(pageNumber) > 0) {
    //   itemsToSkip = 10 * parseInt(pageNumber) - 10;
    // }
    console.log('gettin gby products code');
    const products = await this.productModel
      .find({
        productCode: productCode,
      })
      .limit(10)
      .skip(itemsToSkip)
      .exec();
    return products as Product[];
  }

  async _getProductsByTitle(
    title: string,
    pageNumber: string,
    itemsToSkip: number,
  ) {
    var itemsToSkip: number = 0;
    if (pageNumber && parseInt(pageNumber) > 0) {
      itemsToSkip = 10 * parseInt(pageNumber) - 10;
    }
    const searchTerm = title.replace(/\s/g, '');
    const products = await this.productModel
      .find({
        searchCases: searchTerm,
      })
      .limit(10)
      .skip(itemsToSkip)
      .exec();
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

  async _getProductsByCategoryAndBrand(
    category: string,
    brand: string,
    itemsToSkip: number,
  ) {
    const products = await this.productModel
      .find({
        categoryCode: { $eq: category },
        brandCode: { $eq: brand },
      })
      .skip(itemsToSkip)
      .limit(10)
      .skip(itemsToSkip)
      .exec();
    return products as Product[];
  }

  async _getProductsByBrandAndCondition(
    brand: string,
    condition: string,
    itemsToSkip: number,
  ) {
    const products = await this.productModel
      .find({
        brandCode: { $eq: brand },
        conditionCode: { $eq: condition },
      })
      .limit(10)
      .skip(itemsToSkip)
      .exec();
    return products as Product[];
  }

  async _getProductsByConditionAndCategory(
    condition: string,
    category: string,
    itemsToSkip: number,
  ) {
    const products = await this.productModel
      .find({
        categoryCode: { $eq: category },
        conditionCode: { $eq: condition },
      })
      .limit(10)
      .skip(itemsToSkip)
      .exec();
    return products as Product[];
  }
}

// async getSearchedProducts(
//   title: string,
//   category: string,
//   brand: string,
//   condition: string,
//   pageNumber: string,
// ) {
//   if (title in this.nullValues) {
//     if (!(category in this.nullValues) && !(brand in this.nullValues)) {
//       const products = await this._getProductsByCategoryAndBrand(
//         category,
//         brand,
//       );
//       return products;
//     } else if (!(category in this.nullValues) && !(condition in this.nullValues)) {
//       const products = await this._getProductsByConditionAndCategory(
//         condition,
//         category,
//       );
//       return products;
//     }
//   } else {
//     const products = await this._getProductsByTitle(title, pageNumber);
//     return products;
//   }
// }
