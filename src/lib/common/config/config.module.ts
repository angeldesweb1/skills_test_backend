import { LOGGER } from '@lib/di/keys';
import { CoreConfigModule, type ILogger } from '@lib/interfaces';
import { inject, injectable } from 'inversify';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { cwd } from 'node:process';

@injectable()
export class ConfigModule implements CoreConfigModule {
  private envVars: Record<string, unknown> = {};

  constructor(@inject(LOGGER) private logger: ILogger) {}

  private async useEnv(envFile?: string) {
    const env = await readFile(join(cwd(), envFile ?? '.env'));
    const vars = await require('dotenv').parse(env);
    this.envVars = Object.fromEntries(
      Object.entries(vars).map(([key, value]) => [key.toLowerCase(), value]),
    );
  }

  exists(key: string): boolean {
    return Object.keys(this.envVars).includes(key);
  }

  async env(type?: 'dotenv' | 'json', envFile?: string) {
    if (type === 'dotenv') {
      await this.useEnv(process.env.ENV ?? envFile);
    }
    if (type === 'json') return;
    return this;
  }

  get(key: string) {
    if (!this.exists(key)) {
      this.logger.tag('builder').error(`key ${key} not found`);
      throw new Error(`key ${key} not found`);
    }
    return this.envVars[key];
  }

  getEnv() {
    return this.envVars;
  }

  getKeys() {
    return Object.keys(this.envVars);
  }
}
