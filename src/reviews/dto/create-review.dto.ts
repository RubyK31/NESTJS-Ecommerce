import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateReviewDto {
  @IsNotEmpty({ message: 'ProductId should not be empty' })
  @IsNumber({}, { message: 'ProductId should be a numeric value' })
  productId: number;

  @IsNotEmpty({ message: 'Ratings should not be empty' })
  @IsNumber({}, { message: 'Ratings should be a numeric value' })
  ratings: number;

  @IsNotEmpty({ message: 'Comment should not be empty' })
  @IsString({ message: 'Comment should be a string' })
  comment: string;
}
