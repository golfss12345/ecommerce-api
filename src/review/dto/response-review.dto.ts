import { ApiProperty } from '@nestjs/swagger';
import { ReviewStatus } from '../../common/enums/review-status.enum';
import { ProductResponseDto } from '../../product/dto/response-product.dto';
import { UserResponseDto } from '../../user/dto/response.user.dto';

export class ReviewResponseDto {
  @ApiProperty({
    example: 'uuid-9fef-befa72ddae7f',
    description: 'ไอดีของรีวิว',
  })
  id: string;

  @ApiProperty({
    example: 5,
    description: 'คะแนนสินค้า',
    minimum: 1,
    maximum: 5,
  })
  rating: number;

  @ApiProperty({ example: 'คุณภาพสินค้า', description: 'หัวข้อรีวิว' })
  title: string;

  @ApiProperty({ example: 'มือถือตรงปกมากคร้า', description: 'คอมเมนท์รีวิว' })
  comment: string;

  @ApiProperty({
    description: 'รูปสินค้าที่ลูกค้าสั่ง',
    example: ['https://image1.jpg', 'https://image2.jpg'],
  })
  images: string[];

  @ApiProperty({ example: true, description: 'สถานะยืนยันว่าซื้้อสินค้า' })
  is_verified: boolean;

  @ApiProperty({
    example: 5,
    description: 'คะแนนว่ารีวิวนี้มีประโยชณ์ไหม',
    minimum: 1,
    maximum: 5,
  })
  helpful_count: number;

  @ApiProperty({
    example: ReviewStatus.PUBLISHED,
    description: 'สถานะรีวิว',
    enum: ReviewStatus,
  })
  status: ReviewStatus;

  @ApiProperty({
    example: 'ขอบคุณลูกค้าที่มาใช้บริการของทางร้านค่ะ',
    description: 'ข้อความตอบกลับของแอดมิน',
  })
  replay: string;

  @ApiProperty({ example: true, description: 'สถานะการเปิดใช้งานรีวิวสินค้า' })
  is_active: boolean;

  @ApiProperty({
    type: () => ProductResponseDto,
    description: 'สินค้าที่ลูกค้าทำการซื้อ',
  })
  product: ProductResponseDto;

  @ApiProperty({
    type: () => UserResponseDto,
    description: 'บัญชีลูกค้าที่ทำการซื้อ',
  })
  user: UserResponseDto;

  @ApiProperty({
    example: '2026-05-09T08:00:00.000Z',
    description: 'วันที่สร้าง',
  })
  replied_at: Date;

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
