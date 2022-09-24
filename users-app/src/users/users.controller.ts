import {
  BadRequestException,
  Body,
  ConflictException,
  Controller,
  Get,
  HttpCode,
  InternalServerErrorException,
  NotFoundException,
  Post,
  Query,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AddEvmUserDto } from './dtos/add-evm-user.dto';
import { GetEvmUser } from './dtos/get-evm-user.dto';
import { UserModel } from './models/user.model';
import { UsersResponse } from './users.response';
import { UsersService } from './users.service';

@ApiTags(`users`)
@Controller({ path: 'users', version: '1' })
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @HttpCode(200)
  @ApiOkResponse({ type: UserModel, description: 'User found' })
  @ApiNotFoundResponse({ description: 'User was not found' })
  async get(@Query() query: GetEvmUser): Promise<UserModel> {
    const [code, user] = await this.usersService.get(query);
    switch (code) {
      case UsersResponse.Success:
        return user;
      case UsersResponse.UserNotFound:
        throw new NotFoundException(`User does not exist`);
      default:
        throw new InternalServerErrorException(`Internal error`);
    }
  }

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
