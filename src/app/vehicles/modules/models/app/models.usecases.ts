import { QueryOptions } from '@app/shared/queries/interfaces';
import { CreateModelDto, UpdateModelDto } from '../domain/model.dto';
import { ModelEntity } from '../domain/model.entity';
import { PaginatedResult } from '@app/shared/queries/interfaces';

export interface ModelSuccessResponse {
  success: true;
  data: ModelEntity;
}

export interface ModelErrorResponse {
  success: false;
  error: string;
}

export type ModelResponse = ModelSuccessResponse | ModelErrorResponse;

export interface ModelsUseCases {
  create(input: CreateModelDto): Promise<ModelResponse>;
  find(query?: Partial<QueryOptions>): Promise<PaginatedResult<ModelEntity>>;
  findById(id: string): Promise<ModelResponse>;
  update(id: string, model: UpdateModelDto): Promise<ModelResponse>;
  delete(id: string): Promise<ModelResponse>;
  findByBrand(brand: string): Promise<ModelResponse>;
}
