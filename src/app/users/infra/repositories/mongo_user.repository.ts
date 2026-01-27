import { CreateUserDto, UpdateUserDto } from '@app/users/domain/user.dto';
import { UserEntity } from '@app/users/domain/user.entity';
import { UserRepository } from '@app/users/domain/user.repository';
import { UserModel } from '../models/user.model';

export class MongoUserRepository implements UserRepository {
  private readonly model = UserModel;

  async create(input: CreateUserDto): Promise<UserEntity | null> {
    const data = new this.model(input);
    const doc = await data.save();
    return doc;
  }

  async find(...args: unknown[]): Promise<UserEntity[]> {
    return [];
  }

  async findByEmail(email: string): Promise<UserEntity | null> {
    const doc = await this.model.findOne({ email }).select('+password');
    if (!doc) return null;
    return doc;
  }

  async findById(id: string): Promise<UserEntity | null> {
    const doc = await this.model.findById(id);
    if (!doc) return null;
    return doc;
  }

  async update(id: string, input: UpdateUserDto): Promise<UserEntity | null> {
    const doc = await this.model.findByIdAndUpdate(id, input, { new: true });
    if (!doc) return null;
    return doc;
  }

  async delete(id: string): Promise<UserEntity | null> {
    return await this.model.findByIdAndDelete(id);
  }
}
