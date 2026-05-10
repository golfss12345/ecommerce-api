import {
  ConflictException,
  HttpException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CategoryRepository } from './category.repository';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoryService {
  constructor(private readonly categoryRepository: CategoryRepository) {}

  async findAll() {
    try {
      return await this.categoryRepository.findAll();
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      console.error('Error retrieving categories:', error);
      throw new InternalServerErrorException('Failed to retrieve categories');
    }
  }

  async findOneById(id: string) {
    try {
      const categoryExist = await this.categoryRepository.findOneById(id);
      if (!categoryExist) throw new NotFoundException('category not found');
      return categoryExist;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      console.error(`Error retrieving category with id ${id}:`, error);
      throw new InternalServerErrorException('Failed to retrieve category');
    }
  }

  async createCategory(data: CreateCategoryDto) {
    try {
      const { name } = data;
      const categoryExist = await this.categoryRepository.findOneByName(name);
      if (categoryExist) {
        throw new ConflictException('Category already exists');
      }
      return this.categoryRepository.createCategory(data);
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      console.error('Error creating category:', error);
      throw new InternalServerErrorException('Failed to create category');
    }
  }

  async updateCategory(id: string, data: UpdateCategoryDto) {
    try {
      const { name } = data;
      const categoryExist = await this.categoryRepository.findOneById(id);
      if (!categoryExist) {
        throw new NotFoundException('Category not found');
      }
      const checkName = await this.categoryRepository.findOneByName(name);
      if (checkName && name && checkName.id !== id && checkName.name === name) {
        throw new ConflictException('Category name already exists');
      }
      return this.categoryRepository.updateCategory(id, data);
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      console.error(`Error updating category with id ${id}:`, error);
      throw new InternalServerErrorException('Failed to update category');
    }
  }

  async softDeleteCategory(id: string) {
    try {
      const categoryExist = await this.categoryRepository.findOneById(id);
      if (!categoryExist) {
        throw new NotFoundException('category not found');
      }
      return this.categoryRepository.updateActiveCategory(id);
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      console.error(`Error deleting category with id ${id}:`, error);
      throw new InternalServerErrorException('Failed to delete category');
    }
  }
}
