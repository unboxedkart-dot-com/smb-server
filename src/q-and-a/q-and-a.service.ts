import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Answer } from 'src/models/answer.model';
import { ItemPurchasedUser } from 'src/models/item-purchased-user.model';
import { Product } from 'src/models/product.model';
import { Question } from 'src/models/question.model';
import { QuestionAndAnswer } from 'src/models/q_and_a.model';
import { User } from 'src/models/user.model';
import { CreateAnswerDto } from './dto/create_answer.dto';
import { CreateQuestionDto } from './dto/create_question.dto';

@Injectable()
export class QAndAService {
  constructor(
    @InjectModel('Answer')
    private readonly answerModel: Model<Answer>,
    @InjectModel('QuestionAndAnswer')
    private readonly questionAndAnswerModel: Model<QuestionAndAnswer>,
    @InjectModel('Question')
    private readonly questionModel: Model<Question>,
    @InjectModel('Product') private readonly productModel: Model<Product>,
    @InjectModel('User') private readonly userModel: Model<User>,
    @InjectModel('ItemPurchasedUsers')
    private readonly itemPurchasedUsersModel: Model<ItemPurchasedUser>,
  ) {}

  async getProductQuestionAndAnswers(productId: string) {
    if (productId.match(/^[0-9a-fA-F]{24}$/)) {
      const product = await this.productModel.findById(productId);
      const qAndA = await this.questionAndAnswerModel
        .find({
          productCode: product.productCode,
          isApproved: true,
        })
        .limit(5);
      return qAndA as QuestionAndAnswer[];
    } else {
      throw new NotFoundException('product id is not valid');
    }
  }

  async getAllProductQuestionAndAnswers(productId: string) {
    if (productId.match(/^[0-9a-fA-F]{24}$/)) {
      const product = await this.productModel.findById(productId);
      const qAndA = await this.questionAndAnswerModel.find({
        productCode: product.productCode,
        isApproved: true,
      });
      return qAndA as QuestionAndAnswer[];
    } else {
      throw new NotFoundException('product id is not valid');
    }

    const questionAndAnswers = await this.questionAndAnswerModel.find({
      productId: productId,
    });
    return questionAndAnswers;
  }

  async createQuestion(userId: string, entireBody: CreateQuestionDto) {
    // getting user details
    const userDetails = await this._getUserDetails(userId);

    const productDetails = await this.productModel.findById(
      entireBody.productId,
    );
    // creating question object
    const newQuestion = new this.questionModel({
      userId: userId,
      userName: userDetails.userName,
      userRole: userDetails.userRole,
      productId: entireBody.productId,
      question: entireBody.question,
      productDetails: {
        id: entireBody.productId,
        imageUrl: productDetails.imageUrls.coverImage,
        title: productDetails.title,
        color: productDetails.moreDetails.color,
        condition: productDetails.condition,
        brand: productDetails.brand,
        category: productDetails.category,
      },
      // productTitle : entireBody.productTitle,
    });
    newQuestion.save();
    const newQAndA = new this.questionAndAnswerModel({
      userId: newQuestion.userId,
      userName: newQuestion.userName,
      userRole: newQuestion.userRole,
      productId: newQuestion.productId,
      questionDetails: {
        // productTitle : entireBody.productTitle,
        questionId: newQuestion._id,
        isApproved: newQuestion.isApproved,
        question: newQuestion.question,
        timestamp: newQuestion.timestamp,
      },
      productDetails: {
        id: entireBody.productId,
        imageUrl: productDetails.imageUrls.coverImage,
        title: productDetails.title,
        color: productDetails.moreDetails.color,
        condition: productDetails.condition,
        brand: productDetails.brand,
        category: productDetails.category,
      },
    });
    newQAndA.save();
    return {
      status: 'success',
      message: 'question is added successfully',
    };
    // saving question in db
  }

  async approveQuestion(userId: string, questionId: string) {
    const question = await this.questionModel
      .findByIdAndUpdate(questionId, {
        isApproved: true,
      })
      .select('+userId');
    console.log('questions', question);
    const newQAndA = new this.questionAndAnswerModel({
      userId: question.userId,
      userName: question.userName,
      userRole: question.userRole,
      productId: question.productId,
      questionDetails: {
        questionId: question._id,
        isApproved: question.isApproved,
        question: question.question,
        timestamp: question.timestamp,
      },
    });
    newQAndA.save();

    const users = await this.itemPurchasedUsersModel.findOne({
      productId: newQAndA.productId,
    });

    console.log('updating question', question);
  }

  async createAnswer(userId: string, entireBody: CreateAnswerDto) {
    console.log('creating answer', entireBody);
    // const userDetails = await this._getUserDetails(userId);
    const user = await this.userModel.findByIdAndUpdate(userId, {
      $push: { answeredQuestionIds: entireBody.questionId },
    });
    const newAnswer = new this.answerModel({
      userId: userId,
      productId: entireBody.productId,
      userName: user.name,
      userRole: 'user',
      questionId: entireBody.questionId,
      questionDetails: {
        questionTitle: entireBody.questionTitle,
        productTitle: entireBody.productTitle,
      },
      answer: entireBody.answer,
    });
    await newAnswer.save();
    this.approveAnswer(newAnswer._id.toString());
    console.log('answer craeted');
  }

  async approveAnswer(answerId: string) {
    const answer = await this.answerModel
      .findByIdAndUpdate(answerId, {
        isApproved: true,
      })
      .select('+userId');
    console.log('new answer', answer);

    await this.questionAndAnswerModel.findOneAndUpdate(
      {
        'questionDetails.questionId': answer.questionId,
      },
      { $push: { answers: answer } },
    );
  }

  async getUserQuestions(userId: string) {
    const questionAndAnswers = await this.questionAndAnswerModel.find({
      userId: userId,
    });
    return questionAndAnswers;
  }

  async getUserAnswers(userId: string) {
    const answers = await this.answerModel.find({ userId: userId });
    console.log('answers', answers);
    return answers;
  }

  async _getUserDetails(userId: string) {
    console.log('user details', userId);
    const user = await this.userModel
      .findById(userId, { name: 1 })
      .select('+userRole');
    console.log('user', user);
    return {
      userName: user.name,
      userRole: user.userRole,
    };
  }

  async getQuestionsFeed(userId: string) {
    const user = await this.userModel.findById(userId);
    console.log('iiii', user.purchasedItemIds);
    const questions = await this.questionAndAnswerModel.find({
      productId: { $in: user.purchasedItemIds },
      'questionDetails.questionId': { $nin: user.answeredQuestionIds },
    });
    return questions;
  }

  //admin

  async getNewQuestions() {
    const questions = await this.questionModel.find({ isApproved: false });
    return questions as Question[];
  }

  async getApprovedQAndA() {
    const qAndA = await this.questionAndAnswerModel.find({ isApproved: true });
    return qAndA as QuestionAndAnswer[];
  }

  async getNewAnswers() {
    const answers = await this.answerModel.find({ isApproved: false });
    return answers as Answer[];
  }

  async getApprovedAnswers() {
    const answers = await this.answerModel.find({ isApproved: true });
    return answers as Answer[];
  }
}

// async getQuestionAndAnswers(productId: string) {
//   const questionAndAnswer = await this.questionAndAnswerModel.find(
//     { productId: { $eq: productId }, 'questionDetails.isApproved': true },
//     //   questionId,
//     //   { 'questionDetails.isApproved.$.': true },
//   );
//   return questionAndAnswer;
// }

// $and: [
//   { productId: { $in: user.purchasedItemIds } },
//   { product: { $in: !user.answeredQuestionIds } },
// ],
// productId: { $in: [user.purchasedItemIds] },
// productId: { $in: !user.answeredQuestionIds },
