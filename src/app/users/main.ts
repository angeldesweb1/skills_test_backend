import { Module } from '@lib/decorators';
import { AppModule } from '@lib/interfaces';
import { UsersController } from './infra/controller';

@Module({ name: 'users', controllers: [UsersController] })
export class UsersModule implements AppModule {
  constructor() {}
  public active = true;
}
