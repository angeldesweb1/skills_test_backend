import { CoreAdapter } from '@lib/interfaces';
import { injectable } from 'inversify';

@injectable()
export class HTTPAdapter implements CoreAdapter {
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
