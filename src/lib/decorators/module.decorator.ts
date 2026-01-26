import { provide } from '@inversifyjs/binding-decorators';
import { CoreManager } from '@lib/core/main/containter.core';
import { ADAPTER, MODULE_REGISTRY } from '@lib/di/keys';
import { CoreAdapter, CoreModuleRegistry } from '@lib/interfaces';

const manager = CoreManager.manage();

interface DecoMeta {
  name: string;
  globalMiddlewares: any[];
  root?: boolean;
  base?: string;
}

export function Module({ name, globalMiddlewares, root, base }: DecoMeta) {
  return (target: any) => {
    const identifier = Symbol.for(name);
    // const adapter = manager.get<CoreAdapter>(ADAPTER).name;
    provide(identifier)(target);
    manager.get<CoreModuleRegistry>(MODULE_REGISTRY).addEntry(name, identifier);
  };
}
