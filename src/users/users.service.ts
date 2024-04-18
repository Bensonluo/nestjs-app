import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { PasswordService } from './password.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private readonly passwordService: PasswordService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    try {
      createUserDto.password = await this.passwordService.hashPassword(
        createUserDto.password,
      );
      const createdUser = new this.userModel(createUserDto);
      return createdUser.save();
    } catch (error) {
      console.log(error);
    }
  }

  async findOneByName(username: string) {
    return this.userModel.findOne({ username: username });
  }

  async lockUser(username: string) {
    const updateQuery = {
      $set: {
        locked: true,
      },
    };

    try {
      return this.userModel.updateOne({ username: username }, updateQuery);
    } catch (error) {
      console.log(error);
    }
  }
}
