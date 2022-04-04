import { HttpService } from '@nestjs/axios';
import { HttpCode, Options } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/models/user.model';

export class AuthService {
  constructor(
    @InjectModel('User') private readonly userModel: Model<User>,
    private jwtService: JwtService,
    private httpService: HttpService,
  ) {}

  async sendOtp(phoneNumber: number) {
    return '123456';
    // const url =
    //   'https://api.msg91.com/api/v5/otp?template_id=613fad6269dfcb3b246f3342&mobile=91' +
    //   phoneNumber +
    //   '&authkey=322470AGG1n6Rp5e676a8bP1&otp_length=6&otp_expiry=10';
    // console.log('sms url', url);
    // const response = this.httpService.get(url);
    // console.log(response);
    // return response;
  }

  verifyOtp(phoneNumber: number, otp: number) {
    // const url =
    //   'https://api.msg91.com/api/v5/verify-otp?template_id=613fad6269dfcb3b246f3342&mobile=91' +
    //   phoneNumber +
    //   '&authkey=322470AGG1n6Rp5e676a8bP1';
    // console.log('sms url', url);
    // const response = this.httpService.get(url);
    // console.log(response);
    // return response;
    if (otp == 123456) {
      return true;
    } else {
      return false;
    }
  }

  async loginUser(phoneNumber: number, otp: number) {
    const otpStatus = this.verifyOtp(phoneNumber, otp);
    if (otpStatus) {
      const user = await this.userModel
        .findOne({ phoneNumber: { $eq: phoneNumber } })
        .exec();
      console.log("user dara", user);
      const accessToken = await this.createJwt(user.id);
      return accessToken;
    } else {
      return 'false';
    }
  }

  async validateOtp(phoneNumber: number, otp: number) {
    const otpStatus = this.verifyOtp(phoneNumber, otp);
    return otpStatus;
  }

  async createUser(user: User) {
    const userStatus = await this.userModel.findOne({
      phoneNumber: { $eq: user.phoneNumber },
    });
    if (userStatus) {
      return 'user already exists';
    } else {
      const newUser = new this.userModel(user);
      const result = await newUser.save();
      const accessToken = await this.createJwt(result.id);
      return accessToken;
    }
  }

  async createJwt(id: string) {
    console.log('payload id', id);
    const payload = { sub: id };
    console.log('payload', payload);
    return {
      accessToken: this.jwtService.sign(payload, { expiresIn: '10m' }),
    };
  }
}
