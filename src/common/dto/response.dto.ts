import { ApiProperty } from '@nestjs/swagger';

export class PaginationMetaDto {
  @ApiProperty({
    description: 'จำนวนรายการทั้งหมดในฐานข้อมูล',
    example: 100,
  })
  totalItems: number;

  @ApiProperty({
    description: 'จำนวนรายการที่ส่งกลับมาในหน้านี้',
    example: 10,
  })
  itemCount: number;

  @ApiProperty({
    description: 'จำนวนรายการสูงสุดต่อหนึ่งหน้า',
    example: 10,
  })
  itemsPerPage: number;

  @ApiProperty({
    description: 'จำนวนหน้าทั้งหมด',
    example: 10,
  })
  totalPages: number;

  @ApiProperty({
    description: 'หน้าปัจจุบันที่กำลังแสดงผล',
    example: 1,
  })
  currentPage: number;
}

export class NotFoundResponseDto {
  @ApiProperty({
    example: 'Not found',
    description: 'ข้อความรายละเอียดของ Error',
  })
  message: string;

  @ApiProperty({
    example: 'Not Found',
    description: 'ประเภทของ HTTP Error',
  })
  error: string;

  @ApiProperty({
    example: 404,
    description: 'รหัส HTTP Status Code',
  })
  statusCode: string;
}
