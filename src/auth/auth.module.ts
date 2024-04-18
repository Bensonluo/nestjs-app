import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import * as process from 'node:process';
import { PasswordService } from '../users/password.service';
import { UsersService } from '../users/users.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '../users/schemas/user.schema';
import { CacheModule } from '@nestjs/cache-manager';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET,
    }),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    CacheModule.register({
      ttl: 300000,
      max: 1000,
      isGlobal: false,
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, UsersService, PasswordService],
})
export class AuthModule {}
