export interface DecoratedRoute {
  method: 'get' | 'post' | 'put' | 'patch' | 'delete';
  methodName: string;
  path: string;
  middlewares?: any;
}

export function Controller(name: string) {
  return (target: any) => {
    Reflect.defineMetadata('controller:name', name, target);
    Reflect.defineMetadata('controller:base', `/${name}`, target);
    const prototype = target.prototype;
    const methodNames = Object.getOwnPropertyNames(prototype);
    let routes: DecoratedRoute[] = [];

    methodNames.forEach((methodName) => {
      if (methodName === 'constructor') return;
      const method = Reflect.getMetadata('method', prototype, methodName);
      const path = Reflect.getMetadata('path', prototype, methodName);
      const middlewares = Reflect.getMetadata(
        'middlewares',
        prototype,
        methodName,
      );

      routes = [...routes, { method, methodName, path, middlewares }];
    });

    Reflect.defineMetadata('controller:routes', routes, target);
  };
}
