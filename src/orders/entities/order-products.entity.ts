import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { OrderEntity } from './order.entity';
import { ProductEntity } from 'src/products/entities/product.entity';

@Entity('orders_products')
export class OrderProductsEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  product_unit_price: number;
  @Column()
  product_quantity: number;

  @ManyToOne(() => OrderEntity, (order) => order.products)
  order: OrderEntity;

  @ManyToOne(() => ProductEntity, (prod) => prod.products, { cascade: true })
  product: ProductEntity;
}
