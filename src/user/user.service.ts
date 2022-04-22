import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/models/user.model';
import { UpdateUserDetailsDto } from './dto/update-user-details.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectModel('User')
    private readonly userModel: Model<User>,
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
      'purchasedItemIds' : user.purchasedItemIds,
      'answeredQuestionIds' : user.answeredQuestionIds
    }
  }

  async updateUserDetails(userId: string, entireBody: UpdateUserDetailsDto) {
    await this.userModel.findByIdAndUpdate(userId, {
      name: entireBody.name,
      gender: entireBody.gender,
    });
  }
}
