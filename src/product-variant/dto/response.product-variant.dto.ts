import { ApiProperty } from '@nestjs/swagger';
import { Product } from '../../product/entity/product.entity';
import { ProductResponseDto } from '../../product/dto/response-product.dto';

class ProductAttributeDto {
  @ApiProperty({ example: 'Black', description: 'สีของสินค้า' })
  color: string;

  @ApiProperty({ example: '256 GB', description: 'ความจุหรือขนาดของสินค้า' })
  size: string;
}

export class ProductVariantResponseDto {
  @ApiProperty({
    example: 'uuid-9fef-befa72ddae7f',
    description: 'ไอดีของประเภท',
  })
  id: string;

  @ApiProperty({ example: 'APL-IP15P-256-BLK', description: 'รหัสสินค้า' })
  sku: string;

  @ApiProperty({
    example: 24000,
    description: 'ราคาสินค้า',
  })
  price: number;

  @ApiProperty({
    example: 10,
    description: 'จำนวณสินค้าที่มีใน Stock',
  })
  stock: number;

  @ApiProperty({ example: 'image url', description: 'รูปตัวเลือกสินค้า' })
  image_url: string;

  @ApiProperty({
    description: 'คุณลักษณะหรือตัวเลือกของสินค้า',
    type: ProductAttributeDto,
  })
  attributes: ProductAttributeDto;

  @ApiProperty({
    example: true,
    description: 'สถานะการเปิดใช้งานตัวเลือกสินค้า',
  })
  is_active: boolean;

  @ApiProperty({
    type: () => ProductResponseDto,
    description: 'ข้อมูลรายละเอียดของสินค้าที่เกี่ยวข้อง',
  })
  product: Product;

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
