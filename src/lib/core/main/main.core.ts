import { getAdapter, SupportedAdapters } from '@lib/adapters';
import {
  AppModule,
  CoreAdapter,
  CoreConfigModule,
  CoreMainFactory,
  CoreModuleRegistry,
  type ILogger,
} from '@lib/interfaces';
import { injectable } from 'inversify';
import { CoreManager } from './containter.core';
import { ConfigModule } from '@lib/common/config/config.module';
import { ADAPTER, FACTORY, LOGGER, MODULE_REGISTRY } from '@lib/di/keys';

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

  create() {
    const registry = this.manager.get<CoreModuleRegistry>(MODULE_REGISTRY);
    const rootID = registry.getEntry('root');
    if (!rootID) throw new Error('Root module not found');
    const root = this.manager.get<{ greet: () => void }>(rootID);
    this.manager.get<CoreAdapter>(ADAPTER).configure(root);
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
