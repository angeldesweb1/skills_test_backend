interface RouteDefinition {
  path: string;
  httpMethod: 'get' | 'post' | 'put' | 'delete' | 'patch';
  methodName: string;
  middlewares?: any[]; // Por si decides añadir middlewares luego
}

export function createRouteDecorator(
  method: RouteDefinition['httpMethod'],
  path?: string,
  middlewares?: any[],
) {
  return (path: string, middlewares: any[] = []): MethodDecorator => {
    return (
      target: Object,
      propertyKey: string | symbol,
      descriptor: TypedPropertyDescriptor<any>,
    ) => {
      Reflect.defineMetadata('path', `/${path}`, target, propertyKey);
      Reflect.defineMetadata('method', method, target, propertyKey);
      Reflect.defineMetadata('middlewares', middlewares, target, propertyKey);

      return descriptor;
    };
  };
}

//export const Get = (path?: string, middlewares?: any[]) => {};
// createRouteDecorator('get', path, middlewares);

export function Get(path: string = '') {
  return (
    target: any,
    propertyKey: string | symbol,
    descriptor: TypedPropertyDescriptor<any>,
  ) => {
    Reflect.defineMetadata('method', 'get', target, propertyKey);
    Reflect.defineMetadata('path', `/${path}`, target, propertyKey);

    return descriptor;
  };
}

export function Post(path: string = '') {
  return (
    target: any,
    propertyKey: string | symbol,
    descriptor: TypedPropertyDescriptor<any>,
  ) => {
    Reflect.defineMetadata('method', 'post', target, propertyKey);
    Reflect.defineMetadata('path', `/${path}`, target, propertyKey);

    return descriptor;
  };
}

export function Put(path: string = '') {
  return (
    target: any,
    propertyKey: string | symbol,
    descriptor: TypedPropertyDescriptor<any>,
  ) => {
    Reflect.defineMetadata('method', 'put', target, propertyKey);
    Reflect.defineMetadata('path', `/${path}`, target, propertyKey);

    return descriptor;
  };
}

export function Patch(path: string = '') {
  return (
    target: any,
    propertyKey: string | symbol,
    descriptor: TypedPropertyDescriptor<any>,
  ) => {
    Reflect.defineMetadata('method', 'patch', target, propertyKey);
    Reflect.defineMetadata('path', `/${path}`, target, propertyKey);

    return descriptor;
  };
}

export function Del(path: string = '') {
  return (
    target: any,
    propertyKey: string | symbol,
    descriptor: TypedPropertyDescriptor<any>,
  ) => {
    Reflect.defineMetadata('method', 'delete', target, propertyKey);
    Reflect.defineMetadata('path', `/${path}`, target, propertyKey);

    return descriptor;
  };
}

// export const Put = (path?: string, middlewares?: any[]) =>
//   createRouteDecorator('put', path, middlewares);

// export const Patch = (path?: string, middlewares?: any[]) =>
//   createRouteDecorator('patch', path, middlewares);

// export const Del = (path?: string, middlewares?: any[]) =>
//   createRouteDecorator('delete', path, middlewares);
