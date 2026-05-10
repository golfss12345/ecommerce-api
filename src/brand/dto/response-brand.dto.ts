import { ApiProperty } from '@nestjs/swagger';

export class BrandResponseDto {
  @ApiProperty({
    example: 'uuid-9fef-befa72ddae7f',
    description: 'ไอดีของแบรนด์',
  })
  id: string;

  @ApiProperty({ example: 'Apple', description: 'ชื่อแบรนด์' })
  name: string;

  @ApiProperty({ example: true, description: 'สถานะการเปิดใช้งานแบรนด์' })
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
