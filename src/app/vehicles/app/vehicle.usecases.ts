import { PaginatedResult, QueryOptions } from '@app/shared/queries/interfaces';
import { CreateVehicleDto, UpdateVehicleDto } from '../domain/vehicle.dto';
import { VehicleEntity } from '../domain/vehicle.entity';

export interface VehicleSuccessResponse {
  success: true;
  data: VehicleEntity;
}

export interface VehicleErrorResponse {
  success: false;
  error: string;
}

export type VehicleResponse = VehicleSuccessResponse | VehicleErrorResponse;

export interface VehicleUseCases {
  create(input: CreateVehicleDto): Promise<VehicleResponse>;
  find(query?: Partial<QueryOptions>): Promise<PaginatedResult<VehicleEntity>>;
  findById(id: string): Promise<VehicleResponse>;
  update(id: string, input: UpdateVehicleDto): Promise<VehicleResponse>;
  delete(id: string): Promise<VehicleResponse>;
}
