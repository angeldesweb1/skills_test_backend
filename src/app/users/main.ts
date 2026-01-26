import { Module } from '@lib/decorators/module.decorator';
import { AppModule } from '@lib/interfaces';
import { injectable } from 'inversify';

@Module({ name: 'users', children: [] })
export class UsersModule {
  constructor() {}
  public active = true;
}
