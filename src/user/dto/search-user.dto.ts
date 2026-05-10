import {
  IsBooleanString,
  IsEmail,
  IsOptional,
  IsString,
} from 'class-validator';
import { PaginationDto } from '../../common/dto/pagination.dto';
import { SearchDto } from '../../common/dto/search.dto';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class SearchUserPaginationDto extends PaginationDto {
  @ApiPropertyOptional({ description: 'ชื่อผู้ใช้งาน (Username)' })
  @IsString()
  @IsOptional()
  username?: string;

  @ApiPropertyOptional({ description: 'ชื่อจริง' })
  @IsString()
  @IsOptional()
  firstname?: string;

  @ApiPropertyOptional({ description: 'นามสกุล' })
  @IsString()
  @IsOptional()
  lastname?: string;

  @ApiPropertyOptional({ description: 'อีเมล' })
  @IsEmail()
  @IsOptional()
  email?: string;

  @ApiPropertyOptional({ description: 'สถานะผู้ดูแลระบบ' })
  @IsBooleanString()
  @IsOptional()
  is_admin?: boolean;
}

export class SearchUserDto extends SearchDto {
  @ApiPropertyOptional({ description: 'ชื่อผู้ใช้งาน (Username)' })
  @IsString()
  @IsOptional()
  username?: string;

  @ApiPropertyOptional({ description: 'อีเมล' })
  @IsEmail()
  @IsOptional()
  email?: string;

  @ApiPropertyOptional({ description: 'สถานะผู้ดูแลระบบ' })
  @IsBooleanString()
  @IsOptional()
  is_admin?: boolean;
}
