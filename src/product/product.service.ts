import {
  HttpException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { ProductRepository } from './product.repository';
import { SearchProductPaginationDto } from './dto/search-product.dto';
import { CreateProductDto } from './dto/crerate-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductService {
  constructor(private readonly productRepository: ProductRepository) {}

  async findAllPagination(
    searchProductPaginationDto: SearchProductPaginationDto,
  ) {
    try {
      return await this.productRepository.findProductsPaginated(
        searchProductPaginationDto,
      );
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      console.error('Error retrieving products:', error);
      throw new InternalServerErrorException('Failed to retrieve products');
    }
  }

  async findSlugProduct(slug: string) {
    try {
      const productExist = await this.productRepository.findOneBySlug(slug);
      if (!productExist) throw new NotFoundException('Product not Found');
      return productExist;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      console.error(`Error retrieving product with slug ${slug}:`, error);
      throw new InternalServerErrorException('Failed to retrieve product');
    }
  }

  async findProductById(id: string) {
    try {
      const productExist = await this.productRepository.findOneById(id);

      if (!productExist) {
        throw new NotFoundException('Product not Found');
      }
      return productExist;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      console.error(`Error retrieving product with slug ${id}:`, error);
      throw new InternalServerErrorException('Failed to retrieve product');
    }
  }

  async createProduct(createProductDto: CreateProductDto) {
    try {
      return await this.productRepository.createProduct(createProductDto);
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      console.error('Error creating product:', error);
      throw new InternalServerErrorException('Failed to create product');
    }
  }

  async updateProduct(id: string, updateProductDto: UpdateProductDto) {
    try {
      await this.findProductById(id);
      return this.productRepository.updateProduct(id, updateProductDto);
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      console.error(`Error updating product with id ${id}:`, error);
      throw new InternalServerErrorException('Failed to update product');
    }
  }

  async softDeleteProduct(id: string) {
    try {
      await this.findProductById(id);
      const res = await this.productRepository.updateActiveProduct(id);
      return {
        statusCode: 200,
        message: res,
      };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      console.error(`Error deleting product with id ${id}:`, error);
      throw new InternalServerErrorException('Failed to delete product');
    }
  }
}
