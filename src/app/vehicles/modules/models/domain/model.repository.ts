import { CreateModelDto, UpdateModelDto } from './model.dto';
import { ModelEntity } from './model.entity';

export interface ModelRepository {
  create(model: CreateModelDto): Promise<ModelEntity | null>;
  find(...args: unknown[]): Promise<ModelEntity[] | null>;
  findById(id: string): Promise<ModelEntity | null>;
  update(id: string, model: UpdateModelDto): Promise<ModelEntity | null>;
  delete(id: string): Promise<ModelEntity | null>;
}
