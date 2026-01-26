import { AppModule } from './module.interface';

export interface CoreMainFactory {
  mount(adapter: string): unknown;
  create(root: AppModule): unknown;
  connector(name: string, ...args: unknown[]): unknown;
  env(type?: 'dotenv' | 'json'): unknown;
  run(...args: unknown[]): unknown;
}
