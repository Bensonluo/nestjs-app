import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/loginDto';
import { UsersService } from '../users/users.service';
import { PasswordService } from '../users/password.service';
import * as process from 'node:process';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly passwordService: PasswordService,
    private readonly jwtService: JwtService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  async login(username: string, password: string) {
    const user = await this.usersService.findOneByName(username);
    if (!user) throw new BadRequestException('user not found');

    const compareRes: boolean = await this.passwordService.comparePassword(
      password,
      user.password,
    );

    if (!compareRes) {
      const key = username;
      const attempts: number = await this.cacheManager.get(key);

      if (!attempts) {
        await this.cacheManager.set(key, 1, 300000);
      } else {
        await this.cacheManager.set(key, attempts + 1);
        console.log('Failed login attempts', attempts + 1);
      }

      throw new BadRequestException('incorrect password');
    }

    if (user.locked) throw new BadRequestException('user already locked');

    const payload = { username: user.username, userId: user._id };
    console.log(process.env.JWT_SECRET, payload);
    return this.jwtService.sign(payload, {
      secret: process.env.JWT_SECRET,
    });
  }
}
