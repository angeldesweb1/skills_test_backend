export interface AppRootModule {
  active: boolean;
}

export interface AppModule {
  active: boolean;
}

export interface CoreConfigModule {
  exists(key: string): boolean;
  env(type?: 'dotenv' | 'json'): unknown;
  get(key: string): unknown;
  getEnv(): unknown;
  getKeys(): unknown;
}
