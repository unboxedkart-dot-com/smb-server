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

  async getSearchedProducts(
    title: string,
    category: string,
    brand: string,
    condition: string,
    pageNumber: string,
  ) {
    if (!title) {
      if (category && brand) {
        const products = await this._getProductsByCategoryAndBrand(
          category,
          brand,
        );
        return products;
      } else if (category && condition) {
        const products = await this._getProductsByConditionAndCategory(
          condition,
          category,
        );
        return products;
      } else if (brand && condition) {
        const products = await this._getProductsByBrandAndCondition(
          brand,
          condition,
        );
        return products;
      }
    } else {
      const products = await this._getProductsByTitle(title, pageNumber);
      return products;
    }
  }

  async _getProductsByTitle(title: string, pageNumber: string) {
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

  async _getProductsByCategoryAndBrand(category: string, brand: string) {
    const products = await this.productModel
      .find({
        categoryCode: { $eq: category },
        brandCode: { $eq: brand },
      })
      .exec();
    return products as Product[];
  }

  async _getProductsByBrandAndCondition(brand: string, condition: string) {
    const products = await this.productModel
      .find({
        brandCode: { $eq: brand },
        conditionCode: { $eq: condition },
      })
      .exec();
    return products as Product[];
  }

  async _getProductsByConditionAndCategory(
    condition: string,
    category: string,
  ) {
    const products = await this.productModel
      .find({
        categoryCode: { $eq: category },
        conditionCode: { $eq: condition },
      })
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
