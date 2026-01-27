import { Controller } from '@lib/decorators';
import { Post } from '@lib/decorators';
import type { Req, Res, Next } from '@lib/interfaces/adapters/express.types';
import { AuthService } from './services/auth.services';
import { ZodService } from '@app/shared/validation.services';
import { loginSchema, registerSchema } from './schemas/auth.schema';
import { v4 as genuuid } from 'uuid';

@Controller('auth')
export class AuthController {
  private readonly service: AuthService = new AuthService();
  private readonly validator: ZodService = new ZodService();

  constructor() {}

  // TO-DO Crear decorador para validar body e idempotency key
  @Post('login')
  async login(req: Req, res: Res, next: Next) {
    const body = req.body;
    const invalidBody = this.validator.hasErrors(loginSchema, body);
    if (invalidBody)
      return res
        .status(400)
        .json({ success: false, error: 'Invalid credentials' });
    const data = await this.service.login(body);
    if (!data.success) return res.status(400).json(data);
    return res.status(200).json(data);
  }

  // TO-DO Crear decorador para validar body e idempotency key
  @Post('register')
  async register(req: Req, res: Res, next: Next) {
    const body = req.body;
    const uuid = genuuid();
    const input = { uuid, ...body };
    const invalidBody = this.validator.hasErrors(registerSchema, input);

    if (invalidBody)
      return res
        .status(400)
        .json({ success: false, error: 'Invalid credentials' });

    const data = await this.service.register(input);
    if (!data.success) return res.status(400).json(data);
    return res.status(201).json(data);
  }
}
