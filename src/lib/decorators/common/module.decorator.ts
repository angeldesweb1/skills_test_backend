import { CoreManager } from '@lib/core/main/containter.core';
import { MODULE_REGISTRY } from '@lib/di/keys';
import { AppModule, CoreModuleRegistry, type Module } from '@lib/interfaces';

const manager = CoreManager.manage();
const registry = manager.get<CoreModuleRegistry>(MODULE_REGISTRY);

interface EntryModuleParams {
  children: Module[];
  globalMiddlewares?: any[];
  base?: string;
}

interface ModuleParams {
  name: string;
  controllers: unknown[];
  moduleMiddlewares?: unknown[];
}

export function EntryModule({ children, globalMiddlewares, base }: EntryModuleParams) {
  return (target: any) => {
    registry.addEntry('root', { children, name: 'root', module: target });
    Reflect.defineMetadata('module:name', 'root', target);
    Reflect.defineMetadata('module:children', children, target);
    Reflect.defineMetadata('module:base', `/${base}`, target);
    if (globalMiddlewares) Reflect.defineMetadata('module:middlewares', globalMiddlewares, target);
  };
}

export function Module({ name, controllers, moduleMiddlewares }: ModuleParams) {
  return (target: any) => {
    Reflect.defineMetadata('module:name', name, target);
    Reflect.defineMetadata('module:controllers', controllers, target);
  };
}
