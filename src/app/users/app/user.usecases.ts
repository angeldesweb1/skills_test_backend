import { LoginInput, RegisterInput } from '../domain/user.dto';
import { AuthResponse } from './auth.responses';

export interface AuthUseCase {
  login(input: LoginInput): Promise<AuthResponse>;
  register(input: RegisterInput): Promise<AuthResponse>;
}
