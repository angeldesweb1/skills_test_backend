export interface AppModule {
  controllers?: unknown[];
  services?: unknown[];
}

export interface CoreConfigModule {
  exists(key: string): boolean;
  env(type?: 'dotenv' | 'json'): unknown;
  get(key: string): unknown;
  getEnv(): unknown;
  getKeys(): unknown;
}
