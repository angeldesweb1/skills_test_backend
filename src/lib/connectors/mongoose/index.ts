import { LOGGER } from '@lib/di/keys';
import type { CoreDBConnector, ILogger } from '@lib/interfaces';
import { inject } from 'inversify';
import { set, connect as mongooseConnect } from 'mongoose';

export class MongooseConnector implements CoreDBConnector {
  constructor(@inject(LOGGER) private logger: ILogger) {}

  async connect(connString: string): Promise<void> {
    set('strictQuery', false);
    try {
      await mongooseConnect(connString);
      this.logger.tag('builder').success('mongoose connection established');
    } catch (error) {
      this.logger.tag('builder').error('failed to connect db', error);
    }
  }

  disconnect(...args: unknown[]): unknown {
    throw new Error('method not implemented');
  }
}
