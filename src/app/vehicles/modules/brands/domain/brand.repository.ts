import { PaginatedResult } from '@app/shared/queries/interfaces';
import { CreateBrandDto, UpdateBrandDto } from './brand.dto';
import { BrandEntity } from './brand.entity';

export interface BrandRepository {
  create(input: CreateBrandDto): Promise<BrandEntity | null>;
  find(...args: unknown[]): Promise<PaginatedResult<BrandEntity>>;
  findById(id: string): Promise<BrandEntity | null>;
  update(id: string, input: UpdateBrandDto): Promise<BrandEntity | null>;
  delete(id: string): Promise<BrandEntity | null>;
}
