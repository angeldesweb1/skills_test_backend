import { Controller, Get } from '@lib/decorators';
import { Post } from '@lib/decorators';
import type { Req, Res, Next } from '@lib/interfaces/adapters/express.types';

@Controller('vehicles')
export class VehiclesController {
  @Get('new')
  async login(req: Req, res: Res, next: Next) {
    return res.status(200).json({ message: 'Hello from veh' });
  }

  @Get('')
  async list(req: Req, res: Res, next: Next) {
    return res.status(200).json({ message: 'Hello from list' });
  }
}
