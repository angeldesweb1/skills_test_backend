import { Module } from '@lib/decorators';
import { AppModule } from '@lib/interfaces';
import { AuthController } from './infra/controller';

@Module({ name: 'users', controllers: [AuthController] })
export class UsersModule implements AppModule {
  constructor() {}
  public active = true;
}
