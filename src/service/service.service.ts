import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ServiceOrderModel } from 'src/models/service_order.model';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { Model } from 'mongoose';
import { User } from 'src/models/user.model';
import { Faq } from 'src/models/faq.model';
import { NotificationModel } from 'src/models/notification.model';

@Injectable()
export class ServiceService {
  constructor(
    @InjectModel('ServiceOrder')
    private readonly serviceOrderModel: Model<ServiceOrderModel>,
    @InjectModel('Notification')
    private readonly notificationModel: Model<NotificationModel>,
    @InjectModel('Faq') private readonly faqModel: Model<Faq>,
    @InjectModel('User')
    private readonly userModel: Model<User>,
  ) {}

  async diagnosisFee(categoryCode: string) {
    return this._getDiagnosisFee(categoryCode);
  }

  async createServiceRequest(userId: string, entireBody: CreateServiceDto) {
    const user = await this.userModel.findById(userId);
    if (user) {
      const fee = this._getDiagnosisFee(entireBody.categoryCode);
      const orderNumber = this._generateOrderNumber();
      const newOrder = new this.serviceOrderModel({
        userId: userId,
        phoneNumber: user.phoneNumber,
        name: user.name,
        emailId: user.emailId,
        productTitle: entireBody.productTitle,
        productCode: entireBody.productCode,
        color: entireBody.color,
        colorCode: entireBody.colorCode,
        serialNumber: entireBody.serialNumber,
        dateInString: entireBody.dateInString,
        visitDate: entireBody.visitDate,
        services: entireBody.services,
        orderNumber: orderNumber,
        diagnosisFee: fee,
      });
      await newOrder.save();
      return orderNumber;
    }
  }

  async orders(userId: string) {
    const orders = await this.serviceOrderModel.find({ userId: userId });
    return orders;
  }

  async notifications(userId: string) {
    const notifications = await this.notificationModel.find({ userId: userId });
    return notifications;
  }

  async faqs() {
    const faqs = await this.faqModel.find();
    return faqs;
  }

  _generateOrderNumber() {
    const orderCode = 'SRN';
    const randomNumber = Math.floor(
      10000000000000 + Math.random() * 90000000000000,
    );
    const orderNumber = orderCode + randomNumber.toString();
    return orderNumber;
  }

  _getDiagnosisFee(category: string) {
    if (category == 'mobile-phone') {
      return 300;
    } else if (category == 'laptop') {
      return 800;
    } else if (category == 'tablet') {
      return 500;
    } else if (category == 'watch') {
      return 400;
    }
  }
}
