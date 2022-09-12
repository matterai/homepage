import { Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ethers } from 'ethers';
import { queryFailedErrorPostgres } from 'src/utils';
import { Repository } from 'typeorm';
import { AddEvmUserDto } from './dtos/add-evm-user.dto';
import { UserEntity } from './entities/user.entity';
import { UserModel } from './models/user.model';
import { UsersResponse } from './users.response';

export class UsersService {
  private readonly logger = new Logger(UsersService.name);
  constructor(
    @InjectRepository(UserEntity)
    private readonly usersRepository: Repository<UserEntity>,
  ) {}

  async create(addUser: AddEvmUserDto): Promise<[UsersResponse, UserModel | null]> {
    const address = this.getChecksum(addUser.address);

    if (!addUser || !address) {
      this.logger.error(`Invalid request`, JSON.stringify(addUser));
      return [UsersResponse.BadRequest, null];
    }

    const user = new UserEntity();
    user.evmAddress = address;

    try {
      const result = await this.usersRepository.save(user);
      return [UsersResponse.Success, this.toModel(result)];
    } catch (e) {
      if (queryFailedErrorPostgres(e)) {
        switch (e.code) {
          case '23505':
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

  private getChecksum(evmAddress: string): string | null {
    try {
      return ethers.utils.getAddress(evmAddress);
    } catch (exception) {
      return null;
    }
  }

  private toModel(user: UserEntity): UserModel {
    return {
      id: user.id,
      displayName: user.displayName,
      email: user.email,
      evmAddress: user.evmAddress,
      created: user.created,
    };
  }
}
