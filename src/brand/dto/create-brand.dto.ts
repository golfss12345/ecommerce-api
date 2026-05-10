import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateBrandDto {
  @ApiProperty({
    description: 'ชื่อแบรนด์สินค้า (ซ้ำไม่ได้)',
    example: 'Apple',
  })
  @IsString()
  @IsNotEmpty()
  name: string;
}
