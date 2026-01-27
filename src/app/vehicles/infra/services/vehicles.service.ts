import {
  VehicleErrorResponse,
  VehicleResponse,
  VehicleSuccessResponse,
  VehicleUseCases,
} from '@app/vehicles/app/vehicle.usecases';
import { VehicleRepository } from '@app/vehicles/domain/vehicle.repository';
import { MongoVehicleRepository } from '../repository/mongo_vehicle.repository';
import {
  CreateVehicleDto,
  UpdateVehicleDto,
} from '@app/vehicles/domain/vehicle.dto';
import { VehicleEntity } from '@app/vehicles/domain/vehicle.entity';
import { PaginatedResult } from '@app/shared/queries/interfaces';

export class VehicleService implements VehicleUseCases {
  private readonly repo: VehicleRepository = new MongoVehicleRepository();

  async create(input: CreateVehicleDto): Promise<VehicleResponse> {
    try {
      const doc = await this.repo.create(input);
      return this.successResponse(doc as VehicleEntity);
    } catch (error: unknown) {
      const message = (error as Error)?.message || 'Error creating model';
      return this.errorResponse(message);
    }
  }

  async find(
    query?: Record<string, any>,
  ): Promise<PaginatedResult<VehicleEntity>> {
    return await this.repo.find(query);
  }

  async findById(id: string): Promise<VehicleResponse> {
    try {
      const doc = await this.repo.findById(id);
      return this.successResponse(doc as VehicleEntity);
    } catch (error) {
      const message = (error as Error)?.message || 'Error finding model';
      return this.errorResponse(message);
    }
  }

  async update(id: string, input: UpdateVehicleDto): Promise<VehicleResponse> {
    try {
      const doc = await this.repo.update(id, input);
      return this.successResponse(doc as VehicleEntity);
    } catch (error) {
      const message = (error as Error)?.message || 'Error updating model';
      return this.errorResponse(message);
    }
  }

  async delete(id: string): Promise<VehicleResponse> {
    try {
      const doc = await this.repo.delete(id);
      return this.successResponse(doc as VehicleEntity);
    } catch (error) {
      const message = (error as Error)?.message || 'Error deleting model';
      return this.errorResponse(message);
    }
  }

  private errorResponse(error: string): VehicleErrorResponse {
    return {
      success: false,
      error,
    };
  }

  private successResponse(data: VehicleEntity): VehicleSuccessResponse {
    return {
      success: true,
      data,
    };
  }
}
