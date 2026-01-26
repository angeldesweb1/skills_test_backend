import { Module } from '@lib/decorators/module.decorator';
import { AppModule } from '@lib/interfaces';

@Module({ name: 'vehicles', children: [] })
export class VehiclesModule implements AppModule {
  public active = true;
}
