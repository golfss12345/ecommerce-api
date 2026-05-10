import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ReviewStatus } from '../../common/enums/review-status.enum';
import { Product } from '../../product/entity/product.entity';
import { User } from '../../user/entity/user.entity';

@Entity('reviews')
export class Review {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'int' })
  rating: number;

  @Column({ type: 'text' })
  title: string;

  @Column({ type: 'text' })
  comment: string;

  @Column({ type: 'json', nullable: true })
  images: string[];

  @Column({ name: 'is_verified', default: true })
  is_verified: boolean;

  @Column({ name: 'helpful_count', default: 0 })
  helpfulCount: number;

  @Column({ type: 'enum', enum: ReviewStatus, default: ReviewStatus.PUBLISHED })
  status: ReviewStatus;

  @Column({ type: 'text', nullable: true })
  reply: string;

  @Column()
  product_id: string;

  @Column()
  user_id: string;

  @ManyToOne(() => Product, (product) => product.reviews)
  @JoinColumn({ name: 'product_id' })
  product: Product;

  @ManyToOne(() => User, (user) => user.reviews)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({ name: 'is_active', default: true })
  is_active: boolean;

  @Column({ name: 'replied_at', type: 'timestamp', nullable: true })
  repliedAt: Date;

  @CreateDateColumn({ name: 'created_at' })
  created_at: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updated_at: Date;
}
