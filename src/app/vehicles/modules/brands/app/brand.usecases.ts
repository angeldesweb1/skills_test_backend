import { PaginatedResult, QueryOptions } from '@app/shared/queries/interfaces';
import { CreateBrandDto } from '../domain/brand.dto';
import { BrandEntity } from '../domain/brand.entity';

export interface BrandUseCase {
  create(input: CreateBrandDto): Promise<BrandEntity | null>;
  find(
    query?: Partial<QueryOptions>,
  ): Promise<PaginatedResult<BrandEntity> | null>;
  findById(id: string): Promise<BrandEntity | null>;
  update(id: string, input: CreateBrandDto): Promise<BrandEntity | null>;
  delete(id: string): Promise<BrandEntity | null>;
}
