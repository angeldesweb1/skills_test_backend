import { VehicleRepository } from '@app/vehicles/domain/vehicle.repository';
import { VehicleModel } from '../models/vehicle.model';
import { MongooseQueryBuilder } from '@app/shared/queries/mongoose.query_builder';
import { VehicleEntity } from '@app/vehicles/domain/vehicle.entity';
import {
  CreateVehicleDto,
  UpdateVehicleDto,
} from '@app/vehicles/domain/vehicle.dto';
import { PaginatedResult, QueryOptions } from '@app/shared/queries/interfaces';

export class MongoVehicleRepository implements VehicleRepository {
  private readonly model = VehicleModel;
  private readonly qbuilder = new MongooseQueryBuilder<VehicleEntity>();

  async create(input: CreateVehicleDto): Promise<VehicleEntity | null> {
    const data = new this.model(input);
    const doc = await data.save();
    if (!doc) return null;
    return doc as unknown as VehicleEntity;
  }

  async find(
    query?: Partial<QueryOptions>,
  ): Promise<PaginatedResult<VehicleEntity>> {
    return await this.qbuilder
      .parseQuery(query as Record<string, any>)
      .with({ path: 'model', populate: { path: 'brand' } })
      .with('createdBy')
      .with('updatedBy')
      .exec(this.model);
  }

  async findById(id: string): Promise<VehicleEntity | null> {
    const doc = await this.model.findById(id);
    if (!doc) return null;
    return doc as unknown as VehicleEntity;
  }

  async update(
    id: string,
    input: UpdateVehicleDto,
  ): Promise<VehicleEntity | null> {
    const doc = await this.model.findByIdAndUpdate(id, input, { new: true });
    if (!doc) return null;
    return doc as unknown as VehicleEntity;
  }

  async delete(id: string): Promise<VehicleEntity | null> {
    return await this.model.findByIdAndDelete(id);
  }
}
