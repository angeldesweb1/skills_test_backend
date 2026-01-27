import { Module } from '@lib/decorators';
import { AppModule } from '@lib/interfaces';
import { VehiclesController } from './infra/controller';

@Module({ name: 'vehicles', controllers: [VehiclesController] })
export class VehiclesModule implements AppModule {
  public active = true;
}
