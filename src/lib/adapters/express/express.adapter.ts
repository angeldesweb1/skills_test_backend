import { CoreAdapter, CoreModuleRegistry, type ILogger } from '@lib/interfaces';
import { inject, injectable } from 'inversify';
import { getApplication } from './express.modules';
import { Application } from 'express';
import { LOGGER } from '@lib/di/keys';
import { SupportedAdapters } from '..';

@injectable()
export class ExpressAdapter implements CoreAdapter {
  public name: SupportedAdapters = 'express';
  private app: Application | undefined = undefined;

  constructor(@inject(LOGGER) private logger: ILogger) {
    this.name = 'express';
  }

  mount() {
    this.logger.tag('builder').warning('configuring express adapter');
    this.app = getApplication();
  }

  configure(registry: CoreModuleRegistry) {
    console.log(registry.allEntries());
  }

  listen(...args: unknown[]): unknown {
    throw new Error('Method not implemented.');
  }

  unmount(...args: unknown[]): unknown {
    throw new Error('Method not implemented.');
  }
}
