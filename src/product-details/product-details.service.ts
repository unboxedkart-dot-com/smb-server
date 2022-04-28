import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose/dist/common/mongoose.decorators';
import { Product } from 'src/models/product.model';
import { Model } from 'mongoose';
import { ProductSpecs } from 'src/models/product-specs';
import { ProductDescription } from 'src/models/product-description';
import { AddProductSpecsDto } from './dto/add-product-specs.dto';
import { AddProductDescriptionDto } from './dto/add-product-description.dto';

@Injectable()
export class ProductDetailsService {
  constructor(
    @InjectModel('Product') private readonly productModel: Model<Product>,
    @InjectModel('ProductSpecs')
    private readonly productSpecsModel: Model<ProductSpecs>,
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
