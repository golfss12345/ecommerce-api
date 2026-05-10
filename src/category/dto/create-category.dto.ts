import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCategoryDto {
  @ApiProperty({
    description: 'ชื่อประเภทสินค้า (ซ้ำไม่ได้)',
    example: 'Smart Phone',
  })
  @IsString()
  @IsNotEmpty()
  name: string;
}
