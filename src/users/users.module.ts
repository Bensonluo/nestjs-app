import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { PasswordService } from './password.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersController } from './users.controller';
import { User, UserSchema } from './schemas/user.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [UsersController],
  providers: [UsersService, PasswordService],
})
export class UsersModule {}
