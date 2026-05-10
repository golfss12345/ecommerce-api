import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    description: 'ชื่อผู้ใช้งาน (Username)',
    example: 'calamity222',
  })
  @IsString()
  @IsNotEmpty()
  username: string;

  @ApiProperty({ description: 'ชื่อจริง', example: 'Terraria' })
  @IsString()
  @IsNotEmpty()
  firstname: string;

  @ApiProperty({ description: 'ชื่อจริง', example: 'Caramity' })
  @IsString()
  @IsNotEmpty()
  lastname: string;

  @ApiProperty({
    description: 'อีเมลสำหรับการเข้าสู่ระบบ',
    example: 'player@terraria.com',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    description: 'รหัสผ่าน (ขั้นต่ำ 8 ตัวอักษร)',
    example: 'P@ssw0rd123!',
    format: 'password',
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  password: string;

  @ApiProperty({
    description: 'ยืนยันรหัสผ่านอีกครั้ง',
    example: 'P@ssw0rd123!',
    format: 'password',
  })
  @IsString()
  @IsNotEmpty()
  confirm_password: string;
}
