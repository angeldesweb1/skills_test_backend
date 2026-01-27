import { PaginatedResult } from '@app/shared/queries/interfaces';
import {
  ModelErrorResponse,
  ModelResponse,
  ModelSuccessResponse,
  ModelsUseCases,
} from '../../app/models.usecases';
import { CreateModelDto, UpdateModelDto } from '../../domain/model.dto';
import { ModelEntity } from '../../domain/model.entity';
import { ModelRepository } from '../../domain/model.repository';
import { MongoModelRepository } from '../repository/mongo_model.repository';

export class ModelService implements ModelsUseCases {
  private readonly repository: ModelRepository = new MongoModelRepository();

  async create(input: CreateModelDto) {
    try {
      const doc = await this.repository.create(input);
      return this.successResponse(doc as ModelEntity);
    } catch (error: unknown) {
      const message = (error as Error)?.message || 'Error creating model';
      return this.errorResponse(message);
    }
  }

  async find(
    query?: Record<string, any>,
  ): Promise<PaginatedResult<ModelEntity>> {
    return await this.repository.find(query);
  }

  async findById(id: string): Promise<ModelResponse> {
    try {
      const doc = await this.repository.findById(id);
      return this.successResponse(doc as ModelEntity);
    } catch (error) {
      const message = (error as Error)?.message || 'Error finding model';
      return this.errorResponse(message);
    }
  }

  async update(id: string, input: UpdateModelDto): Promise<ModelResponse> {
    try {
      const doc = await this.repository.update(id, input);
      return this.successResponse(doc as ModelEntity);
    } catch (error) {
      const message = (error as Error)?.message || 'Error updating model';
      return this.errorResponse(message);
    }
  }

  async delete(id: string): Promise<ModelResponse> {
    try {
      const doc = await this.repository.delete(id);
      return this.successResponse(doc as ModelEntity);
    } catch (error) {
      const message = (error as Error)?.message || 'Error deleting model';
      return this.errorResponse(message);
    }
  }

  private errorResponse(error: string): ModelErrorResponse {
    return {
      success: false,
      error,
    };
  }

  private successResponse(data: ModelEntity): ModelSuccessResponse {
    return {
      success: true,
      data,
    };
  }
}
