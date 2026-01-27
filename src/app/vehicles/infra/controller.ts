import { ExpressAuthMiddleware } from '@app/shared/middlewares/auth.middlewares';
import { Controller, Get } from '@lib/decorators';
import type { Req, Res, Next } from '@lib/interfaces/adapters/express.types';

@Controller('vehicles')
export class VehiclesController {
  @Get('', [ExpressAuthMiddleware])
  async list(req: Req, res: Res, next: Next) {
    return res.status(200).json({ message: 'Hello from veh' });
  }

  @Get(':id')
  async findById(req: Req, res: Res, next: Next) {
    return res.status(200).json({ message: 'Hello from list' });
  }
}
