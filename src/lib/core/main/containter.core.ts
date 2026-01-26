import { Container } from 'inversify';
import { buildProviderModule } from '@inversifyjs/binding-decorators';
import '@lib/common';

export class CoreManager {
  private readonly container: Container;

  private static instance: CoreManager;

  private constructor() {
    this.container = new Container();
    this.container.load(buildProviderModule());
  }

  public static manage(): CoreManager {
    if (!CoreManager.instance) {
      CoreManager.instance = new CoreManager();
    }
    return CoreManager.instance;
  }

  add<T>(Module: new (...args: any[]) => T, id: string | symbol) {
    this.container.bind<T>(id).to(Module);
  }

  exists(id: string | symbol) {
    return this.container.isBound(id);
  }

  get<T>(id: string | symbol): T {
    return this.container.get<T>(id);
  }
}
