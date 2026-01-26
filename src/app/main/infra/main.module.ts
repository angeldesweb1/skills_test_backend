import { Module } from '@lib/decorators/module.decorator';
import { injectable } from 'inversify';

@injectable()
@Module({
  name: 'root',
  globalMiddlewares: [],
  root: true,
})
export class RootModule {}
