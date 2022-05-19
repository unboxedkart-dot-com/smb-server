import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/models/user.model';
import { UserPaymentDetails } from 'src/models/user_payment_details.model';
import { UpdateUserDetailsDto } from './dto/update-user-details.dto';
import { UpdateUserPaymentDetailsDto } from './dto/update-user-payment-details.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectModel('User')
    private readonly userModel: Model<User>,
    @InjectModel('UserPaymentDetails')
    private readonly userPaymentDetailsModel: Model<UserPaymentDetails>,
  ) {}

  async getUserDetails(userId: string) {
    const user = await this.userModel.findById(userId);
    return user;
  }

  async getUserData(userId: string) {
    const user = await this.userModel.findById(userId, {
      purchasedItemIds: 1,
      answeredQuestionIds: 1,
    });
    return {
      purchasedItemIds: user.purchasedItemIds,
      answeredQuestionIds: user.answeredQuestionIds,
    };
  }

  async updateUserDetails(userId: string, entireBody: UpdateUserDetailsDto) {
    console.log('updating details', entireBody);
    await this.userModel.findByIdAndUpdate(userId, {
      name: entireBody.name,
      gender: entireBody.gender,
    });
  }

  async getPaymentDetails(userId: string) {
    const userPaymentDetails = await this.userPaymentDetailsModel.findOne({
      userId: userId,
    });
    return userPaymentDetails;
  }

  async updatePaymentDetails(
    userId: string,
    entireBody: UpdateUserPaymentDetailsDto,
  ) {
    console.log('updating details', entireBody);
    const paymentDetails = await this.userPaymentDetailsModel.findOne({
      userId: userId,
    });
    console.log('paymentdetails', paymentDetails);
    if (paymentDetails) {
      console.log('old');
      await this.userPaymentDetailsModel.findOneAndUpdate(
        {
          userId: userId,
        },
        {
          upiId: entireBody.upiId,
          upiName: entireBody.upiName,
        },
      );
    } else {
      console.log('new');
      const newPayment = new this.userPaymentDetailsModel({
        userId: userId,
        upiName: entireBody.upiName,
        upiId: entireBody.upiId,
      });
      newPayment.save();
    }

    // await this.userModel.findByIdAndUpdate(userId, {
    //   name: entireBody.name,
    //   gender: entireBody.gender,
    // });
  }
}
