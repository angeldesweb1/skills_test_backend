import { PaginatedResult } from '@app/shared/queries/interfaces';
import { VehicleEntity } from './vehicle.entity';
import { CreateVehicleDto, UpdateVehicleDto } from './vehicle.dto';

export interface VehicleRepository {
  create(input: CreateVehicleDto): Promise<VehicleEntity | null>;
  find(...args: unknown[]): Promise<PaginatedResult<VehicleEntity>>;
  findById(id: string): Promise<VehicleEntity | null>;
  update(id: string, input: UpdateVehicleDto): Promise<VehicleEntity | null>;
  delete(id: string): Promise<VehicleEntity | null>;
}
