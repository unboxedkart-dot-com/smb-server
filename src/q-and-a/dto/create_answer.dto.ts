import { IsNotEmpty, IsOptional, isString, IsString } from 'class-validator';

export class CreateAnswerDto {
  @IsString()
  @IsNotEmpty()
  questionId: string;

  @IsString()
  @IsNotEmpty()
//   productId: string;

  @IsString()
  @IsNotEmpty()
  answer: string;
}
