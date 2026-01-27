import { Module } from '@lib/decorators';
import { AppModule } from '@lib/interfaces';
import { BranController } from './infra/controller';

@Module({ name: 'brands', controllers: [BranController] })
export class BrandModule implements AppModule {
  public active = true;
}
