import { MongooseQueryBuilder } from '@app/shared/queries/mongoose.query_builder';
import { ModelResponse, ModelsUseCases } from '../../app/models.usecases';
import { CreateModelDto, UpdateModelDto } from '../../domain/model.dto';
import { ModelEntity } from '../../domain/model.entity';
import { ModelModel } from '../models/model.model';
import { PaginatedResult, QueryOptions } from '@app/shared/queries/interfaces';
import { ModelRepository } from '../../domain/model.repository';

export class MongoModelRepository implements ModelRepository {
  private readonly model = ModelModel;
  private readonly qbuilder = new MongooseQueryBuilder<ModelEntity>();

  async create(input: CreateModelDto): Promise<ModelEntity | null> {
    const data = new this.model(input);
    const doc = await data.save();
    if (!doc) return null;
    return doc as unknown as ModelEntity;
  }

  async find(
    query?: Partial<QueryOptions>,
    q: boolean = true,
  ): Promise<PaginatedResult<ModelEntity>> {
    if (!q) {
      const docs: unknown = await this.model.find(query);
      const pagination = {
        totalItems: (docs as any[]).length,
        perPage: 10,
        currentPage: 1,
        totalPages: Math.ceil((docs as any[]).length / 10),
        hasNextPage: false,
        hasPreviousPage: false,
        nextPage: null,
        previousPage: null,
      };
      return { docs: docs as any[], pagination };
    }
    return await this.qbuilder
      .parseQuery(query as Record<string, any>)
      .with('brand')
      .exec(this.model);
  }

  async findById(id: string): Promise<ModelEntity | null> {
    const doc = await this.model.findOne({ id });
    if (!doc) return null;
    return doc as unknown as ModelEntity;
  }

  async update(id: string, input: UpdateModelDto): Promise<ModelEntity | null> {
    const doc = await this.model.findOneAndUpdate({ id }, input, { new: true });
    if (!doc) return null;
    return doc as unknown as ModelEntity;
  }

  async delete(id: string): Promise<ModelEntity | null> {
    return await this.model.findOneAndDelete({ id });
  }
}
