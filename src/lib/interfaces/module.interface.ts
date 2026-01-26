export interface AppRootModule {
  children: unknown[];
  globalMiddlewares: any[];
}

export interface AppModule {
  children: unknown[];
  moduleMiddlewares: unknown[];
  controllers: unknown[];
}

export interface CoreConfigModule {
  exists(key: string): boolean;
  env(type?: 'dotenv' | 'json'): unknown;
  get(key: string): unknown;
  getEnv(): unknown;
  getKeys(): unknown;
}

export type Module = new () => AppRootModule | AppModule;

export interface CoreModuleRegistry {
  exists(key: string): boolean;
  addEntry(key: string, entry: Module): void;
  getEntry(key: string): Module;
  allEntries(): Record<string, Module>;
  deleteEntry(key: string): void;
}
