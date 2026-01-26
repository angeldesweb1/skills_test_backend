import { AppFactory } from '@lib/core/main/main.core';
import '@app/main/infra/main.module';

async function bootstrap() {
  const app = new AppFactory();
  const config = await app.getConfig('dotenv');
  await app.mount('express');
  app.create();
  console.log(config);
}

bootstrap();
