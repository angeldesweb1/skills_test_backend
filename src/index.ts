import { AppFactory } from '@lib/core/main/main.core';
import '@app/main';

async function bootstrap() {
  const app = new AppFactory();
  const config = await app.getConfig('dotenv');
  await app.mount('express');
  app.create();
  await app.run(config?.port as string, config?.host as string);
}

bootstrap();
