import { CoreDBConnector } from '@lib/interfaces';

export class MongooseConnector implements CoreDBConnector {
  constructor() {}

  connect(...args: unknown[]): unknown {
    throw new Error('method not implemented');
  }

  disconnect(...args: unknown[]): unknown {
    throw new Error('method not implemented');
  }
}
