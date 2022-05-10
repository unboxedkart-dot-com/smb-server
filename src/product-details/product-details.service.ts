import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose/dist/common/mongoose.decorators';
import { Product } from 'src/models/product.model';
import { Model } from 'mongoose';
import { ProductSpecs } from 'src/models/product-specs';
import { ProductDescription } from 'src/models/product-description';
import { AddProductSpecsDto } from './dto/add-product-specs.dto';
import { AddProductDescriptionDto } from './dto/add-product-description.dto';
import { AddProductDataDto } from './dto/add-product-data.dto';
import { ProductData } from 'src/models/product_data.model';
import { AddProductImagesDto } from './dto/add-product-images.dto';
import { ProductImages } from 'src/models/product_images.model';

@Injectable()
export class ProductDetailsService {
  constructor(
    @InjectModel('Product') private readonly productModel: Model<Product>,
    @InjectModel('ProductSpecs')
    private readonly productSpecsModel: Model<ProductSpecs>,
    @InjectModel('ProductData')
    private readonly productDataModel: Model<ProductData>,
    @InjectModel('ProductImages')
    private readonly productImagesModel: Model<ProductImages>,
    @InjectModel('ProductDescription')
    private readonly productDescriptionModel: Model<ProductDescription>, // @InjectModel('ProductDetails') private readonly productModel: Model<Product>,
  ) {}

  async getProductSpecs(productId: string) {
    if (productId.match(/^[0-9a-fA-F]{24}$/)) {
      const product = await this.productModel.findById(productId);
      if (!product) {
        throw new NotFoundException('could not find the product');
      } else {
        const productSpecs = await this.productSpecsModel.findOne(
          {
            productCode: product.productCode,
          },
          { _id: 0, productSpecs: 1 },
        );
        return productSpecs.productSpecs;
        // return product;
      }
    } else {
      throw new NotFoundException('product id is not valid');
    }
  }

  async getProductDescription(productId: string) {
    if (productId.match(/^[0-9a-fA-F]{24}$/)) {
      const product = await this.productDescriptionModel.findById(productId);
      const productDetails = await this.productDescriptionModel.findOne(
        {
          productCode: product.productCode,
        },
        { _id: 0, productSpecs: 1 },
      );
      return productDetails.productDescription;
    } else {
      throw new NotFoundException('product id is not valid');
    }
  }

  async addProductSpecs(entireBody: AddProductSpecsDto) {
    const newProductSpecs = new this.productSpecsModel({
      productCode: entireBody.productCode,
      productSpecs: entireBody.productSpecs,
    });
    newProductSpecs.save();
  }

  async addProductDescription(entireBody: AddProductDescriptionDto) {
    const newProductSpecs = new this.productSpecsModel({
      productCode: entireBody.productCode,
      productSpecs: entireBody.productDescription,
    });
  }

  async addSomething() {}

  //adding product specific details
  async addProductData(entireBody: AddProductDataDto) {
    console.log('new entire body', entireBody);
    const newProductData = new this.productDataModel({
      productCode: entireBody.productCode,
      categoryCode: entireBody.categoryCode,
      brand: entireBody.brand,
      category: entireBody.category,
      brandCode: entireBody.brandCode,
      highlights: entireBody.highlights,
      title: entireBody.title,
      modelNumber: entireBody.modelNumber,
      modelCode: entireBody.modelCode,
      processors: entireBody.processors,
      rams: entireBody.rams,
      colors: entireBody.colors,
      storages: entireBody.storages,
    });
    newProductData.save();
  }

  //getting suitable products
  async getAvailableProducts(brandCode: string, categoryCode: string) {
    console.log('given data', brandCode, categoryCode);
    const products = await this.productDataModel.find({
      brandCode: brandCode,
      categoryCode: categoryCode,
    });
    return products;
  }

  async addProductImages(entireBody: AddProductImagesDto) {
    const productImages = new this.productImagesModel({
      productCode: entireBody.productCode,
      colorCode: entireBody.colorCode,
      count: entireBody.count,
    });
    productImages.save();
  }

  // async addProductSpecs(entireBody: CreatePro) {
  //   console.log('adding specs', entireBody);
  //   const newProductSpecs = new this.productSpecsModel({
  //     productId: entireBody.productId,
  //     productCode: entireBody.productCode,
  //     productSpecs: entireBody.productSpecs,
  //   });
  //   newProductSpecs.save();
  // }
}
