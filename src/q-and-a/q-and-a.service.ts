import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Answer } from 'src/models/answer.model';
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
  ) {}

  async getProductQuestionAndAnswers(productId: string) {
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
      userRole: 'user',
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
    console.log('updating question', question);
  }

  async createAnswer(userId: string, entireBody: CreateAnswerDto) {
    const userDetails = await this._getUserDetails(userId);
    const newAnswer = new this.answerModel({
      userId: userId,
      userName: userDetails.userName,
      userRole: 'user',
      questionId: entireBody.questionId,
      questionDetails: {
        questionTitle: entireBody.questionTitle,
        productTitle: entireBody.productTitle,
      },
      answer: entireBody.answer,
    });

    newAnswer.save();
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
    const user = await this.userModel.findById(userId, { name: 1 });
    console.log('user', user);
    return {
      userName: user.name,
    };
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
