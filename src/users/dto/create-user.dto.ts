export class CreateUserDto {
  readonly username: string;
  password: string;
  readonly locked: boolean;
}
