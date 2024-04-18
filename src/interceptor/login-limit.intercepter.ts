import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  HttpException,
  HttpStatus,
  Inject,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Cache } from 'cache-manager';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { UsersService } from '../users/users.service';

@Injectable()
export class loginLimitInterceptor implements NestInterceptor {
  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private readonly usersService: UsersService,
  ) {}

  async intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Promise<Observable<any>> {
    const key = context.switchToHttp().getRequest().body.username;
    console.log('username', key);
    const attempts: number = await this.cacheManager.get(key);
    if (attempts >= 3) {
      await this.usersService.lockUser(key);
      throw new HttpException(
        'Too many attempts, you have been locked',
        HttpStatus.TOO_MANY_REQUESTS,
      );
    }

    return next.handle().pipe(tap(() => {}));
  }
}
