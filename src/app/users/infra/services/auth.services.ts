import { AuthResponse } from '@app/users/app/auth.responses';
import { AuthUseCase } from '@app/users/app/user.usecases';
import { LoginInput, RegisterInput } from '@app/users/domain/user.dto';
import { HashService } from './bcrypt.services';
import { JwtService } from './token.services';
import { MongoUserRepository } from '../repositories/mongo_user.repository';
import { UserRepository } from '@app/users/domain/user.repository';
import { UserEntity } from '@app/users/domain/user.entity';

export class AuthService implements AuthUseCase {
  private readonly bcrypt: HashService;
  private readonly jwt: JwtService;
  private readonly repository: UserRepository;

  constructor() {
    this.bcrypt = new HashService();
    this.jwt = new JwtService();
    this.repository = new MongoUserRepository();
  }

  async login(input: LoginInput): Promise<AuthResponse> {
    const { email, password } = input;
    const user = await this.repository.findByEmail(email);
    if (!user) return this.errorResponse('Invalid credentials');
    const isValid = await this.comparePassword(password, user.password);
    if (!isValid)
      return this.errorResponse('Invalid credentials, invalid pass');

    const token = await this.generateToken(user);
    return {
      success: true,
      token,
      user: this.cleanUser(user),
      error: null,
    };
  }

  async register(input: RegisterInput): Promise<AuthResponse> {
    const { email, password, uuid } = input;
    const user = await this.repository.findByEmail(email);
    if (user) return this.errorResponse('User already exists');
    const newUser = await this.repository.create({
      email,
      uuid,
      password,
    });
    if (!newUser) return this.errorResponse('Register failed');
    const token = await this.generateToken(newUser);
    return {
      success: true,
      token,
      user: this.cleanUser(newUser),
      error: null,
    };
  }

  private async comparePassword(
    password: string,
    hash: string,
  ): Promise<boolean> {
    return this.bcrypt.isValid(password, hash);
  }

  private async generateToken(user: any): Promise<string> {
    return this.jwt.createToken(user);
  }

  private errorResponse(error: string): AuthResponse {
    return {
      success: false,
      token: null,
      user: null,
      error,
    };
  }

  private cleanUser(user: UserEntity) {
    const { _id, email, uuid, createdAt, updatedAt } = user;
    return { _id, email, uuid, createdAt, updatedAt };
  }
}
