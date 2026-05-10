/* eslint-disable @typescript-eslint/require-await */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { CurrentUser } from './decorators/current-user.decorator';

@ApiTags('Authen')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @ApiOperation({ summary: 'ยูสเซอร์ Login เพื่อรับ Token' })
  @ApiOkResponse({ description: 'รับ access token กลับมา' })
  async login(@Body() loginDto: LoginDto) {
    return await this.authService.login(loginDto);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'เรียกดูโปรไฟล์ของยูสเซอร์ผ่าน Token' })
  @Get('profile')
  async getProfile(@CurrentUser() user: any) {
    return user;
  }
}
