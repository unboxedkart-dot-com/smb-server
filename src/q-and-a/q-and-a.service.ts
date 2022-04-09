import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Answer } from 'src/models/answer.model';
import { Question } from 'src/models/question.model';
import { QuestionAndAnswer } from 'src/models/q_and_a.model';
import { User } from 'src/models/user.model';

@Injectable()
export class QAndAService {
  constructor(
    @InjectModel('Answer')
    private readonly answerModel: Model<Answer>,
    @InjectModel('QuestionAndAnswer')
    private readonly questionAndAnswerModel: Model<QuestionAndAnswer>,
    @InjectModel('Question')
    private readonly questionModel: Model<Question>,

    @InjectModel('User') private readonly userModel: Model<User>,
  ) {}

  async getProductQuestionAndAnswers(productId : string){
    const questionAndAnswers = await this.questionAndAnswerModel.find({productId : productId});
    return questionAndAnswers;
  }

  async createQuestion(userId: string, question: string, productId: string) {
    // getting user details
    const userDetails = await this._getUserDetails(userId);
    // creating question object
    const newQuestion = new this.questionModel({
      userId: userId,
      userName: userDetails.userName,
      userRole: 'user',
      productId: productId,
      question: question,
    });
    // saving question in db
    newQuestion.save();
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

  async createAnswer(userId: string, answer: string, questionId: string) {
    const userDetails = await this._getUserDetails(userId);
    const newAnswer = new this.answerModel({
      userId: userId,
      userName: userDetails.userName,
      userRole: 'user',
      questionId: questionId,
      answer : answer,
    });

    newAnswer.save();
  }

  async approveAnswer(answerId: string) {
    const answer = await this.answerModel
      .findByIdAndUpdate(answerId, {
        isApproved: true,
      })
      .select('+userId');
    console.log("new answer", answer);

    await this.questionAndAnswerModel.findOneAndUpdate(
      {
        'questionDetails.questionId': answer.questionId,
      },
      { $push: { answers:  answer  } },
    );
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