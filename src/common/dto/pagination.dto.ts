import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, IsOptional, IsString, Max, Min } from 'class-validator';

export class PaginationDto {
  @ApiPropertyOptional({ example: 'iphone', description: 'คำค้นหา' })
  @IsOptional()
  @IsString()
  search?: string;

  @ApiProperty({ example: 1, description: 'เลขหนัาปัจจุบัน' })
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page: number;

  @ApiProperty({ example: 10, description: 'จำนวนรายการต่อหน้า' })
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(100)
  limit: number;
}
