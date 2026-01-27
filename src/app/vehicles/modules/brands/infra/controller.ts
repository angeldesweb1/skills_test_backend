import { ExpressAuthMiddleware } from '@app/shared/middlewares/auth.middlewares';
import { Controller, Del, Get, Patch, Post } from '@lib/decorators';
import type { Req, Res, Next } from '@lib/interfaces/adapters/express.types';

@Controller('vehicles/brands')
export class BranController {
  @Get('', [ExpressAuthMiddleware])
  async read(req: Req, res: Res, next: Next) {
    return res.status(200).json({ message: 'Hello from brands' });
  }

  @Get(':id', [ExpressAuthMiddleware])
  async findById(req: Req, res: Res, next: Next) {
    return res.status(200).json({ message: 'Hello from brand' });
  }

  @Post('', [ExpressAuthMiddleware])
  async create(req: Req, res: Res, next: Next) {
    return res.status(200).json({ message: 'Hello from create' });
  }

  @Patch(':id', [ExpressAuthMiddleware])
  async update(req: Req, res: Res, next: Next) {
    return res.status(200).json({ message: 'Hello from update' });
  }

  @Del(':id', [ExpressAuthMiddleware])
  async delete(req: Req, res: Res, next: Next) {
    return res.status(200).json({ message: 'Hello from delete' });
  }
}
