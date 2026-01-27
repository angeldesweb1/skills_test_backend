import { Module } from '@lib/decorators';
import { AppModule } from '@lib/interfaces';
import { ModelController } from './infra/controller';

@Module({ name: 'brands', controllers: [ModelController] })
export class ModelModule implements AppModule {
  public active = true;
}
