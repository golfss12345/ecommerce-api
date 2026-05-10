import { ApiProperty } from '@nestjs/swagger';
import { Category } from '../../category/entity/category.entity';
import { Brand } from '../../brand/entity/brand.entity';
import { CategoryResponseDto } from '../../category/dto/response.category';
import { BrandResponseDto } from '../../brand/dto/response-brand.dto';
import { ProductVariantResponseDto } from '../../product-variant/dto/response.product-variant.dto';
import { ProductVariant } from '../../product-variant/entity/product-variant.entity';

export class ProductResponseDto {
  @ApiProperty({
    example: 'uuid-9fef-befa72ddae7f',
    description: 'ไอดีของประเภท',
  })
  id: string;

  @ApiProperty({ example: 'iphone-15-pro', description: 'ชื่อสินค้า' })
  slug: string;

  @ApiProperty({
    example: 'iPhone 15 pro',
    description: 'ชื่อสินค้า (URL Slug)',
  })
  name: string;

  @ApiProperty({
    example: 'iPhone 15 pro สี....',
    description: 'รายละเอียดของสินค้า',
  })
  descriptiion: string;

  @ApiProperty({ example: 'image url', description: 'รูปสินค้า' })
  thumnail: string;

  @ApiProperty({ example: true, description: 'สถานะการเปิดใช้งานสินค้า' })
  is_active: boolean;

  @ApiProperty({ type: () => CategoryResponseDto, description: 'ประเภทสินค้า' })
  category: Category;

  @ApiProperty({ type: () => BrandResponseDto, description: 'แบรนด์' })
  brand: Brand;

  @ApiProperty({
    type: () => ProductVariantResponseDto,
    description: 'ตัวเลือกสินค้า',
    isArray: true,
  })
  product_variant: ProductVariant;

  @ApiProperty({
    example: '2026-05-09T08:00:00.000Z',
    description: 'วันที่สร้าง',
  })
  created_at: Date;

  @ApiProperty({
    example: '2026-05-09T08:00:00.000Z',
    description: 'วันที่อัพเดท',
  })
  updated_at: Date;
}
