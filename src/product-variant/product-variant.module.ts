import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductVariant } from './entity/product-variant.entity';
import { ProductVariantController } from './product-variant.controller';
import { ProductVariantService } from './product-variant.service';
import { ProductVariantRepository } from './product-variant.repository';
import { ProductModule } from '../product/product.module';

@Module({
  imports: [TypeOrmModule.forFeature([ProductVariant]), ProductModule],
  controllers: [ProductVariantController],
  providers: [ProductVariantService, ProductVariantRepository],
})
export class ProductVariantModule {}
