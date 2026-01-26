import { provide } from '@inversifyjs/binding-decorators';
import { MODULE_REGISTRY } from '@lib/di/keys';
import { CoreModuleRegistry, RegEntry } from '@lib/interfaces';
import { injectable } from 'inversify';

@injectable()
@provide(MODULE_REGISTRY, (binding) => {
  binding.inSingletonScope();
})
export class ModuleRegistry implements CoreModuleRegistry {
  private readonly modules: Map<string, RegEntry>;

  constructor() {
    this.modules = new Map();
  }

  exists(key: string) {
    return this.modules.has(key);
  }

  addEntry(key: string, entry: RegEntry) {
    if (!this.exists(key)) this.modules.set(key, entry);
  }

  getEntry(key: string) {
    if (this.exists(key)) return this.modules.get(key);
    return undefined;
  }

  allEntries() {
    return this.modules;
  }

  deleteEntry(key: string) {
    if (this.exists(key)) this.modules.delete(key);
  }
}
