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
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ReviewService } from './review.service';
import { ReviewResponseDto } from './dto/response-review.dto';
import { SearchReviewPaginationDto } from './dto/search-review.dto';
import { CreateReviewDto } from './dto/create-review.dto';
import { NotFoundResponseDto } from '../common/dto/response.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('Review')
@Controller('review')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @Get()
  @ApiOperation({ summary: 'ค้นหารีวิวทั้งหมด' })
  @ApiOkResponse({ type: ReviewResponseDto, isArray: true })
  async findPaginated(
    @Query() searchReviewPaginationDto: SearchReviewPaginationDto,
  ) {
    return this.reviewService.findReviewPaginated(searchReviewPaginationDto);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post()
  @ApiOperation({ summary: 'สร้างริวิวใหม่' })
  @ApiResponse({
    status: 201,
    description: 'สร้างสำเร็จ',
    type: ReviewResponseDto,
  })
  async createReview(@Body() data: CreateReviewDto) {
    return this.reviewService.createReview(data);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Put(':id')
  @ApiOperation({ summary: 'เปลี่ยนข้อมูลริวิว' })
  @ApiResponse({
    status: 200,
    description: 'อัพเดทสำเร็จ',
    type: ReviewResponseDto,
  })
  @ApiResponse({
    status: 404,
    description: 'Review Not Found',
    type: NotFoundResponseDto,
  })
  async updateReview(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() data: UpdateReviewDto,
  ) {
    return this.reviewService.updateReview(id, data);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  @ApiOperation({ summary: 'ลบริวิวออก (แบบ SoftDelete)' })
  @ApiResponse({
    status: 200,
    description: 'ลบสำเร็จ',
    type: ReviewResponseDto,
  })
  @ApiResponse({
    status: 404,
    description: 'Review Not Found',
    type: NotFoundResponseDto,
  })
  async softDeleteReview(@Param('id', ParseUUIDPipe) id: string) {
    return this.reviewService.softDeleteReview(id);
  }
}
