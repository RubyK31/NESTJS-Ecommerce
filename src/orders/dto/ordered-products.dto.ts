import { IsNotEmpty, IsNumber, IsPositive } from 'class-validator';

export class OrderedProductsDto {
  @IsNotEmpty({ message: 'Product can not be empty' })
  id: number;

  @IsNumber(
    { maxDecimalPlaces: 2 },
    { message: 'Price should be a value with max two decimal precision' },
  )
  @IsPositive({ message: 'Price must be a positive value' })
  product_unit_price: number;

  @IsNumber({}, { message: 'Quantity should be a value' })
  @IsPositive({ message: 'Quantity must be a positive value' })
  product_quantity: number;
}
