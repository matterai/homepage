import { Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getChecksum, queryFailedErrorPostgres } from 'src/utils';
import { Repository } from 'typeorm';
import { AddEvmUserDto } from './dtos/add-evm-user.dto';
import { EditUserDto } from './dtos/edit-user.dto';
import { GetUserDto } from './dtos/get-user.dto';
import { DeleteUserDto } from './dtos/remove-user.dto';
import { UserEntity } from './entities/user.entity';
import { UserModel } from './models/user.model';
import { UsersMap } from './users.map';
import { UsersResponse } from './users.response';

export class UsersService {
  private readonly logger = new Logger(UsersService.name);
  constructor(
    @InjectRepository(UserEntity)
    private readonly usersRepository: Repository<UserEntity>,
  ) {}

  async get(dto: GetUserDto): Promise<[UsersResponse, UserModel | null]> {
    try {
      const { id } = dto;
      const result = await this.usersRepository.findOneBy({ id });
      return result ? [UsersResponse.Success, UsersMap.toModel(result)] : [UsersResponse.UserNotFound, null];
    } catch (e) {
      this.logger.error(`Unhandled Error`, JSON.stringify(e));
      return [UsersResponse.UnhandledError, null];
    }
  }

  async create(dto: AddEvmUserDto): Promise<[UsersResponse, UserModel | null]> {
    const address = getChecksum(dto.address);

    if (!address) {
      this.logger.error(`Invalid request`, JSON.stringify(dto));
      return [UsersResponse.BadRequest, null];
    }

    const user = new UserEntity();
    user.evmAddress = address;

    try {
      const result = await this.usersRepository.save(user);
      return [UsersResponse.Success, UsersMap.toModel(result)];
    } catch (e) {
      if (queryFailedErrorPostgres(e)) {
        switch (e.code) {
          case '23505':
            this.logger.error(`Conflict while inserting`, JSON.stringify(e));
            return [UsersResponse.UserAlreadyExist, null];
          default:
            this.logger.error(`Unhandled Postgres Error`, JSON.stringify(e));
            return [UsersResponse.UnhandledError, null];
        }
      } else {
        this.logger.error(`Unhandled Error`, JSON.stringify(e));
        return [UsersResponse.UnhandledError, null];
      }
    }
  }

  async update(dto: EditUserDto): Promise<[UsersResponse, UserModel | null]> {
    try {
      const { id, email, displayName } = dto;
      const result = await this.usersRepository
        .createQueryBuilder()
        .update(UserEntity)
        .set({ displayName: displayName, email: email, updated: 'now()' })
        .where({ id })
        .returning('*')
        .execute();

      if (result.affected === 0) {
        return [UsersResponse.UserNotFound, null];
      }

      const model = UsersMap.toModel(result.raw[0]);
      return [UsersResponse.Success, model];
    } catch (e) {
      this.logger.error(`Unhandled Error`, JSON.stringify(e));
      return [UsersResponse.UnhandledError, null];
    }
  }

  async delete(dto: DeleteUserDto): Promise<[UsersResponse, UserModel | null]> {
    try {
      const { id } = dto;
      const result = await this.usersRepository
        .createQueryBuilder()
        .delete()
        .from(UserEntity)
        .where({ id })
        .returning('*')
        .execute();

      console.log(result);
      if (result.affected === 0) {
        return [UsersResponse.UserNotFound, null];
      }

      const model = UsersMap.toModel(result.raw[0]);
      return [UsersResponse.Success, model];
    } catch (e) {
      this.logger.error(`Unhandled Error`, JSON.stringify(e));
      return [UsersResponse.UnhandledError, null];
    }
  }
}
