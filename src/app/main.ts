import { Module } from '@lib/decorators/module.decorator';
import { injectable } from 'inversify';
import { VehiclesModule } from './vehicles/main';
import { UsersModule } from './users/main';
import { AppRootModule } from '@lib/interfaces';

@injectable()
@Module('root')
export class RootModule implements AppRootModule {
  public children = [VehiclesModule, UsersModule];
  public globalMiddlewares = [];
}
