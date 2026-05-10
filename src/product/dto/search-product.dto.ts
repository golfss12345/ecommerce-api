import { IsOptional, IsString } from 'class-validator';
import { PaginationDto } from '../../common/dto/pagination.dto';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class SearchProductPaginationDto extends PaginationDto {
  @ApiPropertyOptional({ description: 'ชื่อสินค้า' })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiPropertyOptional({ description: 'ชื่อประเภทสินค้า' })
  @IsString()
  @IsOptional()
  category_name?: string;

  @ApiPropertyOptional({ description: 'ชื่อแบรนด์สินค้า' })
  @IsString()
  @IsOptional()
  brand_name?: string;
}
