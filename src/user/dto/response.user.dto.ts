import { ApiProperty } from '@nestjs/swagger';
import { PaginationMetaDto } from '../../common/dto/response.dto';

export class UserResponseDto {
  @ApiProperty({
    description: 'ไอดีผู้ใช้งาน (UUID)',
    example: 'a1b2c3d4-e5f6-4g7h-8i9j-k0l1m2n3o4p5',
  })
  id: string;

  @ApiProperty({ description: 'ชื่อผู้ใช้ (username)', example: 'calamity222' })
  username: string;

  @ApiProperty({ description: 'ชื่อจริง', example: 'Terraria' })
  firstname: string;

  @ApiProperty({ description: 'นามสกุล', example: 'Calamity' })
  lastname: string;

  @ApiProperty({
    description: 'อีเมลผู้ใช้งาน',
    example: 'player@terraria.com',
  })
  email: string;

  @ApiProperty({ description: 'สถานะแอดมิน', example: false })
  is_admin: boolean;

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

export class UserResponsePaginationDto {
  @ApiProperty({ type: () => UserResponseDto })
  data: UserResponseDto[];

  @ApiProperty({ type: PaginationMetaDto })
  meta: PaginationMetaDto;
}
