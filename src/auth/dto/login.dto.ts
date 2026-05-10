import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class LoginDto {
  @ApiProperty({
    example: 'calamity222',
    description: 'ชื่อผู้ใช้สำหรับการเข้าสู่ระบบ',
  })
  @IsString()
  @IsNotEmpty({ message: 'กรุณากรอกชื่อผู้ใช้' })
  username: string;

  @ApiProperty({
    example: 'P@ssw0rd123!',
    description: 'รหัสผ่าน (ขั้นต่ำ 8 ตัวอักษร)',
    minLength: 8,
    format: 'password', // ช่วยให้หน้า UI ซ่อนรหัสผ่านเป็นจุดๆ
  })
  @IsString()
  @IsNotEmpty({ message: 'กรุณากรอกรหัสผ่าน' })
  @MinLength(8, { message: 'รหัสผ่านต้องมีความยาวอย่างน้อย 8 ตัวอักษร' })
  password: string;
}
