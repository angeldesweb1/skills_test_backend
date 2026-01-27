import { getAdapter, SupportedAdapters } from '@lib/adapters';
import {
  AppModule,
  CoreAdapter,
  CoreConfigModule,
  CoreDBConnector,
  CoreMainFactory,
  CoreModuleRegistry,
  type ILogger,
} from '@lib/interfaces';
import { injectable } from 'inversify';
import { CoreManager } from './containter.core';
import { ConfigModule } from '@lib/common/config/config.module';
import {
  ADAPTER,
  CONFIG,
  DB,
  FACTORY,
  LOGGER,
  MODULE_REGISTRY,
} from '@lib/di/keys';
import { getConnector, SupportedConnectors } from '@lib/connectors';

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

  async getConfig(type: 'dotenv' | 'json', envFile?: string) {
    this.manager.add<CoreConfigModule>(ConfigModule, CONFIG, true);
    const config = await this.manager
      .get<ConfigModule>(CONFIG)
      .env(type, envFile);
    return config?.getEnv();
  }

  create() {
    const registry = this.manager.get<CoreModuleRegistry>(MODULE_REGISTRY);
    this.manager.get<CoreAdapter>(ADAPTER).configure(registry);
  }

  async connector(name: SupportedConnectors, connString: string) {
    const connector = await getConnector(name);
    this.manager.add<CoreDBConnector>(connector, DB, true);
    await this.manager.get<CoreDBConnector>(DB).connect(connString);
  }

  env(type?: 'dotenv' | 'json'): unknown {
    throw new Error('Method not implemented.');
  }

  async run(port: string | number, host?: string): Promise<void> {
    await this.manager.get<CoreAdapter>(ADAPTER).listen({ port, host });
  }
}
