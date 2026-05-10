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
import { ProductVariantService } from './product-variant.service';
import { ProductVariantResponseDto } from './dto/response.product-variant.dto';
import { NotFoundResponseDto } from '../common/dto/response.dto';
import { CreateProductVariantDto } from './dto/create-product-variant.dto';
import { UpdateProductVariantDto } from './dto/update-product-variant.dto';

@ApiTags('Product Variant')
@Controller('product-variant')
export class ProductVariantController {
  constructor(private readonly productVariantService: ProductVariantService) {}

  @Get(':product_id')
  @ApiOperation({ summary: 'ค้นหาตัวเลือกสินค้าทั้งหมด' })
  @ApiOkResponse({ type: ProductVariantResponseDto, isArray: true })
  async findAll(@Param('product_id', ParseUUIDPipe) product_id: string) {
    return await this.productVariantService.findByProductId(product_id);
  }

  @Post()
  @ApiOperation({ summary: 'สร้างตัวเลือกสินค้าใหม่' })
  @ApiResponse({
    status: 201,
    description: 'สร้างสำเร็จ',
    type: ProductVariantResponseDto,
  })
  @ApiResponse({
    status: 409,
    description: 'ชื่อตัวเลือกสินค้าซ้ำ',
    type: NotFoundResponseDto,
  })
  async createProductVariant(@Body() data: CreateProductVariantDto) {
    return this.productVariantService.createProductVariant(data);
  }

  @Put(':id')
  @ApiOperation({ summary: 'เปลี่ยนข้อมูลตัวเลือกสินค้า' })
  @ApiResponse({
    status: 200,
    description: 'อัพเดทสำเร็จ',
    type: ProductVariantResponseDto,
  })
  @ApiResponse({
    status: 404,
    description: 'ProductVariant Not Found',
    type: NotFoundResponseDto,
  })
  async updateProductVariant(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() data: UpdateProductVariantDto,
  ) {
    return this.productVariantService.updateProductVariant(id, data);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'ลบตัวเลือกสินค้าออก (แบบ SoftDelete)' })
  @ApiResponse({
    status: 200,
    description: 'ลบสำเร็จ',
    type: ProductVariantResponseDto,
  })
  @ApiResponse({
    status: 404,
    description: 'ProductVariant Not Found',
    type: NotFoundResponseDto,
  })
  async softDeleteProductVariant(@Param('id', ParseUUIDPipe) id: string) {
    return this.productVariantService.softDeleteProductVariant(id);
  }
}
