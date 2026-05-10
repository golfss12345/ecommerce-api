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
import { BrandService } from './brand.service';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import {
  ApiOkResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { BrandResponseDto } from './dto/response-brand.dto';
import { NotFoundResponseDto } from '../common/dto/response.dto';

@ApiTags('Brand')
@Controller('brand')
export class BrandController {
  constructor(private readonly brandService: BrandService) {}

  @Get()
  @ApiOperation({ summary: 'ค้นหาแบรนด์ทั้งหมด' })
  @ApiOkResponse({ type: BrandResponseDto, isArray: true })
  async findAll() {
    return this.brandService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'ค้นหาแบรนด์ด้วยไอดี' })
  @ApiOkResponse({
    type: BrandResponseDto,
  })
  @ApiResponse({
    status: 404,
    description: 'Brand Not Found',
    type: NotFoundResponseDto,
  })
  async findOneById(@Param('id', ParseUUIDPipe) id: string) {
    return this.brandService.findOneById(id);
  }

  @Post()
  @ApiOperation({ summary: 'สร้างแบรนด์ใหม่' })
  @ApiResponse({
    status: 201,
    description: 'สร้างสำเร็จ',
    type: BrandResponseDto,
  })
  @ApiResponse({
    status: 409,
    description: 'ชื่อแบรนด์ซ้ำ',
    type: NotFoundResponseDto,
  })
  async createBrand(@Body() data: CreateBrandDto) {
    return this.brandService.createBrand(data);
  }

  @Put(':id')
  @ApiOperation({ summary: 'เปลี่ยนข้อมูลแบรนด์' })
  @ApiResponse({
    status: 200,
    description: 'อัพเดทสำเร็จ',
    type: BrandResponseDto,
  })
  @ApiResponse({
    status: 404,
    description: 'Brand Not Found',
    type: NotFoundResponseDto,
  })
  async updateBrand(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() data: UpdateBrandDto,
  ) {
    return this.brandService.updateBrand(id, data);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'ลบแบรนด์ออก (แบบ SoftDelete)' })
  @ApiResponse({
    status: 200,
    description: 'ลบสำเร็จ',
    type: BrandResponseDto,
  })
  @ApiResponse({
    status: 404,
    description: 'Brand Not Found',
    type: NotFoundResponseDto,
  })
  async softDeleteBrand(@Param('id', ParseUUIDPipe) id: string) {
    return this.brandService.softDeleteBrand(id);
  }
}
