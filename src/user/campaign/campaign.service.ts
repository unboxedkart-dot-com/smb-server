import { Body, Injectable, Post, Req } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Campaign } from 'aws-sdk/clients/personalize';
import { Model } from 'mongoose';
// import Razorpay from 'razorpay';
import { User } from 'src/user/models/user.model';
import { UserPaymentDetails } from 'src/user/models/user_payment_details.model';
import { NewCampaignDto } from './dto/new-campaign.dto';
// import * as Razorpay from 'razorpay';

// var instance = new Razorpay({
//   key_id: 'rzp_live_Yf6SskMc0yCBdS',
//   // process.env.PAYMENT_KEY_ID, // your `KEY_ID`
//   key_secret: 'GUt36OWEcQtKk1gZhmK0o5nM',
//   // process.env.PAYMENT_KEY_SECRET, // your `KEY_SECRET`
// });

@Injectable()
export class CampaignService {
  constructor(
    @InjectModel('User')
    private readonly userModel: Model<User>,
    @InjectModel('Campaign')
    private readonly campaignModel: Model<Campaign>,
  ) {}

  _generateOrderNumber() {
    const orderCode = 'OD';
    const randomNumber = Math.floor(
      10000000000000 + Math.random() * 90000000000000,
    );
    const orderNumber = orderCode + randomNumber.toString();
    return orderNumber;
  }

  async createPaymentOrder(payableAmount: number, orderNumber: string) {
    // const order = await instance.orders.create({
    //   amount: payableAmount * 100,
    //   // amount: payableAmount * 100,
    //   currency: 'INR',
    //   receipt: orderNumber,
    // });
    // return order;
  }

  async getPayableAmount(userId: string, amount: string) {
    console.log('getting payable amount');
    // const userDoc = await this.userModel.findById(userId);
    // const orderTotal = await this._calculateAmount(
    //   userDoc.orderSummary.orderItems,
    // );

    let payableAmount = parseInt(amount);
    const orderNumber = this._generateOrderNumber();
    const paymentOrderId = await this.createPaymentOrder(
      payableAmount,
      orderNumber,
    );
    // await this.userModel.findByIdAndUpdate(userId, {
    //   'orderSummary.orderNumber': orderNumber,
    //   'orderSummary.paymentAmount': payableAmount,
    //   'orderSummary.paymentOrderId': paymentOrderId['id'],
    // });
    return {
      payableAmount: payableAmount,
      paymentOrderId: paymentOrderId['id'],
      // name: userDoc.representativeName,
      // email: userDoc.emailId,
      // phoneNumber: userDoc.phoneNumber,
    };
  }

  // async verifyPaymentSignature(userId: string, entireBody: VerifyPaymentDto) {
  //   console.log('entrie body', entireBody);
  //   console.log('verifying full ', entireBody);
  //   const userDoc = await this.userModel.findById(userId);
  //   const paymentOrderId = userDoc.orderSummary.paymentOrderId;
  //   console.log('payment order id', paymentOrderId);
  //   const generatedSignature = createHmac('sha256', 'GUt36OWEcQtKk1gZhmK0o5nM');
  //   const encodedSignature = generatedSignature
  //     .update(paymentOrderId + '|' + entireBody.paymentId + '')
  //     .digest('hex');
  //   console.log('generated sig', generatedSignature);
  //   console.log('encoded', encodedSignature);
  //   console.log('given sig', entireBody.paymentSignature);
  //   if (encodedSignature == entireBody.paymentSignature) {
  //     console.log('full verifed');

  //     // const orderNumber = this._generateOrderNumber();

  //     console.log(entireBody, paymentOrderId);

  //     const newPayment = new this.paymentModel({
  //       userId: userId,
  //       orderNumber: userDoc.orderSummary.orderNumber,
  //       gateway: 'razorpay',
  //       status: 'verified',
  //       paymentOrderId: entireBody.orderId,
  //       paymentId: entireBody.paymentId,
  //       paymentType: 'pas-d',
  //       paymentMethod: 'razorpay',
  //       amount: userDoc.orderSummary.paymentAmount,
  //     });
  //     newPayment.save();

  //     await this.userModel.findByIdAndUpdate(userId, {
  //       // 'orderSummary.orderNumber': orderNumber,
  //       'orderSummary.paymentMethod': "prepaod"
  //       // 'orderSummary.paymentId': entireBody.paymentId,
  //       // 'orderSummary.paymentOrderId': paymentOrderId,
  //     });

  //     // await this.createCampaign(userDoc._id.toString());
  //     // return orderNumber;

  //     return {
  //       status: 'success',
  //       message: 'payment is verified',
  //       // orderNumber: userDoc.orderSummary.orderNumber,
  //     };
  //   } else {
  //     return {
  //       status: 'failed',
  //       message: 'payment is not verified',
  //     };
  //   }
  // }

  async addNewCampaign(userId: string, entireBody: NewCampaignDto) {
    console.log('updating details', entireBody);
    const userDoc = await this.userModel.findById(userId);
    const newCampaign = new this.campaignModel({
      title: entireBody.title,
      description: entireBody.description,
      hasImage: entireBody.hasImage,
      hasVideo: entireBody.hasVideo,
      hasLink: entireBody.hasLink,
      imageUrl: entireBody.imageUrl,
      videoUrl: entireBody.videoUrl,
      linkUrl: entireBody.linkUrl,
      requiredViewsCount: entireBody.requiredViewsCount,
      campaignDateInString: entireBody.campaignDateInString,
      // campaignDate: entireBody.campaignDate,
      preferredGender: entireBody.preferredGender,
      preferredState: entireBody.preferredState,
      preferredDistrict: entireBody.preferredDistrict,
      preferredCity: entireBody.preferredCity,
      preferredPincode: entireBody.preferredPincode,
      userId: userId,
      userDetails: {
        phoneNumber: userDoc.phoneNumber,
        name: userDoc.representativeName,
        emailId: userDoc.emailId,
        companyName: userDoc.companyName,
        officePhoneNumber: userDoc.officeMobileNumber,
        officeAddress: userDoc.officeAddress,
      },
    });
    await newCampaign.save();
  }
}
