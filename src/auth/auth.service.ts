import {
  HttpException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { SearchUserDto } from '../user/dto/search-user.dto';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string) {
    try {
      const searchUserDto = new SearchUserDto();
      searchUserDto.username = username;
      const user = await this.userService.findOneUser(searchUserDto);
      if (!user) {
        throw new UnauthorizedException('Invalid credentials');
      }
      const isMatch = await bcrypt.compare(pass, user.password);
      if (isMatch) {
        const dataReturn = {
          id: user.id,
          firstname: user.firstname,
          lastname: user.lastname,
          email: user.email,
          username: user.username,
          is_admin: user.is_admin,
          is_active: user.is_active,
          created_at: user.created_at,
          updated_at: user.updated_at,
          reviews: user.reviews,
        };
        return dataReturn;
      } else {
        throw new UnauthorizedException('Invalid username or password');
      }
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      console.error('Validate User Error:', error);
      throw new InternalServerErrorException('Failed to validate user');
    }
  }

  async login(loginDto: LoginDto) {
    try {
      const { username, password } = loginDto;
      const user = await this.validateUser(username, password);

      const payload = {
        username: user.username,
        is_admin: user.is_admin,
        sub: user.id,
      };
      return {
        access_token: this.jwtService.sign(payload),
      };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      console.error('Login User Error:', error);
      throw new InternalServerErrorException('Failed to login user');
    }
  }
}
