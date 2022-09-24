import { Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getChecksum, queryFailedErrorPostgres } from 'src/utils';
import { Repository } from 'typeorm';
import { AddEvmUserDto } from './dtos/add-evm-user.dto';
import { GetEvmUser } from './dtos/get-evm-user.dto';
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

  async get(getUser: GetEvmUser): Promise<[UsersResponse, UserModel | null]> {
    const address = getChecksum(getUser.address);

    if (!address) {
      this.logger.error(`Invalid request`, JSON.stringify(getUser));
      return [UsersResponse.BadRequest, null];
    }

    try {
      const result = await this.usersRepository.findOneBy({ evmAddress: address });
      return result ? [UsersResponse.Success, UsersMap.toModel(result)] : [UsersResponse.UserNotFound, null];
    } catch (e) {
      this.logger.error(`Unhandled Error`, JSON.stringify(e));
      return [UsersResponse.UnhandledError, null];
    }
  }

  async create(addUser: AddEvmUserDto): Promise<[UsersResponse, UserModel | null]> {
    const address = getChecksum(addUser.address);

    if (!address) {
      this.logger.error(`Invalid request`, JSON.stringify(addUser));
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
}
