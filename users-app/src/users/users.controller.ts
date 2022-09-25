import {
  BadRequestException,
  Body,
  ConflictException,
  Controller,
  Delete,
  Get,
  HttpCode,
  InternalServerErrorException,
  NotFoundException,
  Post,
  Put,
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
import { AddUserDto } from './dtos/add-user.dto';
import { EditUserDto } from './dtos/edit-user.dto';
import { GetUserDto } from './dtos/get-user.dto';
import { DeleteUserDto } from './dtos/remove-user.dto';
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
  async get(@Query() query: GetUserDto): Promise<UserModel> {
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
  @ApiConflictResponse({ description: 'User already exists' })
  async post(@Body() body: AddUserDto): Promise<UserModel> {
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

  @Put()
  @HttpCode(200)
  @ApiOkResponse({ type: UserModel, description: 'User was updated' })
  @ApiNotFoundResponse({ description: `User was not found` })
  async put(@Body() body: EditUserDto): Promise<UserModel> {
    const [code, user] = await this.usersService.update(body);
    switch (code) {
      case UsersResponse.Success:
        return user;
      case UsersResponse.UserNotFound:
        throw new NotFoundException(`User was not found`);
      default:
        throw new InternalServerErrorException(`Internal errror`);
    }
  }

  @Delete()
  @HttpCode(200)
  @ApiOkResponse({ type: UserModel, description: 'User was deleted' })
  @ApiNotFoundResponse({ description: `User was not found` })
  async delete(@Body() body: DeleteUserDto): Promise<UserModel> {
    const [code, user] = await this.usersService.delete(body);
    switch (code) {
      case UsersResponse.Success:
        return user;
      case UsersResponse.UserNotFound:
        throw new NotFoundException(`User was not found`);
      default:
        throw new InternalServerErrorException(`Internal errror`);
    }
  }
}
