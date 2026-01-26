import { Module } from '@lib/decorators/module.decorator';
import { AppModule } from '@lib/interfaces';
import { injectable } from 'inversify';

@Module({ name: 'vehicles', children: [] })
export class VehiclesModule implements AppModule {
  children = [];
  controllers = [];
  moduleMiddlewares = [];
}
