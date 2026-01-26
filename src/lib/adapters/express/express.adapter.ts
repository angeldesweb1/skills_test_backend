import { AppRootModule, CoreAdapter, CoreModuleRegistry, RegEntry, type ILogger } from '@lib/interfaces';
import { inject, injectable } from 'inversify';
import { getApp, startExpressApp, addMiddlewares } from './express.modules';
import { Application } from 'express';
import { LOGGER } from '@lib/di/keys';
import { SupportedAdapters } from '..';
import { CoreManager } from '@lib/core/main/containter.core';

@injectable()
export class ExpressAdapter implements CoreAdapter {
  public name: SupportedAdapters = 'express';
  private manager: CoreManager = CoreManager.manage();
  private app: Application | undefined = undefined;

  constructor(@inject(LOGGER) private logger: ILogger) {
    this.name = 'express';
  }

  mount() {
    this.logger.tag('builder').warning('configuring express adapter');
    this.app = getApp();
  }

  configure(registry: CoreModuleRegistry) {
    if (!this.app) return;
    const root: RegEntry | undefined = registry.getEntry('root');
    if (!root) return;
    const module = root.module;
    console.log(Reflect.getMetadata('module:base', module));
    console.log(Reflect.getMetadata('module:middlewares', module));
    console.log(Reflect.getMetadata('module:children', module));

    // Module.children.forEach((Module) => {
    //   const meta = Reflect.getMetadata('module:name', Module as any);
    //   console.log({ meta });
    // });
    // subscribeGlobalMiddlewares(this.app, Module.globalMiddlewares);
  }

  async listen({ port, host }: { port: string | number; host: string }) {
    if (!this.app) return;
    const result = await startExpressApp(this.app, port, host);
    if (!result.success) return this.logger.tag('server').error('application failed to start', result.error);

    return this.logger.tag('server').rocket(`application running on port: ${port}`);
  }

  unmount(...args: unknown[]): unknown {
    throw new Error('Method not implemented.');
  }
}
