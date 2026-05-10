import {
  BadRequestException,
  ConflictException,
  HttpException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { UserRepository } from './user.repository';
import { SearchUserDto, SearchUserPaginationDto } from './dto/search-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { plainToInstance } from 'class-transformer';
import { CreateUserDto } from './dto/create-user.dto';
import { UserResponseDto } from './dto/response.user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async findUserPaginated(searchUserPaginationDto: SearchUserPaginationDto) {
    try {
      const userExists = await this.userRepository.findUserPaginated(
        searchUserPaginationDto,
      );
      return userExists;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      console.error(`Error retrieving user:`, error);
      throw new InternalServerErrorException('Failed to retrieve user');
    }
  }

  async findOneUser(searchUserDto: SearchUserDto) {
    try {
      const userExist = await this.userRepository.findOneUser(searchUserDto);
      return userExist;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      console.error(`Error retrieving user:`, error);
      throw new InternalServerErrorException('Failed to retrieve user');
    }
  }

  async findUserById(id: string) {
    try {
      const searchUserDto = new SearchUserDto();
      searchUserDto.id = id;
      const userExist = await this.userRepository.findOneUser(searchUserDto);
      if (!userExist) throw new NotFoundException('User not Found');
      return plainToInstance(UserResponseDto, userExist, {
        excludeExtraneousValues: true,
      });
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      console.error(`Error retrieving user with id ${id}:`, error);
      throw new InternalServerErrorException('Failed to retrieve user');
    }
  }

  async checkUsername(username: string, id?: string) {
    try {
      const searchUserDto = new SearchUserDto();
      searchUserDto.username = username;
      const userExist = await this.userRepository.findOneUser(searchUserDto);
      if (userExist && (!id || userExist.id != id)) {
        throw new ConflictException(`Username ${username} is already in use`);
      }
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      console.error(
        `Error checking availability for username: ${username}:`,
        error,
      );
      throw new InternalServerErrorException(
        'Failed to verify username availability',
      );
    }
  }

  async checkEmail(email: string, id?: string) {
    try {
      const searchUserDto = new SearchUserDto();
      searchUserDto.email = email;
      const userExist = await this.userRepository.findOneUser(searchUserDto);
      if (userExist && (!id || userExist.id !== id)) {
        throw new ConflictException(`Email ${email} is already in use`);
      }
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      console.error(`Error retrieving email with id ${id}:`, error);
      throw new InternalServerErrorException('Failed to retrieve email');
    }
  }

  async createPassword(password: string, confirm_password: string) {
    try {
      if (password != confirm_password) {
        throw new BadRequestException('Passwords do not match');
      }
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltRounds);
      return hashedPassword;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      console.error(`Error during password hashing:`, error);
      throw new InternalServerErrorException('Failed to process password');
    }
  }

  async createUser(createUserDto: CreateUserDto) {
    try {
      const { username, email, password, confirm_password } = createUserDto;
      await this.checkUsername(username);
      await this.checkEmail(email);
      const newPassword = await this.createPassword(password, confirm_password);
      createUserDto.password = newPassword;
      const userExist = await this.userRepository.createUser(createUserDto);
      return {
        id: userExist.id,
        firstname: userExist.firstname,
        lastname: userExist.lastname,
        email: userExist.email,
        username: userExist.username,
        is_admin: userExist.is_admin,
        is_active: userExist.is_active,
        created_at: userExist.created_at,
        updated_at: userExist.updated_at,
      };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      console.error('Error creating review:', error);
      throw new InternalServerErrorException('Failed to create review');
    }
  }

  async updateUser(id: string, updateUserDto: UpdateUserDto) {
    try {
      const { username, email, password, confirm_password } = updateUserDto;
      await this.findUserById(id);
      if (username) await this.checkUsername(username, id);
      if (email) await this.checkEmail(email, id);
      if (password && confirm_password)
        await this.createPassword(password, confirm_password);

      return await this.userRepository.updateUser(id, updateUserDto);
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      console.error(`Error updating review with id ${id}:`, error);
      throw new InternalServerErrorException('Failed to update review');
    }
  }

  async softDeleteUser(id: string) {
    try {
      await this.findUserById(id);
      return this.userRepository.updateActiveUser(id);
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      console.error(`Error deleting user with id ${id}:`, error);
      throw new InternalServerErrorException('Failed to delete user');
    }
  }
}
