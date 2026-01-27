import { QueryOptions } from 'mongoose';
import { CreateModelDto, UpdateModelDto } from '../domain/model.dto';
import { ModelEntity } from '../domain/model.entity';
import { PaginatedResult } from '@app/shared/queries/interfaces';

export interface ModelsUseCases {
  create(input: CreateModelDto): Promise<ModelEntity | null>;
  find(query?: Partial<QueryOptions>): Promise<PaginatedResult<ModelEntity>>;
  findById(id: string): Promise<ModelEntity | null>;
  update(id: string, model: UpdateModelDto): Promise<ModelEntity | null>;
  delete(id: string): Promise<ModelEntity | null>;
}
