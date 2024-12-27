import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  Min,
} from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty({ message: 'Title can not be empty' })
  @IsString({ message: 'Title must be a string' })
  title: string;

  @IsNotEmpty({ message: 'Description can not be empty' })
  @IsString({ message: 'Description must be a string' })
  description: string;

  @IsNotEmpty({ message: 'Price can not be empty' })
  @IsNumber(
    { maxDecimalPlaces: 2 },
    { message: 'Price must be a value with maximum two decimal precision' },
  )
  @IsPositive({ message: 'Price can not be a negative value' })
  price: number;

  @IsNotEmpty({ message: 'Stock can not be empty' })
  @IsNumber({}, { message: 'Stock must have a value' })
  @Min(0, { message: 'Stock can not have a negative value' })
  stock: number;

  @IsNotEmpty({ message: 'Images should not be empty' })
  @IsArray({ message: 'Images must be in array format' })
  images: string[];

  @IsNotEmpty({ message: 'Category can not be empty' })
  @IsNumber({}, { message: 'Category id should be a number' })
  categoryId: number;
}
