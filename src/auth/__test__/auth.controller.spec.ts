/*
import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from '../auth.controller';
import { AuthService } from '../auth.service';
import { LoginDto } from '../dto/loginDto';
import { loginLimitInterceptor } from '../../interceptor/login-limit.intercepter';
import { CallHandler, ExecutionContext } from '@nestjs/common';

describe('AuthController', () => {
  let controller: AuthController;
  let mockAuthService: Partial<AuthService>;
  let mockLoginInterceptor: Partial<loginLimitInterceptor>;

  beforeEach(async () => {
    mockAuthService = {
      login: () => {
        return Promise.resolve('token');
      },
    };
    mockLoginInterceptor = {
      intercept: (context: ExecutionContext, next: CallHandler) => {
        return Promise.resolve(next.handle());
      },
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: mockAuthService,
        },
        {
          provide: loginLimitInterceptor,
          useValue: mockLoginInterceptor,
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should be login', async () => {
    const res = controller.login({
      username: 'test',
      password: '122226',
    } as LoginDto);
    expect(await res).not.toBeNull();
    expect((await res).access_token).toBe('token');
  });
});
*/
