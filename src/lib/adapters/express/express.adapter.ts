import { CoreAdapter, type ILogger } from '@lib/interfaces';
import { inject, injectable } from 'inversify';

@injectable()
export class ExpressAdapter implements CoreAdapter {
  constructor(@inject('APP_LOGGER') private logger: ILogger) {
    this.logger.tag('builder').success('adapter express mounted');
  }

  mount(...args: unknown[]) {
    this.logger.tag('builder').warning('configuring express adapter');
  }

  listen(...args: unknown[]): unknown {
    throw new Error('Method not implemented.');
  }

  unmount(...args: unknown[]): unknown {
    throw new Error('Method not implemented.');
  }
}
