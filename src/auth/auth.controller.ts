import { Body, Controller, Post, UseInterceptors } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/loginDto';
import { loginLimitInterceptor } from '../interceptor/login-limit.intercepter';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('login')
  @UseInterceptors(loginLimitInterceptor)
  async login(@Body() loginDto: LoginDto) {
    try {
      const token = await this.authService.login(
        loginDto.username,
        loginDto.password,
      );
      return { code: 1, access_token: token, msg: 'success' };
    } catch (error) {
      console.log(error);
      return { code: 0, data: error.response, msg: 'login failed' };
    }
  }
}
