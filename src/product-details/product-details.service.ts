import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose/dist/common/mongoose.decorators';
import { Model } from 'mongoose';
import { ProductDescription } from 'src/models/product-description';
import { ProductSpecs } from 'src/models/product-specs';
import { Product } from 'src/models/product.model';
import { ProductData } from 'src/models/product_data.model';
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

  async getProductVariants(productCode: string) {
    const variants = await this.productDataModel.findOne({
      productCode: productCode,
    });
    return variants;
  }

  // async putData(){
  //   this.productDataModel = 
  // }

  async getProductSpecs(productId: string) {
    console.log('goevb product id', productId);
    if (productId.match(/^[0-9a-fA-F]{24}$/)) {
      const product = await this.productModel.findById(productId);
      console.log(product);
      if (product != null) {
        console.log('product exists');
        const productSpecs = await this.productSpecsModel.findOne(
          {
            productCode: product.productCode,
          },
          { _id: 0, productSpecs: 1 },
        );
        return productSpecs.productSpecs;
      } else {
        console.log('product not exists');
        throw new NotFoundException('could not find the product');
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



  //getting suitable products
  async getAvailableProducts(brandCode: string, categoryCode: string) {
    console.log('given data', brandCode, categoryCode);
    const products = await this.productDataModel.find({
      brandCode: brandCode,
      categoryCode: categoryCode,
    });
    return products;
  }




}

