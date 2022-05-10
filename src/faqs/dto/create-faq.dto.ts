import { IsNotEmpty, IsString } from 'class-validator';

export class CreateFaqDto {
  // @IsString()
  // @IsNotEmpty()

  @IsString()
  @IsNotEmpty()
  question: string;

  @IsString()
  @IsNotEmpty()
  answer: string;
}
