import { CoreAdapter, type ILogger } from '@lib/interfaces';
import { inject, injectable } from 'inversify';
import { getApplication } from './express.modules';
import { Application } from 'express';

@injectable()
export class ExpressAdapter implements CoreAdapter {
  private app: Application | undefined = undefined;
  constructor(@inject('APP_LOGGER') private logger: ILogger) {}

  mount(...args: unknown[]) {
    this.logger.tag('builder').warning('configuring express adapter');
    this.app = getApplication();
  }

  configure(...args: unknown[]) {}

  listen(...args: unknown[]): unknown {
    throw new Error('Method not implemented.');
  }

  unmount(...args: unknown[]): unknown {
    throw new Error('Method not implemented.');
  }
}
