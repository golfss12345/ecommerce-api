import { PartialType } from '@nestjs/mapped-types';
import { CreateReviewDto } from './create-review.dto';
import { IsDate, IsEnum, IsOptional, IsString } from 'class-validator';
import { ReviewStatus } from '../../common/enums/review-status.enum';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateReviewDto extends PartialType(CreateReviewDto) {
  @ApiPropertyOptional({
    description: 'สเตตัสของ Review',
    enum: ReviewStatus,
    example: ReviewStatus.PUBLISHED,
  })
  @IsEnum(ReviewStatus)
  @IsOptional()
  status?: ReviewStatus;

  @ApiPropertyOptional({
    description: 'ข้อความตอบกลับจากร้านค้า',
    example: 'ขอบคุณที่อุดหนุนครับ สินค้ารับประกัน 1 ปีครับ',
  })
  @IsString()
  @IsOptional()
  reply?: string;

  @ApiPropertyOptional({
    description: 'เวลาที่แอดมินได้ตอบกลับ',
    example: '2026-05-09T08:00:00.000Z',
  })
  @IsDate()
  @IsOptional()
  replied_at?: Date;
}
