import { Injectable } from '@nestjs/common';
import { Review } from './entity/review.entity';
import { Brackets, DataSource, Repository } from 'typeorm';
import { SearchReviewPaginationDto } from './dto/search-review.dto';
import { PaginationResult } from '../common/interfaces/pagination-result.interface';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';

@Injectable()
export class ReviewRepository extends Repository<Review> {
  constructor(private readonly dataSource: DataSource) {
    super(Review, dataSource.createEntityManager());
  }

  async findReviewsPaginated(
    searchReviewPaginationDto: SearchReviewPaginationDto,
  ): Promise<PaginationResult<Review>> {
    const {
      page,
      limit,
      product_id,
      user_id,
      username,
      productName,
      slug,
      search,
      status,
    } = searchReviewPaginationDto;
    const qb = super
      .createQueryBuilder('review')
      .leftJoinAndSelect('review.user', 'user')
      .leftJoinAndSelect('review.product', 'product');
    if (search) {
      qb.andWhere(
        new Brackets((qb) => {
          qb.where('user.username ILIKE :search', { search: `%${search}%` })
            .orWhere('product.name ILIKE :search', { search: `%${search}%` })
            .orWhere('review.title ILIKE :search', { search: `%${search}%` })
            .orWhere('review.comment ILIKE :search', { search: `%${search}%` });
        }),
      );
    }
    if (product_id) {
      qb.andWhere('review.product_id = :product_id', { product_id });
    }
    if (user_id) {
      qb.andWhere('review.user_id = :user_id', { user_id });
    }
    if (username) {
      qb.andWhere('user.username ILIKE :username', {
        username: `%${username}%`,
      });
    }
    if (productName) {
      qb.andWhere('product.name ILIKE :productName', {
        productName: `%${productName}%`,
      });
    }
    if (slug) {
      qb.andWhere('product.slug = :slug', {
        slug: slug,
      });
    }
    qb.andWhere('review.status = :status', { status: status });
    qb.skip((page - 1) * limit)
      .take(limit)
      .orderBy('review.created_at', 'DESC');

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

  async findOneById(id: string): Promise<Review | null> {
    return await this.createQueryBuilder('review')
      .leftJoinAndSelect('review.user', 'user')
      .leftJoinAndSelect('review.product', 'product')
      .where('review.id = :id', { id })
      .andWhere('review.is_verified = :is_verified', { is_verified: true })
      .getOne();
  }

  async createReview(data: CreateReviewDto): Promise<Review> {
    const review = this.create(data);
    return await this.save(review);
  }

  async updateReview(
    id: string,
    data: UpdateReviewDto,
  ): Promise<Review | null> {
    await this.update(id, data);
    return await this.findOneById(id);
  }

  async updateActiveReview(id: string): Promise<string> {
    await this.update(id, { is_active: false });
    return 'Review updated successfully';
  }
}
