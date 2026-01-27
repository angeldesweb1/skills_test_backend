import { CoreAdapter } from '@lib/interfaces';
import { injectable } from 'inversify';
import { SupportedAdapters } from '..';

@injectable()
export class HTTPAdapter implements CoreAdapter {
  public name: SupportedAdapters = 'http';

  configure(...args: unknown[]): unknown {
    throw new Error('Method not implemented.');
  }

  mount(...args: unknown[]): unknown {
    throw new Error('Method not implemented.');
  }

  listen(...args: unknown[]): unknown {
    throw new Error('Method not implemented.');
  }

  unmount(...args: unknown[]): unknown {
    throw new Error('Method not implemented.');
  }
}
