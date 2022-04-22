import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose/dist/common/mongoose.decorators';
import { Faq } from 'src/models/faq.model';
import { Model } from 'mongoose';
import { FaqsController } from './faqs.controller';
import { CreateFaqDto } from './dto/create-faq.dto';
import { Product } from 'src/models/product.model';

@Injectable()
export class FaqsService {
  constructor(
    @InjectModel('Faq') private readonly faqModel: Model<Faq>,
    @InjectModel('Product') private readonly productModel: Model<Product>, // @InjectModel('ProductDetails') private readonly productModel: Model<Product>,
  ) {}

  async getFaqs() {
    const faqs = await this.faqModel.find({});
    return faqs as Faq[];
  }

  async createFaq(userId: string, entireBody: CreateFaqDto) {
    const newFaq = new this.faqModel({
      question: entireBody.question,
      answer: entireBody.answer,
    });
    newFaq.save();
    console.log('new faq', newFaq);
    return newFaq;
  }

  async updateFaq() {}

  async deleteFaq() {}
}
