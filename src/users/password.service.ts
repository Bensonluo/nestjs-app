import { Injectable } from '@nestjs/common';
import { hashSync, compareSync } from 'bcryptjs';

@Injectable()
export class PasswordService {
  private readonly saltRounds = 10;

  async hashPassword(password: string): Promise<string> {
    return hashSync(password, this.saltRounds);
  }

  async comparePassword(
    passwordAttempt: string,
    passwordHash: string,
  ): Promise<boolean> {
    return compareSync(passwordAttempt, passwordHash);
  }
}
