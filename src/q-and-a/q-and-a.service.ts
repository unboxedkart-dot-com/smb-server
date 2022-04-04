import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { QuestionAndAnswer } from 'src/models/q_and_a.model';
import { User } from 'src/models/user.model';

@Injectable()
export class QAndAService {
  constructor(
    @InjectModel('Answer')
    private readonly answerModel: Model<QuestionAndAnswer>,
    @InjectModel('QuestionAndAnswer')
    private readonly questionAndAnswerModel: Model<QuestionAndAnswer>,
    @InjectModel('User') private readonly userModel: Model<User>,
  ) {}

  async getQuestionAndAnswers(productId: string) {
    const questionAndAnswer = await this.questionAndAnswerModel.find(
      { productId: { $eq: productId }, 'questionDetails.isApproved': true },
      //   questionId,
      //   { 'questionDetails.isApproved.$.': true },
    );
    return questionAndAnswer;
  }

  async createAnswer(userId: string, answer: string, questionId: string) {
    const userDetails = await this._getUserDetails(userId);
    const newAnswer = new this.answerModel({
      userId: userId,
      userName: userDetails.userName,
      userRole: 'user',
      questionId: questionId,
      answerDetails: {
        //   productId : productId,
        answer: answer,
      },
    });

    newAnswer.save();
  }

  async approveQuestion(questionId: string) {
    await this.questionAndAnswerModel.findByIdAndUpdate(questionId, {
      'questionDetails.isApproved': true,
    });
  }

  async approveAnswer(answerId: string) {
    await this.answerModel.findByIdAndUpdate(answerId, {
      'answerDetails.isApproved': true,
    });
  }

  async createQuestion(userId: string, question: string, productId: string) {
    // getting user details
    const userDetails = await this._getUserDetails(userId);
    // creating question object
    const newQuestion = new this.questionAndAnswerModel({
      userId: userId,
      userName: userDetails.userName,
      userRole: 'user',
      productId: productId,
      questionDetails: {
        question: question,
      },
    });
    // saving question in db
    newQuestion.save();
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
