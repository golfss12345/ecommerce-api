import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Brand } from './entity/brand.entity';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { CreateBrandDto } from './dto/create-brand.dto';

@Injectable()
export class BrandRepository extends Repository<Brand> {
  constructor(private readonly dataSource: DataSource) {
    super(Brand, dataSource.createEntityManager());
  }

  async findAll(): Promise<Brand[]> {
    return await this.find({ where: { is_active: true } });
  }

  async findOneByName(name: string | undefined): Promise<Brand | null> {
    return await this.findOneBy({ name, is_active: true });
  }

  async findOneById(id: string): Promise<Brand | null> {
    return await this.createQueryBuilder('brand')
      .where('brand.id = :id', { id })
      .andWhere('brand.is_active = :is_active', { is_active: true })
      .getOne();
  }

  async createBrand(data: CreateBrandDto): Promise<Brand> {
    return await this.save(data);
  }

  async updateBrand(id: string, data: UpdateBrandDto): Promise<Brand | null> {
    await this.update(id, data);
    return await this.findOneById(id);
  }

  async updateActiveBrand(id: string): Promise<string> {
    await this.update(id, { is_active: false });
    return 'Brand updated successfully';
  }
}
