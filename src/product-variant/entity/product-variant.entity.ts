import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Product } from '../../product/entity/product.entity';

@Entity('product_variants')
export class ProductVariant {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255, unique: true })
  sku: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price: number;

  @Column({ type: 'int' })
  stock: number;

  @Column({ name: 'image_url', type: 'text' })
  image_url: string;

  @Column({ type: 'jsonb', nullable: true })
  attributes: Record<string, unknown>;

  @Column({ name: 'is_active', default: true })
  is_active: boolean;

  @Column()
  product_id: string;

  @ManyToOne(() => Product, (product) => product.variants)
  @JoinColumn({ name: 'product_id' })
  product: Product;

  @CreateDateColumn({ name: 'created_at' })
  created_at: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updated_at: Date;
}
