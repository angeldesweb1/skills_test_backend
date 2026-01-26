import { AppFactory } from '@lib/core/main/main.core';

async function bootstrap() {
  const app = new AppFactory();
  await app.mount('express');
}

bootstrap();
