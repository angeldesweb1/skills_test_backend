import { EntryModule, Module } from '@lib/decorators/module.decorator';
import { injectable } from 'inversify';
import { VehiclesModule } from './vehicles/main';
import { UsersModule } from './users/main';
import { AppModule, AppRootModule } from '@lib/interfaces';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';

@EntryModule({
  children: [VehiclesModule, UsersModule],
  globalMiddlewares: [cors(), morgan('tiny'), helmet()],
  base: 'api/v1',
})
export class RootModule implements AppRootModule {
  public active = true;
}
