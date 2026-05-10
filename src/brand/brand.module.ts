import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Brand } from './entity/brand.entity';
import { BrandController } from './brand.controller';
import { BrandService } from './brand.service';
import { BrandRepository } from './brand.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Brand])],
  controllers: [BrandController],
  providers: [BrandService, BrandRepository],
})
export class BrandModule {}
