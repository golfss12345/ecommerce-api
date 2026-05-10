import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
} from '@nestjs/common';
import {
  ApiOkResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CategoryService } from './category.service';
import { CategoryResponseDto } from './dto/response.category';
import { NotFoundResponseDto } from '../common/dto/response.dto';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@ApiTags('Category')
@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  @ApiOperation({ summary: 'ค้นหาประเภทของสินค้าทั้งหมด' })
  @ApiOkResponse({ type: CategoryResponseDto, isArray: true })
  async findAll() {
    return this.categoryService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'ค้นหาประเภทของสินค้าด้วยไอดี' })
  @ApiOkResponse({
    type: CategoryResponseDto,
  })
  @ApiResponse({
    status: 404,
    description: 'Category Not Found',
    type: NotFoundResponseDto,
  })
  async findOneById(@Param('id', ParseUUIDPipe) id: string) {
    return this.categoryService.findOneById(id);
  }

  @Post()
  @ApiOperation({ summary: 'สร้างประเภทของสินค้าใหม่' })
  @ApiResponse({
    status: 201,
    description: 'สร้างสำเร็จ',
    type: CategoryResponseDto,
  })
  @ApiResponse({
    status: 409,
    description: 'ชื่อประเภทของสินค้าซ้ำ',
    type: NotFoundResponseDto,
  })
  async createCategory(@Body() data: CreateCategoryDto) {
    return this.categoryService.createCategory(data);
  }

  @Put(':id')
  @ApiOperation({ summary: 'เปลี่ยนข้อมูลประเภทของสินค้า' })
  @ApiResponse({
    status: 200,
    description: 'อัพเดทสำเร็จ',
    type: CategoryResponseDto,
  })
  @ApiResponse({
    status: 404,
    description: 'Category Not Found',
    type: NotFoundResponseDto,
  })
  async updateCategory(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() data: UpdateCategoryDto,
  ) {
    return this.categoryService.updateCategory(id, data);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'ลบประเภทของสินค้าออก (แบบ SoftDelete)' })
  @ApiResponse({
    status: 200,
    description: 'ลบสำเร็จ',
    type: CategoryResponseDto,
  })
  @ApiResponse({
    status: 404,
    description: 'Category Not Found',
    type: NotFoundResponseDto,
  })
  async softDeleteCategory(@Param('id', ParseUUIDPipe) id: string) {
    return this.categoryService.softDeleteCategory(id);
  }
}
