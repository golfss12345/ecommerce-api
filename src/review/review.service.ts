import {
  HttpException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { ReviewRepository } from './review.repository';
import { SearchReviewPaginationDto } from './dto/search-review.dto';
import { CreateReviewDto } from './dto/create-review.dto';
import { ProductService } from '../product/product.service';
import { UpdateReviewDto } from './dto/update-review.dto';
import { UserService } from '../user/user.service';

@Injectable()
export class ReviewService {
  constructor(
    private readonly reviewRepository: ReviewRepository,
    private productService: ProductService,
    private userService: UserService,
  ) {}

  async findReviewPaginated(
    searchReviewPaginationDto: SearchReviewPaginationDto,
  ) {
    try {
      return await this.reviewRepository.findReviewsPaginated(
        searchReviewPaginationDto,
      );
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      console.error('Error retrieving reviews:', error);
      throw new InternalServerErrorException('Failed to retrieve reviews');
    }
  }

  async createReview(createReviewDto: CreateReviewDto) {
    try {
      const { product_id, user_id } = createReviewDto;
      await this.productService.findProductById(product_id);
      await this.userService.findUserById(user_id);
      return await this.reviewRepository.createReview(createReviewDto);
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      console.error('Error creating review:', error);
      throw new InternalServerErrorException('Failed to create review');
    }
  }

  async updateReview(id: string, data: UpdateReviewDto) {
    try {
      const { reply } = data;
      console.log({ id });

      const reviewExist = await this.reviewRepository.findOneById(id);
      console.log({ reviewExist });

      if (!reviewExist) {
        throw new NotFoundException('review not found');
      }
      if (reply) {
        data.replied_at = new Date();
      }
      return this.reviewRepository.updateReview(id, data);
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      console.error(`Error updating review with id ${id}:`, error);
      throw new InternalServerErrorException('Failed to update review');
    }
  }

  async softDeleteReview(id: string) {
    try {
      const reviewExist = await this.reviewRepository.findOneById(id);
      if (!reviewExist) {
        throw new NotFoundException('review not found');
      }
      return this.reviewRepository.updateActiveReview(id);
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      console.error(`Error deleting review with id ${id}:`, error);
      throw new InternalServerErrorException('Failed to delete review');
    }
  }
}
