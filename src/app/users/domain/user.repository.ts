import { CreateUserDto, UpdateUserDto } from './user.dto';
import { UserEntity } from './user.entity';

export interface UserRepository {
  create(input: CreateUserDto): Promise<UserEntity | null>;
  find(...args: unknown[]): Promise<UserEntity[] | null>;
  findByEmail(email: string, password?: string): Promise<UserEntity | null>;
  findById(id: string): Promise<UserEntity | null>;
  update(id: string, input: UpdateUserDto): Promise<UserEntity | null>;
  delete(id: string): Promise<UserEntity | null>;
}
