import { Controller } from '@lib/decorators';
import { Post } from '@lib/decorators';
import type { Req, Res, Next } from '@lib/interfaces/adapters/express.types';

@Controller('users')
export class UsersController {
  @Post('login')
  async login(req: Req, res: Res, next: Next) {
    res.status(200).json({ message: 'Hello from login' });
  }

  @Post('register')
  async register(req: Req, res: Res, next: Next) {
    res.status(200).json({ message: 'Hello from register' });
  }
}
