import express, {
  Application,
  json,
  NextFunction,
  RequestHandler,
  Request,
  Response,
  Router,
  urlencoded,
} from 'express';

type Middleware = () => (
  req: Request,
  res: Response,
  next: NextFunction,
) => void;

export function getApplication(): Application {
  const app: Application = express();
  app.use(json());
  app.use(urlencoded({ extended: true }));
  return app;
}

export function subscribeGlobalMiddlewares(
  app: Application,
  middlewares: Middleware[],
): void {
  app.use(middlewares);
}

export function subscribeControllers(
  app: Application,
  controllers: RequestHandler[],
): void {
  app.use(controllers);
}

export function subscribeRoute(
  router: Router,
  method: 'get' | 'post' | 'put' | 'delete' | 'patch',
  path: string,
  fn: RequestHandler,
  middlewares?: Middleware[],
) {
  if (middlewares?.length) {
    router[method](path, ...middlewares, fn);
  } else {
    router[method](path, fn);
  }
}

export async function startExpressApp(
  app: Application,
  port: number | string,
  host?: string,
): Promise<{ success: boolean; error: Error | null }> {
  try {
    app.listen({ port, host });
    return { success: true, error: null };
  } catch (error) {
    return { success: false, error: error as Error };
  }
}
