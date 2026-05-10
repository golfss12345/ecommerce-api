import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  Max,
  Min,
} from 'class-validator';

export class CreateReviewDto {
  @ApiProperty({
    description: 'คะแนนรีวิว (1-5)',
    example: 5,
    minimum: 1,
    maximum: 5,
  })
  @IsNumber()
  @IsNotEmpty()
  @Min(1)
  @Max(5)
  rating: number;

  @ApiProperty({
    description: 'หัวข้อการรีวิว',
    example: 'สินค้าคุณภาพดีมาก',
  })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    description: 'รายละเอียดความคิดเห็น',
    example: 'แพ็คของมาดีมาก ความคุ้มค่าดีมาก การจัดส่งรวดเร็ว',
  })
  @IsString()
  @IsNotEmpty()
  comment: string;

  @ApiProperty({
    description: 'รายการ URL รูปภาพรีวิว (ถ้ามี)',
    example: ['https://image1.jpg', 'https://image2.jpg'],
    required: false,
  })
  @IsString({ each: true })
  @IsArray()
  @IsOptional()
  images?: string[];

  @ApiProperty({
    description: 'ไอดีสินค้าที่ต้องการรีวิว (UUID)',
    example: 'c035cf31-f1ff-4f1e-b98d-cf417dee80e2',
  })
  @IsUUID()
  @IsNotEmpty()
  product_id: string;

  @ApiProperty({
    description: 'ไอดีผู้ใช้งานที่เขียนรีวิว (UUID)',
    example: 'a1b2c3d4-e5f6-4g7h-8i9j-k0l1m2n3o4p5',
  })
  @IsUUID()
  @IsNotEmpty()
  user_id: string;
}
