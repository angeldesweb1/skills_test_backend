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

export interface CoreModuleRegistry {
  exists(key: string): boolean;
  addEntry(key: string, entry: string | symbol): void;
  getEntry(key: string): unknown;
  allEntries(): unknown;
  deleteEntry(key: string): void;
}
