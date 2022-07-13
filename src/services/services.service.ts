import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ServiceModel } from 'src/models/service.model';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { Model } from 'mongoose';

@Injectable()
export class ServicesService {
  constructor(
    @InjectModel('Service') private readonly serviceModel: Model<ServiceModel>,
  ) {}

  async findOne(productCode: string, color: string) {
    console.log('queries', productCode, color);
    const products = await this.serviceModel.find({
      productCode: productCode,
      colors: { $in: [color] }, 
    });
    return products;
  }

  create(createServiceDto: CreateServiceDto) {
    return 'This action adds a new service';
  }

  findAll() {
    return `This action returns all services`;
  }

  update(id: number, updateServiceDto: UpdateServiceDto) {
    return `This action updates a #${id} service`;
  }

  remove(id: number) {
    return `This action removes a #${id} service`;
  }

  async addAll() {
    await this.serviceModel.insertMany([
      {
        'productCode': 'apple-iphone-x',
        'colors': ['silver', 'space-grey'],
        'title': 'display Replacement',
        'price': 12500,
        'sellingPrice': 9500,
      },
      {
        'productCode': 'apple-iphone-x',
        'colors': ['silver', 'space-grey'],
        'title': 'Battery Replacement',
        'price': 3500,
        'sellingPrice': 2200,
      },
      {
        'productCode': 'apple-iphone-x',
        'colors': ['silver', 'space-grey'],
        'title': 'Charging port',
        'price': 2500,
        'sellingPrice': 1500,
      },
      {
        'productCode': 'apple-iphone-x',
        'colors': ['silver', 'space-grey'],
        'title': 'Speaker ',
        'price': 2500,
        'sellingPrice': 1500,
      },
      {
        'productCode': 'apple-iphone-x',
        'colors': ['silver', 'space-grey'],
        'title': 'Microphone',
        'price': 2500,
        'sellingPrice': 1500,
      },
      {
        'productCode': 'apple-iphone-x',
        'colors': ['silver', 'space-grey'],
        'title': 'Volume buttons',
        'price': 2500,
        'sellingPrice': 1500,
      },
      {
        'productCode': 'apple-iphone-x',
        'colors': ['silver', 'space-grey'],
        'title': 'Face Id',
        'price': 9000,
        'sellingPrice': 7000,
      },
      {
        'productCode': 'apple-iphone-x',
        'colors': ['silver', 'space-grey'],
        'title': 'Wifi Issue',
      },
      {
        'productCode': 'apple-iphone-x',
        'colors': ['silver', 'space-grey'],
        'title': 'Bluetooth Connectivity Issue',
      },
      {
        'productCode': 'apple-iphone-x',
        'colors': ['silver', 'space-grey'],
        'title': 'Network/Cellular issue',
      },
      {
        'productCode': 'apple-iphone-x',
        'colors': ['silver', 'space-grey'],
        'title': 'Water damage',
      },
    ]);
  }
}
