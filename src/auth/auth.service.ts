import { MailerService } from '@nestjs-modules/mailer';
import { HttpService } from '@nestjs/axios';
import {
  HttpCode,
  NotFoundException,
  Options,
  Post,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { map } from 'rxjs';
import { User } from 'src/models/user.model';
import { SignUpDto } from './dto/sign-up.dto';
import axios from 'axios';
import { LoginDto } from './dto/login.dto';
import { Coupon, CouponTypes } from 'src/models/coupon.model';
import * as SendGrid from '@sendgrid/mail';

export class AuthService {
  constructor(
    @InjectModel('User') private readonly userModel: Model<User>,
    @InjectModel('Coupon') private readonly couponModel: Model<Coupon>,
    private jwtService: JwtService,
  ) {
    SendGrid.setApiKey(
      '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',
    );
  }

  async sendMail() {
    const msg = {
      to: 'bsunil135@gmail.com',
      from: 'info@unboxedkart.com',
      templateId: 'd-a138d401839444518e9515218e7af1e7',
      dynamic_template_data: {
        name: 'Sunil',
      },
    };
    // const mail = {
    //   to: 'bsunil135@gmail.com',
    //   cc: 'info@unboxedkart.com',
    //   subject: 'Sunil, Nice to meet you',
    //   from: 'info@unboxedkart.com', // Fill it with your validated email on SendGrid account
    //   text: ,
    //   // html: '<h1>Hello</h1>',
    // };
    const transport = await SendGrid.send(msg)
      .then(() => console.log('email send'))
      .catch((e) => console.log('email error', e));
    return transport;
  }

  async sendOtp(phoneNumber: number) {
    const url = `${process.env.SEND_OTP_URL_PREFIX}template_id=${process.env.OTP_TEMPLATE_ID}&mobile=91${phoneNumber}&authkey=${process.env.SMS_AUTH_KEY}&otp_length=6&otp_expiry=${process.env.OTP_EXPIRY_TIME}`;
    console.log('sms url', url);
    const response = await axios.get(url);
    const responseData = response.data;
    console.log(response);
    if (responseData['type'] == 'success') {
      return {
        status: 'success',
        message: 'otp sent successfully',
      };
    } else {
      return {
        status: 'failed',
        message: 'otp is not sent',
      };
    }
  }

  async verifyOtp(phoneNumber: number, otp: number) {
    const url = `${process.env.VERIFY_OTP_URL_PREFIX}otp=${otp}&authkey=${process.env.SMS_AUTH_KEY}&mobile=91${phoneNumber}&otp_expiry=${process.env.OTP_EXPIRY_TIME}`;
    console.log('validate url', url);
    const response = await axios.get(url);
    const responseData = response.data;
    console.log(responseData);
    console.log('status', responseData['type']);
    if (
      responseData['type'] == 'success' ||
      responseData['message'] == 'Mobile no. already verified'
    ) {
      console.log('status new', true);
      return true;
    } else {
      console.log('status new', false);
      return false;
    }
  }

  async resendOtp(phoneNumber: number, type: number) {
    const retryType = type == 0 ? 'text' : 'default';
    const url = `${process.env.RESEND_OTP_URL_PREFIX}authkey=${process.env.SMS_AUTH_KEY}&retrytype=${retryType}=&mobile=91${phoneNumber}`;
    const response = await axios.get(url);
    const responseData = response.data;
    if (responseData['type'] == 'success') {
      return {
        status: 'success',
        message: 'otp resent successfully',
      };
    } else {
      return {
        status: 'success',
        message: 'otp is not sent',
      };
    }
  }

  async loginUser(entireBody: LoginDto) {
    const otpStatus = await this.verifyOtp(
      entireBody.phoneNumber,
      entireBody.otp,
    );
    console.log('login status', otpStatus);
    if (otpStatus) {
      const user = await this.userModel
        .findOne({ phoneNumber: { $eq: entireBody.phoneNumber } })
        .exec();
      if (user) {
        await this.userModel.findOneAndUpdate(
          { phoneNumber: { $eq: entireBody.phoneNumber } },
          { lastLoggedIn: Date.now(), deviceId: entireBody.deviceId },
        );
        const accessToken = await this.createJwt(user.id);
        return {
          status: 'success',
          message: 'user logged in',
          data: {
            accessToken: accessToken,
            wishlist: user.favoriteItemIds,
            cart: user.cartItemIds,
            // recentSearches :
          },
        };
      } else {
        throw new NotFoundException('user does not exits, please create user');
        // return {
        //   status: 'failed',
        //   message: 'user does not exists',
        // };
      }
    } else {
      throw new UnauthorizedException('invalid otp');
      // return {
      //   status: 'failed',
      //   message: 'invalid otp',
      // };
    }
  }

  async validateOtp(phoneNumber: number, otp: number) {
    const otpStatus = await this.verifyOtp(phoneNumber, otp);
    if (otpStatus) {
      const user = await this.userModel.findOne({ phoneNumber: phoneNumber });
      if (user) {
        return {
          status: 'failed',
          message: 'User already exists with this mobile number.',
          content:
            'Login with the same mobile number or use another mobile number to create account',
        };
      } else {
        return {
          status: 'success',
          message: 'otp is valid',
        };
      }
    } else {
      return {
        status: 'failed',
        message: 'Invalid OTP entered',
        content:
          'The entered OTP is not valid, please enter otp sent to your mobile number',
      };
    }
  }

  _createCouponCode(name: string) {
    const randomNumber = Math.floor(1000 + Math.random() * 9000);
    const couponCode = name.substring(0, 6) + randomNumber;
    return couponCode;
  }

  async createUser(entireBody: SignUpDto) {
    // check otp status
    const otpStatus = await this.verifyOtp(
      entireBody.phoneNumber,
      entireBody.otp,
    );

    if (otpStatus) {
      // check if user exists
      const userDoc = await this.userModel.findOne({
        phoneNumber: { $eq: entireBody.phoneNumber },
      });

      if (userDoc) {
        // throw new NotFoundException('user already exists');
        return {
          status: 'failed',
          message: 'user already exists',
        };
      } else {
        // create referral coupon
        const coupon = this._createCouponCode(entireBody.name);

        // create user model
        const newUser = new this.userModel({
          name: entireBody.name,
          phoneNumber: entireBody.phoneNumber,
          deviceId: entireBody.deviceId,
          emailId: entireBody.emailId,
          gender: entireBody.gender,
          lastLoggedIn: Date.now(),
          personalCouponCode: coupon,
        });
        const userDoc = await newUser.save();
        console.log('new user doc', userDoc);
        const newCoupon = new this.couponModel({
          couponCode: coupon,
          discountAmount: 500,
          minimumOrderTotal: 30000,
          discountType: CouponTypes.FLAT,
          isPersonalCoupon: true,
          couponDetails: {
            userId: userDoc._id,
            phoneNumber: entireBody.phoneNumber,
            userName: entireBody.name,
            userEmail: entireBody.emailId,
          },
        });
        // save referral coupon
        newCoupon.save();
        const url = process.env.SMS_FLOW_URL;
        const postBody = {
          flow_id: process.env.WELCOME_FLOW_ID,
          sender: process.env.ORDER_SMS_SENDER_ID,
          mobiles: '91' + userDoc.phoneNumber,
          name: userDoc.name,
          authkey: process.env.SMS_AUTH_KEY,
        };
        await axios.post(url, postBody);

        // add user

        //create jwt token
        const accessToken = await this.createJwt(userDoc.id);

        //return response
        return {
          status: 'success',
          message: 'user created successfully',
          data: {
            accessToken: accessToken,
          },
        };
      }
    } else {
      return {
        status: 'failed',
        message: 'invalid otp',
      };
    }
  }

  async createJwt(id: string) {
    console.log('payload id', id);
    const payload = { sub: id };
    console.log('payload', payload);
    const accessToken = this.jwtService.sign(payload, { expiresIn: '10m' });
    return accessToken;
  }

  async sendSampleMail() {
    //   sendMail({String email, String name, String price}) async {
    //     const username = 'imsunil@firstmethod.in';
    //     const userNameAlias = 'ask@firstmethod.in';
    //     const password = 'Imsunil@9';
    //     final smtpServer = SmtpServer('smtpout.secureserver.net',
    //         port: 465, username: username, password: password, ssl: true);
    //     final message = Message()
    //       ..from = Address(userNameAlias, 'Firstmethod')
    //       ..recipients.add('$email')
    //       ..subject = 'Thankyou for purchasing from us '
    //       ..text = 'Hi $name, Thankyou for purchasing an item at Rs.$price from us.';
    //     // ..html = "<h1>Write the content here</h1>\n<p>Hey! its easy use html tags for alignments</p>";
    //     try {
    //       final sendReport = await send(message, smtpServer);
    //       print('Message sent');
    //     } on MailerException catch (e) {
    //       print('error occured in sending mail\n');
    //       print(e);
    //       for (var error in e.problems) {
    //         print(error);
    //       }
    //     }
    //   }
  }
}

// const url =
//   'https://api.msg91.com/api/v5/verify-otp?template_id=613fad6269dfcb3b246f3342&mobile=91' +
//   phoneNumber +
//   '&authkey=322470AGG1n6Rp5e676a8bP1';
// console.log('sms url', url);
// const response = this.httpService.get(url);
// console.log(response);
// return response;
// if (otp == 123456) {
//   return true;
// } else {
//   return false;
// }

// const response = this.httpService.get(url).pipe(
//   map((response) => {
//     console.log('nre data', response);
//     console.log('response data', response.data);
//     // response.data
//   }),
// );

// const response = this.httpService
//   .get(url)
//   .pipe(map((response) => response.data));

// const response = this.httpService
// .get(url)
// .pipe(map((response) => response.data));
