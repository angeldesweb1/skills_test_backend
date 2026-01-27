import { Module } from '@lib/decorators';
import { AppModule } from '@lib/interfaces';

@Module({ name: 'vehicles', controllers: [] })
export class VehiclesModule implements AppModule {
  public active = true;
}
