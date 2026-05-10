import { ApiProperty } from '@nestjs/swagger';

export class CategoryResponseDto {
  @ApiProperty({
    example: 'uuid-9fef-befa72ddae7f',
    description: 'ไอดีของประเภท',
  })
  id: string;

  @ApiProperty({ example: 'Smart Phone', description: 'ชื่อประเภท' })
  name: string;

  @ApiProperty({ example: true, description: 'สถานะการเปิดใช้งานประเภทสินค้า' })
  is_active: boolean;

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
