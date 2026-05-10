import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsString,
  IsUUID,
  Min,
} from 'class-validator';

export class CreateProductVariantDto {
  @ApiProperty({
    description: 'รหัสสินค้า',
    example: 'APL-IP15P-256-BLK',
  })
  @IsString()
  @IsNotEmpty()
  sku: string;

  @ApiProperty({
    description: 'ราคาสินค้าต่อหน่วย',
    example: 45900,
  })
  @IsNumber()
  @IsNotEmpty()
  @Min(0)
  price: number;

  @ApiProperty({
    description: 'จำนวนสินค้าในสต็อก',
    example: 50,
  })
  @IsNumber()
  @IsNotEmpty()
  @Min(0)
  stock: number;

  @ApiProperty({
    description: 'ไอดีของสินค้าหลัก',
    example: 'c035cf31-f1ff-4f1e-b98d-cf417dee80e2',
  })
  @IsUUID()
  @IsNotEmpty()
  product_id: string;

  @ApiProperty({
    description: 'URL รูปภาพของสินค้าเวอร์ชันนี้',
    example: 'image url',
  })
  @IsString()
  @IsNotEmpty()
  image_url: string;

  @ApiProperty({
    description: 'คุณลักษณะเฉพาะ (เช่น สี, ความจุ)',
    example: { color: 'Black', capacity: '256GB' },
  })
  @IsObject()
  @IsNotEmpty()
  attributes: Record<string, any>;
}
