import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose/dist/common/mongoose.decorators';
import { Product } from 'src/models/product.model';
import { Model } from 'mongoose';
import { CreateProductDetailsDto } from './dto/create-product-details.dto';

@Injectable()
export class ProductDetailsService {
  constructor(
    @InjectModel('ProductSpecs')
    private readonly productSpecsModel: Model<Product>, // @InjectModel('ProductDetails') private readonly productModel: Model<Product>,
  ) {}

  async getProductSpecs(productId: string) {
    const response = await this.productSpecsModel.findOne(
      {
        productId: productId,
      },
      { _id: 0, productSpecs: 1 },
    );
    return response['productSpecs'];
  }

  async addProductSpecs(entireBody: CreateProductDetailsDto) {
    console.log('adding specs', entireBody);
    const newProductSpecs = new this.productSpecsModel({
      productId: entireBody.productId,
      productCode: entireBody.productCode,
      productSpecs: entireBody.productSpecs,
    });
    newProductSpecs.save();
  }
}
