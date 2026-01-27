import { AppModule, AppRootModule } from '@lib/interfaces';
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

export function getApp(): Application {
  const app: Application = express();
  app.use(json());
  app.use(urlencoded({ extended: true }));
  return app;
}

export function handleModule(module: new () => AppModule) {
  const controllers = Reflect.getMetadata('module:controllers', module);
  console.log(controllers);
}

export function handleRoot(root: new () => AppRootModule) {
  const children = Reflect.getMetadata('module:children', root);
  children.forEach((module: new () => AppModule) => handleModule(module));
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
