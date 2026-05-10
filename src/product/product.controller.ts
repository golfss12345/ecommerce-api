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
import { SearchProductPaginationDto } from './dto/search-product.dto';
import { NotFoundResponseDto } from '../common/dto/response.dto';
import { ProductResponseDto } from './dto/response-product.dto';
import { CreateProductDto } from './dto/crerate-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductService } from './product.service';

@ApiTags('Product')
@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  @ApiOperation({ summary: 'ค้นหาสินค้าทั้งหมด' })
  @ApiOkResponse({ type: ProductResponseDto, isArray: true })
  async findPaginated(
    @Query() searchProductPaginationDto: SearchProductPaginationDto,
  ) {
    return this.productService.findAllPagination(searchProductPaginationDto);
  }

  @Get(':slug')
  @ApiOperation({ summary: 'ค้นหาสินค้าด้วย slug' })
  @ApiOkResponse({
    type: ProductResponseDto,
  })
  @ApiResponse({
    status: 404,
    description: 'Product Not Found',
    type: NotFoundResponseDto,
  })
  async getProduct(@Param('slug') slug: string) {
    return this.productService.findSlugProduct(slug);
  }

  @Post()
  @ApiOperation({ summary: 'สร้างสินค้าใหม่' })
  @ApiResponse({
    status: 201,
    description: 'สร้างสำเร็จ',
    type: ProductResponseDto,
  })
  @ApiResponse({
    status: 409,
    description: 'ชื่อสินค้าซ้ำ',
    type: NotFoundResponseDto,
  })
  async createProduct(@Body() data: CreateProductDto) {
    return this.productService.createProduct(data);
  }

  @Put(':id')
  @ApiOperation({ summary: 'เปลี่ยนข้อมูลสินค้า' })
  @ApiResponse({
    status: 200,
    description: 'อัพเดทสำเร็จ',
    type: ProductResponseDto,
  })
  @ApiResponse({
    status: 404,
    description: 'Product Not Found',
    type: NotFoundResponseDto,
  })
  async updateProduct(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() data: UpdateProductDto,
  ) {
    return this.productService.updateProduct(id, data);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'ลบสินค้าออก (แบบ SoftDelete)' })
  @ApiResponse({
    status: 200,
    description: 'ลบสำเร็จ',
    type: ProductResponseDto,
  })
  @ApiResponse({
    status: 404,
    description: 'Product Not Found',
    type: NotFoundResponseDto,
  })
  async softDeleteProduct(@Param('id', ParseUUIDPipe) id: string) {
    return this.productService.softDeleteProduct(id);
  }
}
