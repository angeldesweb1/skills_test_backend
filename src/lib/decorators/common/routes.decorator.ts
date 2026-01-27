import { prototype } from 'node:events';

interface RouteDefinition {
  path: string;
  httpMethod: 'get' | 'post' | 'put' | 'delete' | 'patch';
  methodName: string;
  middlewares?: any[]; // Por si decides añadir middlewares luego
}

export function Get(path: string = '', middlewares: any[] = []) {
  return (
    target: any,
    propertyKey: string | symbol,
    descriptor: TypedPropertyDescriptor<any>,
  ) => {
    Reflect.defineMetadata('method', 'get', target, propertyKey);
    Reflect.defineMetadata('path', `/${path}`, target, propertyKey);
    Reflect.defineMetadata('middlewares', middlewares, target, propertyKey);

    return descriptor;
  };
}

export function Post(path: string = '', middlewares: any[] = []) {
  return (
    target: any,
    propertyKey: string | symbol,
    descriptor: TypedPropertyDescriptor<any>,
  ) => {
    Reflect.defineMetadata('method', 'post', target, propertyKey);
    Reflect.defineMetadata('path', `/${path}`, target, propertyKey);
    Reflect.defineMetadata('middlewares', middlewares, target, propertyKey);

    return descriptor;
  };
}

export function Put(path: string = '', middlewares: any[] = []) {
  return (
    target: any,
    propertyKey: string | symbol,
    descriptor: TypedPropertyDescriptor<any>,
  ) => {
    Reflect.defineMetadata('method', 'put', target, propertyKey);
    Reflect.defineMetadata('path', `/${path}`, target, propertyKey);
    Reflect.defineMetadata('middlewares', middlewares, target, propertyKey);

    return descriptor;
  };
}

export function Patch(path: string = '', middlewares: any[] = []) {
  return (
    target: any,
    propertyKey: string | symbol,
    descriptor: TypedPropertyDescriptor<any>,
  ) => {
    Reflect.defineMetadata('method', 'patch', target, propertyKey);
    Reflect.defineMetadata('path', `/${path}`, target, propertyKey);
    Reflect.defineMetadata('middlewares', middlewares, target, propertyKey);

    return descriptor;
  };
}

export function Del(path: string = '', middlewares: any[] = []) {
  return (
    target: any,
    propertyKey: string | symbol,
    descriptor: TypedPropertyDescriptor<any>,
  ) => {
    Reflect.defineMetadata('method', 'delete', target, propertyKey);
    Reflect.defineMetadata('path', `/${path}`, target, propertyKey);
    Reflect.defineMetadata('middlewares', middlewares, target, propertyKey);

    return descriptor;
  };
}
