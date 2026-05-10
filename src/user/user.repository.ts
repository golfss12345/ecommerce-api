import { Injectable } from '@nestjs/common';
import { Brackets, DataSource, Repository } from 'typeorm';
import { User } from './entity/user.entity';
import { SearchUserPaginationDto, SearchUserDto } from './dto/search-user.dto';
import { PaginationResult } from '../common/interfaces/pagination-result.interface';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserRepository extends Repository<User> {
  constructor(private readonly dataSource: DataSource) {
    super(User, dataSource.createEntityManager());
  }

  async findUserPaginated(
    searchUserPaginationDto: SearchUserPaginationDto,
  ): Promise<PaginationResult<User>> {
    const {
      page,
      limit,
      search,
      username,
      firstname,
      lastname,
      email,
      is_admin,
    } = searchUserPaginationDto;
    const qb = this.createQueryBuilder('user');
    qb.select([
      'user.id',
      'user.firstname',
      'user.lastname',
      'user.email',
      'user.username',
      'user.is_admin',
      'user.is_active',
      'user.created_at',
      'user.updated_at',
    ]);

    if (search) {
      qb.andWhere(
        new Brackets((qb) => {
          qb.where('user.username ILIKE :search', { search: `%${search}%` })
            .orWhere('user.firstname ILIKE :search', { search: `%${search}%` })
            .orWhere('user.lastname ILIKE :search', { search: `%${search}%` })
            .orWhere('user.email ILIKE :search', { search: `%${search}%` });
        }),
      );
    }
    if (username) {
      qb.andWhere('user.username ILIKE :username', {
        username: `%${username}%`,
      });
    }
    if (firstname) {
      qb.andWhere('user.firstname ILIKE :firstname', {
        firstname: `%${firstname}%`,
      });
    }
    if (lastname) {
      qb.andWhere('user.lastname ILIKE :lastname', {
        lastname: `%${lastname}%`,
      });
    }
    if (email) {
      qb.andWhere('user.email ILIKE :email', { email: `%${email}%` });
    }
    if (is_admin !== undefined) {
      qb.andWhere('user.is_admin = :is_admin', { is_admin });
    }

    qb.skip((page - 1) * limit)
      .take(limit)
      .orderBy('user.created_at', 'DESC');

    const [data, total] = await qb.getManyAndCount();
    const totalPages = limit > 0 ? Math.ceil(total / limit) : 0;

    return {
      data,
      meta: {
        totalItems: total,
        itemCount: data.length,
        itemsPerPage: limit,
        totalPages: totalPages,
        currentPage: page,
      },
    };
  }

  async findOneUser(searchUserDto: SearchUserDto): Promise<User | null> {
    const { id, username, email, is_admin } = searchUserDto;
    const qb = this.createQueryBuilder('user');

    if (id) {
      qb.andWhere('user.id = :id', { id });
    }
    if (username) {
      qb.andWhere('user.username = :username', {
        username: username,
      });
    }
    if (email) {
      qb.andWhere('user.email = :email', { email: email });
    }
    if (is_admin !== undefined) {
      qb.andWhere('user.is_admin = :is_admin', { is_admin });
    }

    qb.andWhere('user.is_active = :is_active', { is_active: true });
    qb.orderBy('user.created_at', 'DESC');

    return await qb.getOne();
  }

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const user = this.create(createUserDto);
    return await this.save(user);
  }

  async updateUser(
    id: string,
    updateUserDto: UpdateUserDto,
  ): Promise<User | null> {
    await this.update(id, updateUserDto);
    return await this.findOneUser({ id });
  }

  async updateActiveUser(id: string): Promise<string> {
    await this.update(id, { is_active: false });
    return 'User updated successfully';
  }
}
