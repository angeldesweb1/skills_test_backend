import { PaginatedResult, QueryOptions } from '@app/shared/queries/interfaces';
import { CreateBrandDto } from '../domain/brand.dto';
import { BrandEntity } from '../domain/brand.entity';

export interface BrandSuccessResponse {
  success: true;
  data: BrandEntity;
}

export interface BrandErrorResponse {
  success: false;
  error: string;
}

export type BrandResponse = BrandSuccessResponse | BrandErrorResponse;

export interface BrandUseCase {
  create(input: CreateBrandDto): Promise<BrandResponse>;
  find(query?: Record<string, any>): Promise<PaginatedResult<BrandEntity>>;
  findById(id: string): Promise<BrandResponse>;
  update(id: string, input: CreateBrandDto): Promise<BrandResponse>;
  delete(id: string): Promise<BrandResponse>;
}
