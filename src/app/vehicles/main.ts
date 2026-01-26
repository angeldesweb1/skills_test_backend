import { Module } from '@lib/decorators/module.decorator';
import { AppModule } from '@lib/interfaces';
import { injectable } from 'inversify';

@injectable()
@Module('vehicles')
export class VehiclesModule implements AppModule {
  children = [];
  controllers = [];
  moduleMiddlewares = [];
}
