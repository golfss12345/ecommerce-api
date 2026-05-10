import { Injectable } from '@nestjs/common';
import { Repository, DataSource } from 'typeorm';
import { ProductVariant } from './entity/product-variant.entity';
import { CreateProductVariantDto } from './dto/create-product-variant.dto';
import { UpdateProductVariantDto } from './dto/update-product-variant.dto';

@Injectable()
export class ProductVariantRepository extends Repository<ProductVariant> {
  constructor(private readonly dataSource: DataSource) {
    super(ProductVariant, dataSource.createEntityManager());
  }

  async findByProductId(product_id: string): Promise<ProductVariant[]> {
    return await this.createQueryBuilder('product_variant')
      .leftJoinAndSelect('product_variant.product', 'product')
      .where('product_variant.product_id = :product_id', { product_id })
      .andWhere('product_variant.is_active = :is_active', { is_active: true })
      .getMany();
  }

  async findOneBySku(sku: string | undefined): Promise<ProductVariant | null> {
    return await this.createQueryBuilder('product_variant')
      .leftJoinAndSelect('product_variant.product', 'product')
      .where('product_variant.sku = :sku', { sku })
      .andWhere('product_variant.is_active = :is_active', { is_active: true })
      .getOne();
  }

  async findOneById(id: string): Promise<ProductVariant | null> {
    return await this.createQueryBuilder('product_variant')
      .leftJoinAndSelect('product_variant.product', 'product')
      .where('product_variant.id = :id', { id })
      .andWhere('product_variant.is_active = :is_active', { is_active: true })
      .getOne();
  }

  async createProductVariant(
    data: CreateProductVariantDto,
  ): Promise<ProductVariant> {
    const variant = this.create(data);
    return await this.save(variant);
  }

  async updateProductVariant(
    id: string,
    data: UpdateProductVariantDto,
  ): Promise<ProductVariant | null> {
    await this.update(id, data);
    return await this.findOneBy({ id, is_active: true });
  }

  async updateActiveProductVariant(id: string): Promise<string> {
    await this.update(id, { is_active: false });
    return 'Product variant updated successfully';
  }
}
