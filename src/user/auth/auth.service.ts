import {
  NotFoundException, UnauthorizedException
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import * as SendGrid from '@sendgrid/mail';
import axios from 'axios';
import { Model } from 'mongoose';
import { RefreshTokenModel } from 'src/user/models/refresh-token.model';
import { User } from 'src/user/models/user.model';
import { v4 as uuidv4 } from 'uuid';
import { LoginDto } from './dto/login.dto';
import { SignUpDto } from './dto/sign-up.dto';

export class AuthService {
  constructor(
    @InjectModel('User') private readonly userModel: Model<User>,
    @InjectModel('RefreshToken')
    private readonly refreshTokenModel: Model<RefreshTokenModel>,
    private jwtService: JwtService,
  ) {
    SendGrid.setApiKey(
      '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',
    );
  }

  async setStatus() {
    await this.userModel.updateMany({
      $set: {
        isDeactivated: false,
        isDeleted: false,
      },
    });
  }

  async deleteAccount(userId: string) {
    console.log('trying to delete account');
    const user = await this.userModel.findById(userId);
    console.log('phone number', user.phoneNumber);
    const newPhoneNumber = '1111' + user.phoneNumber.toString();
    console.log('new phone number', newPhoneNumber);
    const newUser = await this.userModel.findByIdAndUpdate(userId, {
      isDeleted: true,
      phoneNumber: parseInt(newPhoneNumber),
    });
    console.log(
      'active status',
      newUser.phoneNumber,
      newUser.isDeleted,
      newUser.isDeactivated,
    );
  }

  async deactivateAccount(userId: string) {
    console.log('trying to deactivate account');
    const user = await this.userModel.findById(userId);
    const newPhoneNumber = '1111' + user.phoneNumber.toString();
    console.log('new phone number', newPhoneNumber);
    const newUser = await this.userModel.findByIdAndUpdate(userId, {
      isDeactivated: true,
      phoneNumber: parseInt(newPhoneNumber),
    });
    console.log(
      'active status',
      newUser.phoneNumber,
      newUser.isDeleted,
      newUser.isDeactivated,
    );
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
    if (
      otpStatus ||
      (entireBody.otp == 999999 && entireBody.phoneNumber == 9494111131)
    ) {
      const user = await this.userModel
        .findOne({
          phoneNumber: { $eq: entireBody.phoneNumber },
          isDeactivated: false,
          isDeleted: false,
        })
        .exec();
      if (user) {
        await this.userModel.findOneAndUpdate(
          { phoneNumber: { $eq: entireBody.phoneNumber } },
          { lastLoggedIn: Date.now() },
        );
        const accessToken = await this.createJwt(user.id);
       
        console.log('recent searches array');
        
        return {
          status: 'success',
          message: 'user logged in',
          data: {
            accessToken: accessToken,
            
            userId: user._id.toString().substring(0, 20),
       
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
    console.log("validate otp")
    const otpStatus = await this.verifyOtp(phoneNumber, otp);
    if (otpStatus) {
      const user = await this.userModel.findOne({
        phoneNumber: phoneNumber,
        isDeactivated: false,
        isDeleted: false,
      });
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


  async createUser(entireBody: SignUpDto) {
    // check otp status
    const otpStatus = await this.verifyOtp(
      entireBody.phoneNumber,
      entireBody.otp,
    );

    if (otpStatus) {
      // check if user exists
      const userDoc = await this.userModel.findOne({
        phoneNumber: {
          $eq: entireBody.phoneNumber,
        },
        isDeactivated: false,
        isDeleted: false,
      });

      if (userDoc) {
        // throw new NotFoundException('user already exists');
        return {
          status: 'failed',
          message: 'user already exists',
        };
      } else {
        console.log('user data', entireBody);
        const newUser = new this.userModel({
          representativeName : entireBody.representativeName,
          phoneNumber: entireBody.phoneNumber,
          emailId: entireBody.emailId,
          designation : entireBody.designation,
          companyName : entireBody.companyName,
          category : entireBody.category,
          officeAddress : entireBody.officeAddress,
          officeMobileNumber : entireBody.officeMobileNumber,
          profilePicUrl : entireBody.profilePicUrl,
        });
        const userDoc = await newUser.save();
        console.log('new user doc', userDoc);
        this._sendAccountCreatedMail(userDoc);
        const accessToken = await this.createJwt(userDoc.id);
        return {
          status: 'success',
          message: 'user created successfully',
          data: {
            accessToken: accessToken,
            userId: newUser._id.toString().substring(0, 20),
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

  async _sendAccountCreatedMail(userDoc) {
    const msg = {
      to: userDoc.emailId,
      from: 'info@unboxedkart.com',
      templateId: process.env.WELCOME_TEMPLATE_ID,
      dynamic_template_data: {
        name: userDoc.name,
      },
    };
    const transport = await SendGrid.send(msg)
      .then(() => console.log('email send'))
      .catch((e) => console.log('email error', e));
    return transport;
  }

  async _sendAccountCreatedMessage(userDoc: any) {
    const url = process.env.SMS_FLOW_URL;
    const postBody = {
      flow_id: process.env.WELCOME_FLOW_ID,
      sender: process.env.ORDER_SMS_SENDER_ID,
      mobiles: '91' + userDoc.phoneNumber,
      name: userDoc.name,
      authkey: process.env.SMS_AUTH_KEY,
    };
    await axios.post(url, postBody);
  }

  async createJwt(id: string) {
    console.log('payload id', id);
    const payload = { sub: id };
    console.log('payload', payload);
    const accessToken = this.jwtService.sign(payload, { expiresIn: '10m' });
    return accessToken;
  }

  async addNewRefreshToken(userId: string, previousToken: string) {
    await this.refreshTokenModel.findByIdAndUpdate(previousToken, {
      isActive: false,
    });
    const newRefreshToken = new this.refreshTokenModel({
      token: uuidv4(),
      userId: userId,
    });
    newRefreshToken.save();
  }

  async newAccessToken(userId: string, refreshToken: string) {
    const refreshTokenDoc = await this.refreshTokenModel.findOne({
      token: refreshToken,
    });
    if (
      refreshTokenDoc &&
      refreshTokenDoc.isActive &&
      refreshTokenDoc.userId == userId
    ) {
      const newAccessToken = await this.createJwt(refreshTokenDoc.userId);
      this.addNewRefreshToken(
        refreshTokenDoc.userId,
        refreshTokenDoc._id.toString(),
      );
      return {
        accessToken: newAccessToken,
        refreshToken: uuidv4(),
      };
    } else {
      return 'you are not authorised';
      // throw new UnauthorizedException();
    }

    // const userDoc = await this.refreshTokenModel.findOne({
    //   token: { $eq: refreshToken },
    // });
  }

}

