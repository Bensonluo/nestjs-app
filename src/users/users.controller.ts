import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LockUserDto } from './dto/lock-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('create')
  create(@Body() createUserDto: CreateUserDto) {
    try {
      return this.usersService.create(createUserDto);
    } catch (error) {
      console.log(error);
      return { code: 0, msg: 'fail to create user', data: error.response };
    }
  }

  @Get(':username')
  findOne(@Param('username') username: string) {
    return this.usersService.findOneByName(username);
  }

  @Patch('lock')
  update(@Body() lockUserDto: LockUserDto) {
    try {
      return this.usersService.lockUser(lockUserDto.username);
    } catch (error) {
      console.log(error);
      return { code: 0, msg: 'fail to lock user', data: error.response };
    }
  }
}
