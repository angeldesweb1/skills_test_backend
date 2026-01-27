import { Router } from 'express';
import type { DecoratedRoute } from '@lib/decorators';
import { Req, Res, Next } from '@lib/interfaces/adapters/express.types';

export function handleController(controller: any) {
  const routeHandler = Router();
  const instance = new controller();
  const base: string = Reflect.getMetadata('controller:base', controller);
  const routes: DecoratedRoute[] = Reflect.getMetadata(
    'controller:routes',
    controller,
  );
  if (!routes.length) return null;
  routes.forEach((route) => {
    console.log(route);
    routeHandler[route.method](
      route.path,
      ...route.middlewares,
      (req: Req, res: Res, next: Next) =>
        instance[route.methodName](req, res, next),
    );
  });

  return { base, router: routeHandler };
}
