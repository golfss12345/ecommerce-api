import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

// 1. สร้าง Interface สำหรับ Payload เพื่อความแม่นยำ
interface JwtPayload {
  sub: string;
  username: string;
  is_admin: boolean;
  iat?: number;
  exp?: number;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(configService: ConfigService) {
    const secret = configService.get<string>('JWT_SECRET');

    // ตรวจสอบเบื้องต้นเผื่อลืมตั้งค่าใน .env
    if (!secret) {
      throw new Error('JWT_SECRET is not defined in environment variables');
    }

    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: secret,
    });
  }

  // 2. ระบุ Type ของ Payload และ Return Type
  validate(payload: JwtPayload) {
    // ข้อมูลนี้จะถูกแนบไปที่ req.user ใน Controller
    return {
      id: payload.sub,
      username: payload.username,
      is_admin: payload.is_admin,
    };
  }
}
