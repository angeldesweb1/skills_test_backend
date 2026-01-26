import { Module } from '@lib/decorators/module.decorator';
import { AppModule } from '@lib/interfaces';

@Module({ name: 'users', children: [] })
export class UsersModule implements AppModule {
  constructor() {}
  public active = true;
}
