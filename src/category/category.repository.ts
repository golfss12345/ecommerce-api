import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Category } from './entity/category.entity';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoryRepository extends Repository<Category> {
  constructor(private readonly dataSource: DataSource) {
    super(Category, dataSource.createEntityManager());
  }

  async findAll(): Promise<Category[]> {
    return await this.find({ where: { is_active: true } });
  }

  async findOneById(id: string): Promise<Category | null> {
    return await this.findOneBy({ id, is_active: true });
  }

  async findOneByName(name: string | undefined): Promise<Category | null> {
    return await this.findOne({ where: { name, is_active: true } });
  }

  async createCategory(data: CreateCategoryDto): Promise<Category> {
    return await this.save(data);
  }

  async updateCategory(
    id: string,
    data: UpdateCategoryDto,
  ): Promise<Category | null> {
    await this.update(id, data);
    return await this.findOneById(id);
  }

  async updateActiveCategory(id: string): Promise<string> {
    await this.update(id, { is_active: false });
    return 'Category updated successfully';
  }
}
