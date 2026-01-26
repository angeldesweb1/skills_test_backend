import { CoreManager } from '@lib/core/main/containter.core';
import { MODULE_REGISTRY } from '@lib/di/keys';
import { CoreModuleRegistry } from '@lib/interfaces';

const manager = CoreManager.manage();

export function Module({ name, children }: { name: string; children: any[] }) {
  return (target: any) => {
    manager.get<CoreModuleRegistry>(MODULE_REGISTRY).addEntry(name, target);
    Reflect.defineMetadata('module:name', name, target.constructor);
    Reflect.defineMetadata('module:children', children, target.constructor);
  };
}
