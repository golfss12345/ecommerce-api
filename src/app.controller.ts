import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('App')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('ping')
  @ApiOperation({ summary: 'Health check server' })
  getPing() {
    return this.appService.getPing();
  }
}
