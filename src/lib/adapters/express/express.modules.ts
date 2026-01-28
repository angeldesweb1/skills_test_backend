import { DecoratedRoute } from '@lib/decorators';
import { AppModule, AppRootModule } from '@lib/interfaces';
import express, { Application, json, Router, urlencoded } from 'express';
import { handleController } from './modules/express.controller';
import { ExpressNotFound } from '@app/shared/middlewares/notfound.middlewares';
import cors from 'cors';
import { ExpressErrorMiddleware } from '@app/shared/middlewares/globalerror.middleware';

export function getApp(): Application {
  const app: Application = express();
  app.use(
    cors({
      origin: '*',
      methods: ['GET', 'POST', 'PUT', 'DELETE'],
      credentials: true,
    }),
  );
  app.use(json());
  app.use(urlencoded({ extended: true }));
  return app;
}

export function handleModule(module: new () => AppModule) {
  const controllers = Reflect.getMetadata('module:controllers', module);
  let routers: { base: string; router: Router }[] = [];
  controllers.forEach((controller: any) => {
    const controllerRouter = handleController(controller);
    routers = [...routers, controllerRouter].filter(
      (router) => router !== null,
    );
  });

  return routers;
}

export function handleRoot(app: Application, root: new () => AppRootModule) {
  const children: (new () => AppModule)[] = Reflect.getMetadata(
    'module:children',
    root,
  );
  const rootBase = Reflect.getMetadata('module:base', root);
  const mainHandler = Router();
  children.forEach((module) => {
    const current = handleModule(module);
    current.forEach((router) => {
      mainHandler.use(router.base, router.router);
    });
  });

  app.use(rootBase, mainHandler);
  return app;
}

export async function startExpressApp(
  app: Application,
  port: number | string,
  host?: string,
): Promise<{ success: boolean; error: Error | null }> {
  try {
    app.use(ExpressNotFound);
    app.use(ExpressErrorMiddleware);
    app.listen({ port, host });
    return { success: true, error: null };
  } catch (error) {
    return { success: false, error: error as Error };
  }
}
