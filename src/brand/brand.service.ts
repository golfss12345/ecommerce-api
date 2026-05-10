import {
  ConflictException,
  HttpException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { BrandRepository } from './brand.repository';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';

@Injectable()
export class BrandService {
  constructor(private readonly brandRepository: BrandRepository) {}

  async findAll() {
    try {
      return this.brandRepository.findAll();
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      console.error('Error retrieving brands:', error);
      throw new InternalServerErrorException('Failed to retrieve brands');
    }
  }

  async findOneById(id: string) {
    try {
      const brandExist = await this.brandRepository.findOneById(id);
      if (!brandExist) throw new NotFoundException('Brand not found');
      return brandExist;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      console.error(`Error retrieving brand with id ${id}:`, error);
      throw new InternalServerErrorException('Failed to retrieve brand');
    }
  }

  async createBrand(data: CreateBrandDto) {
    try {
      const { name } = data;
      const brandExist = await this.brandRepository.findOneByName(name);
      if (brandExist) {
        throw new ConflictException('Brand already exists');
      }
      return this.brandRepository.createBrand(data);
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      console.error('Error creating brand:', error);
      throw new InternalServerErrorException('Failed to create brand');
    }
  }

  async updateBrand(id: string, data: UpdateBrandDto) {
    try {
      const { name } = data;
      const brandExist = await this.brandRepository.findOneById(id);
      if (!brandExist) {
        throw new NotFoundException('Brand not found');
      }
      const checkName = await this.brandRepository.findOneByName(name);
      if (checkName && name && checkName.id !== id && checkName.name === name) {
        throw new ConflictException('Brand name already exists');
      }
      return this.brandRepository.updateBrand(id, data);
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      console.error(`Error updating brand with id ${id}:`, error);
      throw new InternalServerErrorException('Failed to update brand');
    }
  }

  async softDeleteBrand(id: string) {
    try {
      const brandExist = await this.brandRepository.findOneById(id);
      if (!brandExist) {
        throw new NotFoundException('Brand not found');
      }
      return this.brandRepository.updateActiveBrand(id);
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      console.error(`Error deleting brand with id ${id}:`, error);
      throw new InternalServerErrorException('Failed to delete brand');
    }
  }
}
