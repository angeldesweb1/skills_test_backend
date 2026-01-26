import { Module } from '@lib/decorators/module.decorator';
import { injectable } from 'inversify';
import { VehiclesModule } from './vehicles/main';
import { UsersModule } from './users/main';
import { AppRootModule } from '@lib/interfaces';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';

@Module({ name: 'root', children: [] })
export class RootModule implements AppRootModule {
  public children = [VehiclesModule, UsersModule];
  public globalMiddlewares = [cors(), morgan('tiny'), helmet()];
}
