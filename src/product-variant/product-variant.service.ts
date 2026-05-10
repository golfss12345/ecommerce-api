import {
  ConflictException,
  HttpException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { ProductVariantRepository } from './product-variant.repository';
import { CreateProductVariantDto } from './dto/create-product-variant.dto';
import { UpdateProductVariantDto } from './dto/update-product-variant.dto';
import { ProductService } from '../product/product.service';

@Injectable()
export class ProductVariantService {
  constructor(
    private readonly productVariantRepository: ProductVariantRepository,
    private productService: ProductService,
  ) {}

  async findByProductId(product_id: string) {
    try {
      return await this.productVariantRepository.findByProductId(product_id);
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      console.error('Error retrieving product variants:', error);
      throw new InternalServerErrorException(
        'Failed to retrieve product variants',
      );
    }
  }

  async createProductVariant(
    createPrroductVariantDto: CreateProductVariantDto,
  ) {
    try {
      const { sku, product_id } = createPrroductVariantDto;
      const variantExist =
        await this.productVariantRepository.findOneBySku(sku);

      if (variantExist) {
        throw new ConflictException('Variant already exists');
      }
      if (product_id) {
        await this.productService.findProductById(product_id);
      }
      return await this.productVariantRepository.createProductVariant(
        createPrroductVariantDto,
      );
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      console.error('Error creating product variant:', error);
      throw new InternalServerErrorException(
        'Failed to create product variant',
      );
    }
  }

  async updateProductVariant(id: string, data: UpdateProductVariantDto) {
    try {
      const { sku } = data;
      const categoryExist = await this.productVariantRepository.findOneById(id);
      if (!categoryExist) {
        throw new NotFoundException('Variant not found');
      }
      const checkSku = await this.productVariantRepository.findOneBySku(sku);
      if (checkSku && sku && checkSku.id !== id && checkSku.sku === sku) {
        throw new ConflictException('Variant sku already exists');
      }
      return this.productVariantRepository.updateProductVariant(id, data);
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      console.error(`Error updating variant with id ${id}:`, error);
      throw new InternalServerErrorException('Failed to update variant');
    }
  }

  async softDeleteProductVariant(id: string) {
    try {
      const variantExist = await this.productVariantRepository.findOneById(id);
      if (!variantExist) {
        throw new NotFoundException('variant not found');
      }
      return this.productVariantRepository.updateActiveProductVariant(id);
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      console.error(`Error deleting variant with id ${id}:`, error);
      throw new InternalServerErrorException('Failed to delete variant');
    }
  }
}
