import { Module } from '@lib/decorators/module.decorator';
import { AppModule } from '@lib/interfaces';
import { injectable } from 'inversify';

@Module({ name: 'users', children: [] })
export class UsersModule implements AppModule {
  children = [];
  controllers = [];
  moduleMiddlewares = [];
}
