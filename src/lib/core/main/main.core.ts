import { getAdapter, SupportedAdapters } from '@lib/adapters';
import {
  AppModule,
  CoreAdapter,
  CoreConfigModule,
  CoreMainFactory,
  type ILogger,
} from '@lib/interfaces';
import { injectable } from 'inversify';
import { CoreManager } from './containter.core';
import { ConfigModule } from '@lib/common/config/config.module';
import { ADAPTER, FACTORY, LOGGER } from '@lib/di/keys';

@injectable()
export class AppFactory implements CoreMainFactory {
  private manager: CoreManager = CoreManager.manage();
  private logger: ILogger = this.manager.get<ILogger>(LOGGER);

  constructor() {
    this.manager.add<CoreMainFactory>(AppFactory, FACTORY);
    return this;
  }

  async mount(adapter: SupportedAdapters): Promise<void> {
    this.logger.log('mounting application with adapter: ', adapter);
    const Adapter = await getAdapter(adapter);
    this.manager.add<CoreAdapter>(Adapter, ADAPTER, true);
    this.manager.get<CoreAdapter>(ADAPTER).mount();
  }

  async getConfig(type: 'dotenv' | 'json') {
    this.manager.add<CoreConfigModule>(ConfigModule, 'APP_CONFIG', true);
    const config = await this.manager.get<ConfigModule>('APP_CONFIG').env(type);
    return config?.getEnv();
  }

  create(root: AppModule): unknown {
    throw new Error('Method not implemented.');
  }

  connector(name: string, ...args: unknown[]): unknown {
    throw new Error('Method not implemented.');
  }

  env(type?: 'dotenv' | 'json'): unknown {
    throw new Error('Method not implemented.');
  }

  run(...args: unknown[]): unknown {
    throw new Error('Method not implemented.');
  }
}
