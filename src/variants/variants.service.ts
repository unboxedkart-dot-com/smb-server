import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { VariantsData } from 'src/models/variants_data.model';
import { Model } from 'mongoose';
import { ProductData } from 'src/models/product_data.model';

@Injectable()
export class VariantsService {
  constructor(
    @InjectModel('VariantsData')
    private readonly variantDataModel: Model<VariantsData>,
    // @InjectModel('ProductData')
    // private readonly productDataModel: Model<ProductData>,
  ) {}

  async addVariantsData() {
    const newVariantsData = new this.variantDataModel({
      productCode: 'apple-iphone-x',
      storages: [
        { code: '64-gb', value: '64 GB' },
        { code: '256-gb', value: '256 GB' },
      ],
      colors: [
        { code: 'silver', value: 'Silver' },
        { code: 'space-grey', value: 'Space grey' },
      ],
      conditions: [
        { code: 'unboxed', value: 'UNBOXED' },
        { code: 'grade-a', value: 'Grade A' },
        { code: 'grade-b', value: 'Grade B' },
        { code: 'grade-c', value: 'Grade C' },
      ],
    });
    newVariantsData.save();
  }

  async getVariantsData(productCode: string) {
    console.log('getting variants for', productCode);
    // const variants = await this.variantDataModel.findOne({
    //   productCode: 'apple-iphone-x',
    // });
    // const variants = await this.productDta;
    // return variants;
  }
}
