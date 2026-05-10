import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Category } from '../../category/entity/category.entity';
import { Brand } from '../../brand/entity/brand.entity';
import { ProductVariant } from '../../product-variant/entity/product-variant.entity';
import { Review } from '../../review/entity/review.entity';
import slugify from 'slugify';

@Entity('products')
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Index({ unique: true })
  @Column({ type: 'varchar', length: 255 })
  slug: string;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ name: 'thumbnail', type: 'text' })
  thumbnail: string;

  @Column({ name: 'is_active', default: true })
  is_active: boolean;

  @Column()
  category_id: string;

  @Column()
  brand_id: string;

  @ManyToOne(() => Category, (category) => category.products)
  @JoinColumn({ name: 'category_id' })
  category: Category;

  @ManyToOne(() => Brand, (brand) => brand.products)
  @JoinColumn({ name: 'brand_id' })
  brand: Brand;

  @CreateDateColumn({ name: 'created_at' })
  created_at: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updated_at: Date;

  @OneToMany(() => ProductVariant, (variant) => variant.product, {
    cascade: true,
  })
  variants: ProductVariant[];

  @OneToMany(() => Review, (review) => review.product)
  reviews: Review[];

  @BeforeInsert()
  generateSlug() {
    if (!this.slug) {
      this.slug = slugify(this.name, { lower: true, strict: true });
    }
  }
}
