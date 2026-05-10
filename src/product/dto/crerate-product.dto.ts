import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class CreateProductDto {
  @ApiProperty({
    description: 'ชื่อสินค้า',
    example: 'iPhone 15 Pro',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'รายละเอียดสิค้า',
    example: 'โทรศัพท์ผลิดจากโรงงานที่ดี',
  })
  @IsString()
  description: string;

  @ApiProperty({
    description: 'รูปภาพสินค้า',
    example: 'image url',
  })
  @IsString()
  thumbnail: string;

  @ApiProperty({
    description: 'ประเภทสินค้า',
    example: '042a5484-4e4c-4b44-a7df-4de99148405c',
  })
  @IsUUID()
  @IsNotEmpty()
  category_id: string;

  @ApiProperty({
    description: 'แบรนด์สินค้า',
    example: '41686102-5eed-46c0-9fef-befa72ddae7f',
  })
  @IsUUID()
  @IsNotEmpty()
  brand_id: string;
}
