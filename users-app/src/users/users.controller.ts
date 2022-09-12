import {
  BadRequestException,
  Body,
  ConflictException,
  Controller,
  InternalServerErrorException,
  Post,
} from '@nestjs/common';
import { AddEvmUserDto } from './dtos/add-evm-user.dto';
import { UserModel } from './models/user.model';
import { UsersResponse } from './users.response';
import { UsersService } from './users.service';

@Controller({ path: 'users', version: '1' })
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async post(@Body() body: AddEvmUserDto): Promise<UserModel> {
    const [code, user] = await this.usersService.create(body);
    switch (code) {
      case UsersResponse.Success:
        return user;
      case UsersResponse.BadRequest:
        throw new BadRequestException(body, `Invalid request`);
      case UsersResponse.UserAlreadyExist:
        throw new ConflictException(body, `User already exist`);
      default:
        throw new InternalServerErrorException(body, `Internal error`);
    }
  }
}
