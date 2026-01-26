import { AppFactory } from '@lib/core/main/main.core';

async function bootstrap() {
  const app = new AppFactory();
  const config = await app.getConfig('dotenv');
  await app.mount('express');
}

bootstrap();
