import { ExpressAuthMiddleware } from '@app/shared/middlewares/auth.middlewares';
import { Controller, Del, Get, Patch, Post } from '@lib/decorators';
import type { Req, Res, Next } from '@lib/interfaces/adapters/express.types';
import { ModelService } from './services/model.service';
import { ZodService } from '@app/shared/validation.services';
import { modelSchema } from './schemas/model.schema';
import { v4 as genuuid, validate } from 'uuid';

@Controller('vehicles/models')
export class ModelController {
  private readonly service: ModelService = new ModelService();
  private readonly validator: ZodService = new ZodService();

  @Get('', [ExpressAuthMiddleware])
  async read(req: Req, res: Res, next: Next) {
    const result = await this.service.find(req.query);
    return res.status(200).json(result);
  }

  @Get(':id', [ExpressAuthMiddleware])
  async findById(req: Req, res: Res, next: Next) {
    const id = this.validateParam(req.params.id as string, next);
    if (!id) return;

    const result = await this.service.findById(id);
    if (!result.success) return res.status(400).json(result);
    return res.status(200).json(result);
  }

  @Post('', [ExpressAuthMiddleware])
  async create(req: Req, res: Res, next: Next) {
    const id = genuuid();
    const input = { id, ...req.body };

    const isValid = this.validatePost(input);
    if (!isValid) return res.status(400).json({ message: 'Invalid body' });

    const result = await this.service.create(input);
    if (!result.success) return res.status(400).json(result);

    return res.status(201).json(result);
  }

  @Patch(':id', [ExpressAuthMiddleware])
  async update(req: Req, res: Res, next: Next) {
    const id = this.validateParam(req.params.id as string, next);
    if (!id) return;

    const update = req.body;
    const result = await this.service.update(id, update);

    if (!result.success) return res.status(400).json(result);

    return res.status(200).json(result);
  }

  @Del(':id', [ExpressAuthMiddleware])
  async delete(req: Req, res: Res, next: Next) {
    const id = this.validateParam(req.params.id as string, next);
    if (!id) return;
    const result = await this.service.delete(id);
    if (!result.success) return res.status(400).json(result);
    return res.status(200).json(result);
  }

  private validatePost(input: any) {
    const invalidBody = this.validator.hasErrors(modelSchema, input);
    return !invalidBody;
  }

  private validateParam(id: string, next: Next) {
    const isUUID = validate(id);
    if (!isUUID) return next();
    return id;
  }
}
