import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getPing() {
    return {
      status: 'ok',
      message: 'pong',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
    };
  }
}
