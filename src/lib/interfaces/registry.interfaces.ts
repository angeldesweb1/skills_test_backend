import { AppModule, AppRootModule } from './module.interface';

export type Module = (new () => AppModule) | (new () => AppRootModule);

export interface RegEntry {
  name: string;
  children: Module[];
  module: Module;
}

export interface CoreModuleRegistry {
  exists(key: string): boolean;
  addEntry(key: string, entry: RegEntry): void;
  getEntry(key: string): RegEntry | undefined;
  allEntries(): Map<string, RegEntry>;
  deleteEntry(key: string): void;
}
