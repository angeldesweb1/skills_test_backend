import { PaginatedResult } from '@app/shared/queries/interfaces';
import {
  BrandUseCase,
  BrandResponse,
  BrandErrorResponse,
  BrandSuccessResponse,
} from '../../app/brand.usecases';
import { CreateBrandDto, UpdateBrandDto } from '../../domain/brand.dto';
import { BrandEntity } from '../../domain/brand.entity';
import { MongoBrandRepository } from '../repositories/mongo_brand.repository';
import { BrandRepository } from '../../domain/brand.repository';

export class BrandService implements BrandUseCase {
  private readonly repository: BrandRepository = new MongoBrandRepository();
  async create(input: CreateBrandDto): Promise<BrandResponse> {
    try {
      const doc = await this.repository.create(input);
      return this.successResponse(doc as BrandEntity);
    } catch (error: unknown) {
      const message = (error as Error)?.message || 'Error creating brand';
      return this.errorResponse(message);
    }
  }

  async find(
    query?: Record<string, any>,
  ): Promise<PaginatedResult<BrandEntity>> {
    return await this.repository.find(query);
  }

  async findById(id: string): Promise<BrandResponse> {
    try {
      const doc = await this.repository.findById(id);
      return this.successResponse(doc as BrandEntity);
    } catch (error) {
      const message = (error as Error)?.message || 'Error finding brand';
      return this.errorResponse(message);
    }
  }

  async update(id: string, input: UpdateBrandDto): Promise<BrandResponse> {
    try {
      const doc = await this.repository.update(id, input);
      return this.successResponse(doc as BrandEntity);
    } catch (error) {
      const message = (error as Error)?.message || 'Error updating brand';
      return this.errorResponse(message);
    }
  }

  async delete(id: string): Promise<BrandResponse> {
    try {
      const doc = await this.repository.delete(id);
      return this.successResponse(doc as BrandEntity);
    } catch (error) {
      const message = (error as Error)?.message || 'Error deleting brand';
      return this.errorResponse(message);
    }
  }

  private errorResponse(error: string): BrandErrorResponse {
    return {
      success: false,
      error,
    };
  }

  private successResponse(data: BrandEntity): BrandSuccessResponse {
    return {
      success: true,
      data,
    };
  }
}
