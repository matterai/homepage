import {
  BadRequestException,
  Body,
  ConflictException,
  Controller,
  HttpCode,
  InternalServerErrorException,
  Post,
} from '@nestjs/common';
import { ApiBadRequestResponse, ApiConflictResponse, ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { AddEvmUserDto } from './dtos/add-evm-user.dto';
import { UserModel } from './models/user.model';
import { UsersResponse } from './users.response';
import { UsersService } from './users.service';

@ApiTags(`users`)
@Controller({ path: 'users', version: '1' })
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @HttpCode(201)
  @ApiCreatedResponse({ type: UserModel, description: 'User created' })
  @ApiBadRequestResponse({ description: 'Invalid payload in request' })
  @ApiConflictResponse({ description: 'There is a user with such an address' })
  async post(@Body() body: AddEvmUserDto): Promise<UserModel> {
    const [code, user] = await this.usersService.create(body);
    switch (code) {
      case UsersResponse.Success:
        return user;
      case UsersResponse.BadRequest:
        throw new BadRequestException(`Invalid request`);
      case UsersResponse.UserAlreadyExist:
        throw new ConflictException(`User already exist`);
      default:
        throw new InternalServerErrorException(`Internal error`);
    }
  }
}
