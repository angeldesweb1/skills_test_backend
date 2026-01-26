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
import cors from 'cors';
import helmet from 'helmet';

type Middleware = (req: Request, res: Response, next: NextFunction) => void;

export function getApplication(): Application {
  const app: Application = express();
  app.use(json());
  app.use(urlencoded({ extended: true }));
  app.use(cors());
  app.use(helmet());
  return app;
}

export function subscribeGlobalMiddlewares(
  app: Application,
  middlewares: RequestHandler[],
): void {
  middlewares.forEach((middleware) => app.use(middleware));
}

export function subscribeControllers(
  app: Application,
  controllers: RequestHandler[],
): void {
  controllers.forEach((controller) => app.use(controller));
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

export function startExpressApp(
  app: Application,
  port: number | string,
  host?: string,
): void {
  app.listen({ port, host }, (err) => {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    console.log(`🚀 [server]: listening on port ${port}`);
  });
}
