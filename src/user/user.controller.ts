import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import {
  ApiOkResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { UserService } from './user.service';
import {
  UserResponseDto,
  UserResponsePaginationDto,
} from './dto/response.user.dto';
import { SearchUserPaginationDto } from './dto/search-user.dto';
import { NotFoundResponseDto } from '../common/dto/response.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserDto } from './dto/create-user.dto';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @ApiOperation({ summary: 'ค้นหายูสเซอร์ทั้งหมด' })
  @ApiOkResponse({ type: UserResponsePaginationDto, isArray: true })
  async findUserPaginated(
    @Query() searchUserPaginationDto: SearchUserPaginationDto,
  ) {
    return this.userService.findUserPaginated(searchUserPaginationDto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'ค้นหายูสเซอร์ด้วยไอดี' })
  @ApiOkResponse({
    type: UserResponseDto,
  })
  @ApiResponse({
    status: 404,
    description: 'User Not Found',
    type: NotFoundResponseDto,
  })
  async findUser(@Param('id', ParseUUIDPipe) id: string) {
    return this.userService.findUserById(id);
  }

  @Post()
  @ApiOperation({ summary: 'สร้างยูสเซอร์ใหม่' })
  @ApiResponse({
    status: 201,
    description: 'สร้างสำเร็จ',
    type: UserResponseDto,
  })
  async register(@Body() data: CreateUserDto) {
    return this.userService.createUser(data);
  }

  @Put(':id')
  @ApiOperation({ summary: 'เปลี่ยนข้อมูลยูสเซอร์' })
  @ApiResponse({
    status: 200,
    description: 'อัพเดทสำเร็จ',
    type: UserResponseDto,
  })
  @ApiResponse({
    status: 404,
    description: 'User Not Found',
    type: NotFoundResponseDto,
  })
  async updateUser(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() data: UpdateUserDto,
  ) {
    return this.userService.updateUser(id, data);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'ลบยูสเซอร์ออก (แบบ SoftDelete)' })
  @ApiResponse({
    status: 200,
    description: 'ลบสำเร็จ',
    type: UserResponseDto,
  })
  @ApiResponse({
    status: 404,
    description: 'User Not Found',
    type: NotFoundResponseDto,
  })
  async softDeleteUser(@Param('id', ParseUUIDPipe) id: string) {
    return this.userService.softDeleteUser(id);
  }
}
