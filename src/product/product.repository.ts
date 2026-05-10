import { Injectable } from '@nestjs/common';
import { Product } from './entity/product.entity';
import { Repository, DataSource, Brackets } from 'typeorm';
import { PaginationResult } from '../common/interfaces/pagination-result.interface';
import { SearchProductPaginationDto } from './dto/search-product.dto';
import { CreateProductDto } from './dto/crerate-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductRepository extends Repository<Product> {
  constructor(private readonly dataSource: DataSource) {
    super(Product, dataSource.createEntityManager());
  }

  async findProductsPaginated(
    searchProductPaginationDto: SearchProductPaginationDto,
  ): Promise<PaginationResult<Product>> {
    const { page, limit, name, category_name, brand_name, search } =
      searchProductPaginationDto;
    const qb = super
      .createQueryBuilder('product')
      .leftJoinAndSelect('product.category', 'category')
      .leftJoinAndSelect('product.brand', 'brand')
      .leftJoinAndSelect('product.variants', 'variants');
    if (search) {
      qb.andWhere(
        new Brackets((qb) => {
          qb.where('product.name ILIKE :search', { search: `%${search}%` })
            .orWhere('category.name ILIKE :search', { search: `%${search}%` })
            .orWhere('brand.name ILIKE :search', { search: `%${search}%` });
        }),
      );
    }
    if (name) {
      qb.andWhere('product.name ILIKE :name', { name: `%${name}%` });
    }
    if (category_name) {
      qb.andWhere('category.name ILIKE :category_name', {
        category_name: `%${category_name}%`,
      });
    }
    if (brand_name) {
      qb.andWhere('brand.name ILIKE :brand_name', {
        brand_name: `%${brand_name}%`,
      });
    }
    qb.andWhere('product.is_active = :is_active', { is_active: true });

    qb.skip((page - 1) * limit)
      .take(limit)
      .orderBy('product.created_at', 'DESC');

    const [data, total] = await qb.getManyAndCount();

    const totalPages = limit > 0 ? Math.ceil(total / limit) : 0;
    return {
      data,
      meta: {
        totalItems: total,
        itemCount: data.length,
        itemsPerPage: limit,
        totalPages: totalPages,
        currentPage: page,
      },
    };
  }

  async findOneBySlug(slug: string): Promise<Product | null> {
    return await this.createQueryBuilder('product')
      .leftJoinAndSelect('product.category', 'category')
      .leftJoinAndSelect('product.brand', 'brand')
      .leftJoinAndSelect('product.variants', 'variants')
      .where('product.slug = :slug', { slug })
      .andWhere('product.is_active = :is_active', { is_active: true })
      .addOrderBy('variants.created_at', 'ASC')
      .getOne();
  }

  async findOneById(id: string): Promise<Product | null> {
    return await this.createQueryBuilder('product')
      .leftJoinAndSelect('product.category', 'category')
      .leftJoinAndSelect('product.brand', 'brand')
      .leftJoinAndSelect('product.variants', 'variants')
      .where('product.id = :id', { id })
      .andWhere('product.is_active = :is_active', { is_active: true })
      .addOrderBy('variants.created_at', 'ASC')
      .getOne();
  }

  async createProduct(data: CreateProductDto): Promise<Product> {
    const product = this.create(data);
    return await this.save(product);
  }

  async updateActiveProduct(id: string): Promise<string> {
    await this.update(id, { is_active: false });
    return 'Product updated successfully';
  }

  async updateProduct(
    id: string,
    data: UpdateProductDto,
  ): Promise<Product | null> {
    await this.update(id, data);
    return await this.findOneById(id);
  }
}
