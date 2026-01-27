import { ExpressAuthMiddleware } from '@app/shared/middlewares/auth.middlewares';
import { Controller, Del, Get, Patch, Post } from '@lib/decorators';
import type { Req, Res, Next } from '@lib/interfaces/adapters/express.types';
import { VehicleService } from './services/vehicles.service';
import { ZodService } from '@app/shared/validation.services';
import {
  createVehicleSchema,
  updateVehicleSchema,
} from './schemas/vehicle.schema';
import { v4 as genuuid } from 'uuid';

@Controller('vehicles')
export class VehiclesController {
  private readonly service: VehicleService = new VehicleService();
  private readonly validator: ZodService = new ZodService();

  @Get('', [ExpressAuthMiddleware])
  async read(req: Req, res: Res, next: Next) {
    const result = await this.service.find(req.query);
    return res.status(200).json(result);
  }

  @Get(':id', [ExpressAuthMiddleware])
  async findById(req: Req, res: Res, next: Next) {
    const id = req.params.id;
    if (!id || typeof id !== 'string') return next();
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
    const id = req.params.id;
    if (!id || typeof id !== 'string') return next();

    const update = req.body;

    const isValid = this.validatePatch(update);
    if (!isValid) return res.status(400).json({ message: 'Invalid body' });

    const result = await this.service.update(id, update);

    if (!result.success) return res.status(400).json(result);

    return res.status(200).json(result);
  }

  @Del(':id', [ExpressAuthMiddleware])
  async delete(req: Req, res: Res, next: Next) {
    const id = req.params.id;
    if (!id || typeof id !== 'string') return next();
    const result = await this.service.delete(id);
    if (!result.success) return res.status(400).json(result);
    return res.status(200).json(result);
  }

  private validatePost(input: any) {
    const invalidBody = this.validator.hasErrors(createVehicleSchema, input);
    return !invalidBody;
  }

  private validatePatch(input: any) {
    const invalidBody = this.validator.hasErrors(updateVehicleSchema, input);
    return !invalidBody;
  }
}
