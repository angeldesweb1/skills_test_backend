import { PaginatedResult, QueryOptions } from '@app/shared/queries/interfaces';
import { CreateBrandDto, UpdateBrandDto } from '../../domain/brand.dto';
import { BrandEntity } from '../../domain/brand.entity';
import { BrandRepository } from '../../domain/brand.repository';
import { BrandModel } from '../models/brand.model';
import { MongooseQueryBuilder } from '@app/shared/queries/mongoose.query_builder';

export class MongoBrandRepository implements BrandRepository {
  private readonly model = BrandModel;
  private readonly qbuilder = new MongooseQueryBuilder<BrandEntity>();

  async create(input: CreateBrandDto): Promise<BrandEntity | null> {
    const data = new this.model(input);
    const doc = await data.save();
    if (!doc) return null;
    return doc as unknown as BrandEntity;
  }

  async find(
    query?: Partial<QueryOptions>,
  ): Promise<PaginatedResult<BrandEntity>> {
    return await this.qbuilder
      .parseQuery(query as Record<string, any>)
      .exec(this.model);
  }

  async findById(id: string): Promise<BrandEntity | null> {
    const doc = await this.model.findById(id);
    if (!doc) return null;
    return doc as unknown as BrandEntity;
  }

  async update(id: string, input: UpdateBrandDto): Promise<BrandEntity | null> {
    const doc = await this.model.findByIdAndUpdate(id, input, { new: true });
    if (!doc) return null;
    return doc as unknown as BrandEntity;
  }

  async delete(id: string): Promise<BrandEntity | null> {
    return await this.model.findByIdAndDelete(id);
  }
}
