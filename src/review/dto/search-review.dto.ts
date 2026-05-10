import { IsEnum, IsOptional, IsString } from 'class-validator';
import { PaginationDto } from '../../common/dto/pagination.dto';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { ReviewStatus } from '../../common/enums/review-status.enum';

export class SearchReviewPaginationDto extends PaginationDto {
  @ApiPropertyOptional({ description: 'ชื่อสินค้า' })
  @IsString()
  @IsOptional()
  productName?: string;

  @ApiPropertyOptional({ description: 'ชื่อผู้ใช้' })
  @IsString()
  @IsOptional()
  username?: string;

  @ApiPropertyOptional({ description: 'ไอดีผู้ใช้' })
  @IsString()
  @IsOptional()
  user_id?: string;

  @ApiPropertyOptional({ description: 'ไอดีสินค้า' })
  @IsString()
  @IsOptional()
  product_id?: string;

  @ApiPropertyOptional({
    description: 'ชื่อสินค้าแบบ URL Slug (iphone-15-pro)',
  })
  @IsString()
  @IsOptional()
  slug?: string;

  @ApiProperty({
    description: 'สถานะของรีวิว',
    enum: ReviewStatus,
    example: ReviewStatus.PUBLISHED,
  })
  @IsEnum(ReviewStatus)
  status: ReviewStatus;
}
