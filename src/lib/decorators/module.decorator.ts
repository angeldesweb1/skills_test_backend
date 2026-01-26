import { provide } from '@inversifyjs/binding-decorators';
import { CoreManager } from '@lib/core/main/containter.core';
import { ADAPTER, MODULE_REGISTRY } from '@lib/di/keys';
import { CoreAdapter, CoreModuleRegistry } from '@lib/interfaces';

const manager = CoreManager.manage();

export function Module(name: string) {
  return (target: any) => {
    const identifier = Symbol.for(name);
    manager.get<CoreModuleRegistry>(MODULE_REGISTRY).addEntry(name, identifier);
    manager.add(target, identifier, true);
  };
}
